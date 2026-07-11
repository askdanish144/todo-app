// Core Module
const path = require("path");

// External Module
require("dotenv").config();
const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

//Local Module
const todoItemsRouter = require("./routes/todoItemsRouter");
const authRouter = require("./routes/authRouter");
const errorsController = require("./controllers/errors");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions",
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      secure: false, // Set to true if using HTTPS
      httpOnly: true, // Prevents client-side JS from reading the cookie
    },
  }),
);

app.use("/api/auth", authRouter);
app.use("/api", todoItemsRouter);

app.use(errorsController.pageNotFound);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to Mongo");
    app.listen(process.env.PORT, "0.0.0.0", () => {
      console.log(
        `Server running on address http://localhost:${process.env.PORT}`,
      );
    });
  })
  .catch((err) => {
    console.log("Error while connecting to Mongo: ", err);
  });
