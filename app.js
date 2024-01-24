require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 8080;

// built-in middlewares
app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

/* Connect MongoDB Atlas for Database */
mongoose
  .connect(process.env.MONGO_URL)
  .then((res) => {
    /* Start Server */
    app.listen(port, () => {
      console.log(`Server Running on Port: ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use(userRoutes);
app.use(adminRoutes);
