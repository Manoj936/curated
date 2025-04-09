import { authOptions } from "@/app/libs/auth";
import { userRole } from "@/app/libs/constant";
import { ConnectToDB } from "@/app/libs/db";
import Order from "@/app/models/Order.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== userRole) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await ConnectToDB();
    const { searchParams } = new URL(request?.url);
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = parseInt(searchParams.get("offset") || "0");

    const orders = await Order.find({ userId: session.user.id })
    .populate({
      path:'product',
      options: { strictPopulate: false },
    })
    .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .lean();

    return NextResponse.json(orders, { status: 200 });
  } catch (err) {
    console.error("Error fetching product:", err);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
