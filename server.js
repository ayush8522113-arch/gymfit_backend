import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

/* ROUTES */
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes
  from "./routes/paymentRoutes.js";

  import userRoutes
  from "./routes/userRoutes.js";

  import uploadRoutes
  from "./routes/uploadRoutes.js";

dotenv.config();

console.log(
  process.env.RAZORPAY_KEY_ID
);

connectDB();

const app = express();

/* MIDDLEWARE */
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
  extended: true,
}));

/* ROUTES */
app.use("/api/products", productRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/orders", orderRoutes);

app.use(
  "/api/payment",
  paymentRoutes
);

app.use(
  "/api/users",
  userRoutes
);

app.use(
  "/api/upload",
  uploadRoutes
);

/* TEST */
app.get("/", (req, res) => {
  res.send("GymFit API Running");
});

/* PORT */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});