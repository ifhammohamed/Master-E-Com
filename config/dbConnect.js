const mongoose = require("mongoose");

/**
 * Connects to the MongoDB database using the DB_URI environment variable.
 * Handles connected and error events.
 */
const dbConnect = () => {
  mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected to DB");
    });

    mongoose.connection.on("error", (err) => {
      console.log(err);
    });
  } catch (error) {
    throw new mongoose.Error();
  }
};

module.exports = dbConnect;
