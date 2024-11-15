const express = require("express");
const cors = require("cors");
const app = express();
const userRoutes = require("./routes/UserRoutes");
const carRoutes = require("./routes/carRoute");
const dbconnect = require("./config/database");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Enable CORS for requests from 'https://home-bliss.vercel.app'
app.use(
  cors({
    origin: "https://car-manage-5ohh.vercel.app/",
    credentials: true,
  })
);

app.listen(PORT, () => {
  console.log(`Server running , http://localhost:${PORT}`);
});
dbconnect();

app.use("/api/user", userRoutes);
app.use("/api/car", carRoutes);

app.get("/", (req, res) => {
  res.send("<h1>HOMEPAGE</h1>");
});
