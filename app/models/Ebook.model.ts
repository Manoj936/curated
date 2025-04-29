import mongoose, { Schema, model, models } from "mongoose";
import { IUser } from "./User.model";

const CurrencyTypes = ["inr", "usd"] as const;
const LicenceTypes = ["personal", "commercial"] as const;
const ebookFileTypes = ["pdf", "epub"] as const;

export interface IEbookProduct {
  _id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  ebookFileUrl: string; // URL to download the eBook
  ebookCoverImageUrl: string
  pages: number; // Number of pages
  owner : mongoose.Types.ObjectId  | IUser
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
    ebookFileUrl: { type: String, required: true },
    ebookCoverImageUrl: { type: String,  required: true },
    pages: { type: Number, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const EbookProduct = models?.EbookProduct || model<IEbookProduct>("EbookProduct", EbookProductSchema);

export default EbookProduct;
