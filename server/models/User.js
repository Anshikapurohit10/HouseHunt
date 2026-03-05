const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImagePath: { type: String },
  role: { type: String, enum: ["customer", "host"], default: "customer" }, // <--- important
  wishList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Listing" }],
});

module.exports = mongoose.model("User", UserSchema);