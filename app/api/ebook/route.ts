import { authOptions } from "@/app/libs/auth";
import { sellerRole, superuserRole } from "@/app/libs/constant";
import { ConnectToDB } from "@/app/libs/db";
import {
  EbookProduct,
  IEbookProduct,
  ImageProduct,
  IProduct,
  Product,
  VideoProduct,
} from "@/app/models/Product.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await ConnectToDB();
    // Get query parameters from the request URL
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = parseInt(searchParams.get("offset") || "0");

    // Build the query object conditionally
    const query: any = {};
    if (type) {
      query.type = type;
    }
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

    const { isValid, errors } = await checkProductValidation(requestBody);

    if (!isValid) {
      return NextResponse.json({ error: errors }, { status: 400 });
    }
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
    owner,
    LicenceTypes,
    currencyType,
    fileUrl,
    fileType,
    pages,
    author,
    price,
  } = reqBody;

  if (
    !name ||
    !description ||
    !owner ||
    !LicenceTypes ||
    !currencyType ||
    !fileUrl ||
    !fileType ||
    !pages ||
    !author ||
    !price
  ) {
    return { isValid: false, errors: "Enter valid details" };
  }

  return { isValid: true, errors: null };
};
