// const User = require("../models/user.model");

// const createUser = async (req, res) => {
//   // try {
//   const email = req.body.email;
//   // const { first_name, last_name, email, mobile, password } = req.body;

//   // if (!first_name || !last_name || !email || !mobile || !password) {
//   //   return res.status(400).json({ error: "All fields are required" });
//   // }

//   const userExist = await User.findOne({ email: email });

//   if (userExist) {
//     return res.status(400).json({ error: "User already exists" });
//   } else {
//     const newUser = await User.create(req.body);
//     await newUser.save();
//     res.json({ user: newUser });
//     res.status(201).json({ message: "User created successfully" });
//   }
//   //   } catch (error) {
//   //     res.status(500).json({ error: "Internal server error" });
//   //   }
// };

// module.exports = { createUser };

const User = require("../models/user.model");

const createUser = async (req, res) => {
  try {
    const { first_name, last_name, email, mobile, password } = req.body;

    if (!first_name || !last_name || !email || !mobile || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ error: "User already exists" });
    } else {
      const newUser = await User.create(req.body);
      res
        .status(201)
        .json({ message: "User created successfully", user: newUser });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createUser };
