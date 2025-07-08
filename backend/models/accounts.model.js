import mongoose, { mongo } from "mongoose";

const accountsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const Accounts = mongoose.model("Accounts", accountsSchema);
export default Accounts;
