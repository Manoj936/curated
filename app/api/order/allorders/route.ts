import { authOptions } from "@/app/libs/auth";
import { superuserRole, userRole } from "@/app/libs/constant";
import { ConnectToDB } from "@/app/libs/db";
import Order from "@/app/models/Order.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== superuserRole) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await ConnectToDB();
    const { limit , offset , userId } = await request.json();

    const query: any = {};
    if (userId) {
      query.userId = userId;
    }
    const max = parseInt(limit || "10");
    const skip = parseInt(offset || "0");
    const orders = await Order.find(query)
      .skip(skip)
      .limit(max)
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
