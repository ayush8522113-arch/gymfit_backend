import express from "express";

import User from "../models/User.js";

import {
  protect,
  admin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

/* GET USERS */

router.get(
  "/",

  protect,

  admin,

  async (req, res) => {

    const users =
      await User.find({});

    res.json(users);

  }
);

export default router;