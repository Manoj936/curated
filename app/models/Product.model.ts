import mongoose, { Schema, model, models } from "mongoose";
import { IUser } from "./User.model";

const productType = ["image", "video", "ebook"] as const;
const ImageTypes = ["SQUARE", "WIDE", "PORTRAIT", "LANDSCAPE"] as const;
const VideoTypes = ["360p", "480", "720p", "1080p", "2k", "4k"] as const;
const CurrencyTypes = ["INR", "USD"] as const;
const LicenceTypes = ["personal", "commercial"] as const;
const ebookFileTypes = ["pdf", "epub", "mobi"] as const;
/* Interfaces */

export interface IProduct {
  name: string;
  description: string;
  type: (typeof productType)[number];
  owner: mongoose.Types.ObjectId | IUser;
  _id: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
  LicenceTypes: (typeof LicenceTypes)[number];
  currencyType: (typeof CurrencyTypes)[number];
}

export interface IImageProduct {
  imageUrl: string;
  dimensions: {
    width: number;
    height: number;
  };
  variants: (typeof ImageTypes)[number];
  price: number;
}

export interface IVideoProduct {
  videoUrl: string;
  duration: number; // Duration in seconds
  resolution: (typeof VideoTypes)[number];
  dimensions: {
    width: number;
    height: number;
  };
  price: number; // Individual price for videos
}

export interface IEbookProduct {
  fileUrl: string; // URL to download the eBook
  fileType: (typeof ebookFileTypes)[number]; // Supported formats
  pages: number; // Number of pages
  author: string;
  price: number;
}
/* End interface */

// Base Product Schema
const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true, enum: productType }, // Discriminator key
    owner: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    LicenceTypes: { type: String, enum: LicenceTypes, required: true },
    currencyType: { type: String, enum: CurrencyTypes, required: true },
  },
  { timestamps: true, discriminatorKey: "type" }
);

// Create Base Product Model
const Product = models?.Product || model<IProduct>("Product", ProductSchema);

// Image Product Schema
const ImageProductSchema = new Schema<IImageProduct>({
  imageUrl: { type: String, required: true },
  dimensions: {
    width: { type: Number, required: true },
    height: { type: Number, required: true },
  },
  variants: { type: String, enum: ImageTypes, required: true },
  price: { type: Number, required: true }, // Individual price for images
});

// Video Product Schema
const VideoProductSchema = new Schema<IVideoProduct>({
  videoUrl: { type: String, required: true },
  duration: { type: Number, required: true }, // Duration in seconds
  resolution: { type: String, required: true },
  dimensions: {
    width: { type: Number, required: true },
    height: { type: Number, required: true },
  },
  price: { type: Number, required: true }, // Individual price for videos
});

//Ebook Schema

const EbookProductSchema = new Schema<IEbookProduct>({
  fileUrl: { type: String, required: true },
  fileType: { type: String, required: true },
  pages: { type: Number, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
});

// Create Discriminators
const ImageProduct = Product.discriminator("image", ImageProductSchema);
const VideoProduct = Product.discriminator("video", VideoProductSchema);
const EbookProduct = Product.discriminator("ebook", EbookProductSchema);
export { Product, ImageProduct, VideoProduct, EbookProduct };
