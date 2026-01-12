import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    orderItems: [
      {
        name: { 
          type: String, 
          required: true 
        },
        qty: { 
          type: Number, 
          required: true 
        },
        price: { 
          type: Number, 
          required: true 
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    shippingAddress: {
      address: String,
      city: String,
      postalCode: String,
      country: String,
    },
    paymentMethod: { 
      type: String, 
      required: true, 
      default: "Razorpay" 
    },
    totalPrice: { 
      type: Number, 
      required: true, 
      default: 0.0 
    },
    isPaid: { 
      type: Boolean, 
      required: true, 
      default: false 
    },
    paidAt: Date,
    isDelivered: { 
      type: Boolean, 
      required: true, 
      default: false
    },
    deliveredAt: Date,
  },
  { timestamps: true }
);

const ORDER = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default ORDER;