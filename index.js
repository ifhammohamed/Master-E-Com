const express = require("express");
require("dotenv").config();
const dbConnect = require("./config/dbConnect");
const authRouter = require("./routes/auth.routes");
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middlewares/errorHandler");

const PORT = process.env.PORT || 2000;

const app = express();
dbConnect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/user", authRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
