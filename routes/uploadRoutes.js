import express from "express";

import multer from "multer";

import cloudinary
  from "../config/cloudinary.js";

const router = express.Router();

/* MEMORY STORAGE */

const storage =
  multer.memoryStorage();

const upload =
  multer({ storage });

router.post(
  "/",

  upload.single("image"),

  async (req, res) => {

    try {

      if (!req.file) {

        return res.status(400).json({

          message:
            "No image uploaded",

        });

      }

      /* BASE64 */

      const b64 =
        Buffer.from(
          req.file.buffer
        ).toString("base64");

      const dataURI =
        `data:${req.file.mimetype};base64,${b64}`;

      /* CLOUDINARY */

      const result =
        await cloudinary.uploader.upload(
          dataURI
        );

      res.json({

        image:
          result.secure_url,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          error.message,

      });

    }

  }
);

export default router;