import mongoose from "mongoose";

const productSchema =
  mongoose.Schema(

    {

      name: {

        type: String,

        required: true,

      },

      category: {

        type: String,

        required: true,

      },

      description: {

        type: String,

        required: true,

      },

      price: {

        type: Number,

        required: true,

      },

      image: {

        type: String,

        required: true,

      },

      galleryImages: [

  {

    type: String,

  },

],

      sizes: [

        {

          type: String,

        },

      ],

      countInStock: {

        type: Number,

        default: 0,

      },

      rating: {

        type: Number,

        default: 0,

      },

      numReviews: {

        type: Number,

        default: 0,

      },

    },

    {

      timestamps: true,

    }

);

const Product =
  mongoose.model(
    "Product",
    productSchema
  );

export default Product;