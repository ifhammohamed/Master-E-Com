const User = require("../models/user.model");
const asyncHandler = require("express-async-handler");

const createUser = asyncHandler(async (req, res) => {
  const { first_name, last_name, email, mobile, password } = req.body;

  if (!first_name || !last_name || !email || !mobile || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const userExist = await User.findOne({ email: email });

  if (userExist) {
    throw new Error("User already exists");
  } else {
    const newUser = await User.create(req.body);
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const findUser = await User.findOne({ email });

  if (!findUser) {
    throw new Error("Invalid credentials");
  }

  if (findUser && (await findUser.isPasswordMatched(password))) {
    res.json({ message: "User logged in successfully", user: findUser });
  } else {
    throw new Error("Invalid credentials");
  }
});

module.exports = { createUser, loginUser };
