import mongoose, { Schema, model, models } from "mongoose";
import { IUser } from "./User.model";

const CurrencyTypes = ["inr", "usd"] as const;
const LicenceTypes = ["personal", "commercial"] as const;
const ebookFileTypes = ["pdf", "epub"] as const;

export interface IEbookProduct {
  _id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  owner: mongoose.Types.ObjectId | IUser;
  fileUrl: string;
  fileType: (typeof ebookFileTypes)[number];
  pages: number;
  author: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const EbookProductSchema = new Schema<IEbookProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    owner: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    fileUrl: { type: String, required: true },
    fileType: { type: String, enum: ebookFileTypes, required: true },
    pages: { type: Number, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const EbookProduct = models?.EbookProduct || model<IEbookProduct>("EbookProduct", EbookProductSchema);

export default EbookProduct;
