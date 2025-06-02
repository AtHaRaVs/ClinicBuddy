const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
console.log("[ENV] PORT:", process.env.PORT); // Debug port

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection with debug
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ DB Error:", err));

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB runtime error:", err);
});

//..................................................routes
const routes = require("./routes");
app.use("/api", routes);

// Basic route
app.get("/", (req, res) => res.send("✅ Server is working!"));

// Server setup
const PORT = process.env.PORT || 5050;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// Handle server errors
server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`❌ Port ${PORT} is already in use`);
  } else {
    console.error("🚨 Server error:", err);
  }
});
