import express from "express";

import Product
  from "../models/Product.js";

import {
  protect,
  admin,
} from "../middleware/authMiddleware.js";

const router = express.Router();



/* =========================================
   GET ALL PRODUCTS
========================================= */

router.get(
  "/",

  async (req, res) => {

    try {

      const products =
        await Product.find({});

      res.json(products);

    } catch (error) {

      res.status(500).json({

        message: error.message,

      });

    }

  }
);



/* =========================================
   GET SINGLE PRODUCT
========================================= */

router.get(
  "/:id",

  async (req, res) => {

    try {

      const product =
        await Product.findById(
          req.params.id
        );

      if (product) {

        res.json(product);

      } else {

        res.status(404).json({

          message:
            "Product not found",

        });

      }

    } catch (error) {

      res.status(500).json({

        message: error.message,

      });

    }

  }
);



/* =========================================
   CREATE PRODUCT
   ADMIN ONLY
========================================= */

router.post(
  "/",

  protect,

  admin,

  async (req, res) => {

    try {

      const {

        name,

        category,

        description,

        price,

        image,

        sizes,

        countInStock,

      } = req.body;

      const product =
        new Product({

          name,

          category,

          description,

          price,

          image,

          sizes,

          countInStock,

        });

      const createdProduct =
        await product.save();

      res.status(201).json(
        createdProduct
      );

    } catch (error) {
      console.log(error);

      res.status(500).json({

        message: error.message,

      });

    }

  }
);



/* =========================================
   UPDATE PRODUCT
   ADMIN ONLY
========================================= */

router.put(
  "/:id",

  protect,

  admin,

  async (req, res) => {

    try {

      const product =
        await Product.findById(
          req.params.id
        );

      if (product) {

        product.name =
          req.body.name ||
          product.name;

        product.category =
          req.body.category ||
          product.category;

        product.description =
          req.body.description ||
          product.description;

        product.price =
          req.body.price ||
          product.price;

        product.image =
          req.body.image ||
          product.image;

        product.sizes =
          req.body.sizes ||
          product.sizes;

        product.countInStock =
          req.body.countInStock ||
          product.countInStock;

        const updatedProduct =
          await product.save();

        res.json(updatedProduct);

      } else {

        res.status(404).json({

          message:
            "Product not found",

        });

      }

    } catch (error) {

      res.status(500).json({

        message: error.message,

      });

    }

  }
);



/* =========================================
   DELETE PRODUCT
   ADMIN ONLY
========================================= */

router.delete(
  "/:id",

  protect,

  admin,

  async (req, res) => {

    try {

      const product =
        await Product.findById(
          req.params.id
        );

      if (product) {

        await product.deleteOne();

        res.json({

          message:
            "Product removed",

        });

      } else {

        res.status(404).json({

          message:
            "Product not found",

        });

      }

    } catch (error) {

      res.status(500).json({

        message: error.message,

      });

    }

  }
);

export default router;