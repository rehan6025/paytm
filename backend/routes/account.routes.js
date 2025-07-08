import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import Accounts from "../models/accounts.model.js";
import mongoose from "mongoose";

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Accounts.findOne({ userId: req.userId });

  return res.json({ balance: account.balance });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body;

  const account = await Accounts.findOne({ userId: req.userId });

  if (account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({ message: "insufficient balance" });
  }

  const toAccount = await Accounts.findOne({ userId: to });

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({ message: "Invalid account" });
  }

  await Accounts.updateOne(
    { userId: req.userId },
    {
      $inc: {
        balance: -amount,
      },
    }
  );

  await Accounts.updateOne(
    { userId: to },
    {
      $inc: {
        balance: amount,
      },
    }
  );

  await session.commitTransaction();
  res.json({ message: "transfer successful" });
});

export default router;
