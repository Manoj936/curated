import { authOptions } from "@/app/libs/auth";
import { sellerRole, superuserRole } from "@/app/libs/constant";
import { ConnectToDB } from "@/app/libs/db";
import EbookProduct from "@/app/models/Ebook.model";
import { IEbookProduct } from "@/app/models/Ebook.model";

import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await ConnectToDB();
    // Get query parameters from the request URL
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== sellerRole) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = parseInt(searchParams.get("offset") || "0");

    // Build the query object conditionally
    const query: any = {};

    query.owner = session.user.id;

    //search the product efficiently
    const products = await EbookProduct.find(query)
      .skip(offset)
      .limit(limit)
      .lean();
    return NextResponse.json({ success: true, data: products });
  } catch (err) {
    console.error("Error fetching ebooks:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}



export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== sellerRole) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await ConnectToDB();
    const requestBody: IEbookProduct = await request.json();

    const { isValid, errors } = await checkEbookValidation(requestBody);

    if (!isValid) {
      return NextResponse.json({ error: errors }, { status: 400 });
    }

    if(requestBody._id){
  //edit mode
      const saveProduct = await EbookProduct.findByIdAndUpdate( requestBody._id, requestBody, {
        new: true,
      });
      return NextResponse.json(
        { success: true, data: saveProduct },
        { status: 201 }
      );
    }

    //add mode
    let saveProduct;
    saveProduct = await EbookProduct.create({
      ...requestBody,
      owner: session.user.id,
    });
    return NextResponse.json(
      { success: true, data: saveProduct },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error fetching products:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

const checkEbookValidation = (
  reqBody: any
): { isValid: boolean; errors?: string | null } => {
  const {
    name,
    description,

    ebookFileUrl,
    ebookCoverImageUrl,
    author,
    pages,
    price,
  } = reqBody;

  if (
    !name ||
    !description ||
    !ebookFileUrl ||
    !ebookCoverImageUrl ||
    !pages ||
    !author ||
    !price
  ) {
    return { isValid: false, errors: "Enter valid details" };
  }

  return { isValid: true, errors: null };
};
