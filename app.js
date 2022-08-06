const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
// const dotenv = require('dotenv');
const fileUpload = require("express-fileupload");
const path = require("path");

const errorMiddleware = require("./middleware/error");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(express.json());

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
// require('dotenv').config()

// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const admin = require("./routes/adminRoute");
const vendor = require("./routes/vendorRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");
const distric = require("./routes/districRoutes");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", admin);
app.use("/api/v1", vendor);
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use("/api/v1", distric);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.send("welcome ebargen system")
});

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
