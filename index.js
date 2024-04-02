const express = require("express");
// const dotenv = require('dotenv').config();
require("dotenv").config();
const dbConnect = require("./config/dbConnect");
const authRouter = require("./routes/auth.routes");

const PORT = process.env.PORT || 2000;

const app = express();
dbConnect();

app.use("/apo/user", authRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
