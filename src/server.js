const mongoose = require("mongoose");
const app = require("./app");
const PORT = 9000;

require("dotenv").config();

/* Connecting to the database and then starting the server. */
mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    app.listen(PORT, console.log("Server started on port 9000"));
  })
  .catch((err) => {
    console.log(err);
  });