const express = require("express");
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require("./db");
const authRoutes = require("./routes/authRoutes");
const deliveryRoutes = require("./routes/deliveryRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middlewares (optional dependencies)
try {
  const helmet = require('helmet');
  app.use(helmet());
} catch (e) {
  console.warn('helmet not installed — skipping security headers (optional)');
}

try {
  const rateLimit = require('express-rate-limit');
  const limiter = rateLimit({ windowMs: 1 * 60 * 1000, max: 120 }); // 120 req/min
  app.use(limiter);
} catch (e) {
  console.warn('express-rate-limit not installed — skipping rate limiting (optional)');
}

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Mount API routes under /api so frontend can call /api/...
app.use('/api', authRoutes);
app.use('/api', deliveryRoutes);
app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
