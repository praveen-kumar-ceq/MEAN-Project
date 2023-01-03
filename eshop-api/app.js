const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./routes/bookRoute");
const userRouter = require("./routes/user.route");
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
// app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  console.log("Hello from the middleware 👋");
  next();
});

app.use("/api/v1/books", router);
app.use("/api/v1/users", userRouter);

module.exports = app;
