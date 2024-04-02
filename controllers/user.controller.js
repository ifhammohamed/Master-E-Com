const User = require("../models/user.model");
const asyncHandler = require("express-async-handler");
const generateToken = require("../config/jwtToken");

/**
 * Creates a new user in the database.
 *
 * Validates required fields in the request body.
 * Checks if a user with the given email already exists.
 * If user does not exist, creates a new user and
 * returns a success response with the new user data.
 * If user exists, throws an error.
 */
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

// Login a user before generate token assign it by config/jwtToken.js
/**
 * Logs in a user. Checks if user with provided email exists, and if password matches.
 * If valid credentials, returns user info and auth token.
 * Throws error if credentials invalid.
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    res.json({
      _id: findUser?._id,
      first_name: findUser?.first_name,
      last_name: findUser?.last_name,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

/**
 * Gets all users.
 *
 * @returns {Promise<User[]>} Promise resolving to array of User documents.
 */
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    throw new Error(error);
  }
});

/**
 * Gets a single user by ID.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {string} id - The ID of the user to find
 *
 * @returns {Promise<User>} Promise resolving to the found User document or rejecting with error
 */
const getSingleUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user) {
      res.json(user);
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    throw new Error(error);
  }
});

/**
 * Deletes a user by ID.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise}
 */
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (user) {
      res.json({ message: "User deleted successfully" });
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    throw new Error(error);
  }
});

/**
 * Updates a user by ID.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise} Promise resolving to the updated user object
 */
const updateUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    // Remove the password field from the req.body
    delete req.body.password;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
};
