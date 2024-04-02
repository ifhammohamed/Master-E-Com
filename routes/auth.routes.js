const express = require("express");
const router = express.Router();
const { createUser } = require("../controllers/user.controller");
router.post("/register", createUser);
//     , async (req, res) => {
//   try {
//     const { first_name, last_name, email, mobile, password } = req.body;
//     if (!first_name || !last_name || !email || !mobile || !password) {
//       return res.status(400).json({ error: "All fields are required" });
//     }
//     const userExist = await User.findOne({ email });
//     if (userExist) {
//       return res.status(400).json({ error: "User already exists" });
//     }
//     const user = new User({ first_name, last_name, email, mobile, password });
//     await user.save();
//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// }

module.exports = router;
