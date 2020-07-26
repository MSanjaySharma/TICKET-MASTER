const mongoose = require("mongoose");

const configureDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI || process.env.DATABASE_LOCAL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("\x1b[94mDB connected - TICKETMASTER\x1b[39m");
    })
    .catch((err) => {
      console.log("error", err);
    });
};

module.exports = configureDB;
