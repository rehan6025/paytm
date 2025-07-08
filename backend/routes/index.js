import userRoutes from "./user.routes.js";
import accountRouter from "./account.routes.js";
import express from "express";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/account", accountRouter);

export default router;
