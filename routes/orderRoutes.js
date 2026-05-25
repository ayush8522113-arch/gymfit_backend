import express from "express";

const router = express.Router();

/* TEST ROUTE */
router.get("/", (req, res) => {
  res.json({
    message: "Orders Route Working",
  });
});

export default router;