// schemas/ebookSchema.ts
import { z } from "zod"

export const CurrencyTypes = ["inr", "usd"] as const
export const LicenceTypes = ["personal", "commercial"] as const


export const ebookSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  ebookFileUrl: z.string().url("Must be a valid URL"),
  ebookCoverImageUrl: z.string().url("Must be a valid URL"),
  author: z.string().min(1, "Author is required"),
  pages: z.number({message:'Must be a number'}).min(5 , "Page is very low"),
  price: z.number({message:'Must be a number'}).min(19 , "Price is too low"),
})
