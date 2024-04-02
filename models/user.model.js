const mongoose = require("mongoose"); // Erase if already required
const bcrypt = require("bcrypt");

/**
 * User schema definition.
 * Defines the schema for the User model including required fields, data types,
 * and additional constraints like uniqueness.
 */
var userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
});

/**
 * Encrypts the password field before saving the user document to the database.
 * Uses bcrypt to generate a salt and hash the password before saving to the document.
 */
userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * Compares a given password with the hashed password stored in the user document.
 * Returns true if the passwords match, false otherwise.
 * Throws an error on failure.
 */
userSchema.methods.isPasswordMatched = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

//Export the model
module.exports = mongoose.model("user", userSchema);
