import { IProduct } from "./Product.model";
import mongoose, { Schema, model, models } from "mongoose";
import { IUser } from "./User.model";

const paymentStatus = ["completed", "pending", "failed"] as const;

export interface IOrder {
  _id: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
  product: mongoose.Types.ObjectId | IProduct;
  paymentStatus: (typeof paymentStatus)[number];
  razorpayOrderId: string;
  razorpayPaymentId: string;
  userId: mongoose.Types.ObjectId | IUser;
  amount: number;
 
}

const OrderSchema = new Schema<IOrder>(
  {
    product: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
    paymentStatus: { type: String, enum: paymentStatus, required: true },
    razorpayOrderId: { type: String, required: true },
    razorpayPaymentId: { type: String },
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },

  },
  { timestamps: true }
);

const Order = models?.Order || model<IOrder>("Order", OrderSchema);
export default Order;