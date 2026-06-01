const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.send("🚀 Veltrix Labs Backend is Running");
});

// ================= ROUTES =================
// (we will add real routes later)
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// ================= DATABASE CONNECTION =================
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`🔥 Server running on port ${PORT}`);
});

const projectRoutes = require("./routes/projects");

app.use("/api/projects", projectRoutes);