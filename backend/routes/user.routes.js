import express from "express";
import User from "../models/user.model.js";
import zod from "zod";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import Accounts from "../models/accounts.model.js";
const router = express.Router();

const userSchema = zod.object({
  username: zod.string(),
  password: zod.string().min(6),
  firstName: zod.string(),
  lastName: zod.string(),
});

router.post("/signup", async (req, res) => {
  const { username, password, firstName, lastName } = req.body;
  const { success } = userSchema.safeParse({
    username,
    password,
    firstName,
    lastName,
  });
  if (!success) {
    return res.status(400).json({
      message: "Username already taken / Invalid data",
    });
  }

  const exists = await User.findOne({ username });
  if (exists) {
    return res
      .status(409)
      .json({ message: "Username already taken / Invalid data" });
  }

  const dbUser = await User.create({ username, password, firstName, lastName });

  await Accounts.create({
    userId: dbUser._id,
    balance: +(Math.random() * 10000 + 1).toFixed(2),
  });

  const token = jwt.sign({ userId: dbUser._id }, JWT_SECRET);

  return res.status(201).json({
    message: "User created successfully",
    token: token,
  });
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  const { success } = userSchema
    .pick({ username, password })
    .safeParse(req.body);
  if (!success) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

  const dbUser = await User.findOne({ username });
  if (!dbUser) {
    return res.status(404).json({ message: "invalid credentials" });
  }

  const isValid = dbUser.password === password;
  if (!isValid) {
    return res.status(401).json({ message: "invalid credentials" });
  }

  const token = jwt.sign({ userId: dbUser._id }, JWT_SECRET);
  return res.status(200).json({
    message: "User signed in successfully",
    token: token,
  });
});

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.put("/update", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    res.status(403).json({ message: "error updating information" });
  }

  await User.updateOne(req.body, { id: req.userId });
  res.json({
    message: "updated successfully",
  });
});

//finding users route
router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [{ firstName: { $regex: filter } }, { lastName: { $regex: filter } }],
  });

  const currUser = req.userId;

  return res.json({
    user: users
      .filter((user) => String(user._id) !== String(currUser))
      .map((user) => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      })),
  });
});

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const id = req.userId;
    const user = await User.findOne({
      _id: id,
    });

    res.status(200).json({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    });
  } catch (error) {
    console.log("error getting user details :", error);
  }
});

export default router;
