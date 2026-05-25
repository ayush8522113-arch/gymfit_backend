import mongoose from "mongoose";

const orderSchema =
  mongoose.Schema({

    user: {

      type:
        mongoose.Schema.Types.ObjectId,

      ref: "User",

    },

    products: Array,

    totalPrice: Number,

    paymentStatus: {

      type: String,

      default: "Pending",

    },

    razorpayPaymentId: String,

  });

const Order =
  mongoose.model(
    "Order",
    orderSchema
  );

export default Order;