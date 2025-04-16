const express = require("express");
const passport = require("passport");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
require("dotenv").config();
require("./auth/passport"); // Load strategies

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(session({ secret: "keyboard cat", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Connect DB
mongoose.connect("mongodb://localhost:27017/auth-demo");

// Routes
app.use("/auth", require("./routes/auth"));

app.listen(4000, () => console.log("Server running on http://localhost:4000"));
