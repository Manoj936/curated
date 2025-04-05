import { ConnectToDB } from "@/app/libs/db";
import { Product } from "@/app/models/Product.model";
import UserModel from "@/app/models/User.model";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request : NextRequest) {
  try {
    ConnectToDB();
    const { searchParams } = new URL(request?.url);
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = parseInt(searchParams.get("offset") || "0");
    const users = await UserModel.find().sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit)
    .lean();

    if (!users) {
      return NextResponse.json({ error: "no users found" }, { status: 404 });
    }
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
