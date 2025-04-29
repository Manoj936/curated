

import EbookProduct from "@/app/models/Ebook.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;
    const Ebooketails = await EbookProduct.findById(id).lean();

    if (!Ebooketails) {
      return NextResponse.json({ error: "Ebook not found" }, { status: 404 });
    }
    return NextResponse.json(Ebooketails);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}



export async function DELETE(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;
    const Ebooketails = await EbookProduct.findByIdAndDelete(id).lean();

    if (!Ebooketails) {
      return NextResponse.json({ error: "Ebook not found" }, { status: 404 });
    }
    return NextResponse.json(Ebooketails);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}