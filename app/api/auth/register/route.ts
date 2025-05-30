
import { sellerRole, userRole } from "@/app/libs/constant";
import { ConnectToDB } from "@/app/libs/db";
import UserModel from "@/app/models/User.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password ,role } = await request.json();
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: "name , email , password, role are required" },
        { status: 400 }
      );
    }

    if(role !== userRole && role !== sellerRole){
      return NextResponse.json(
        { error: "User can be either a customer or seller" },
        { status: 400 }
      );
    }  
    await ConnectToDB();
    //check exisitng user or not
    const isUserExist = await UserModel.findOne({ email });
    if (isUserExist) {
      return NextResponse.json(
        { error: "Email is already registered" },
        { status: 400 }
      );
    }
    //Add new user
    await UserModel.create({
      name,
      email,
      password,
      role, 
    });

    return NextResponse.json(
      { message: "User registred successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.error("Registration error:", err);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
}