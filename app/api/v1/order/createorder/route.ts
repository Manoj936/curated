import { authOptions } from "@/app/libs/auth";
import { userRole } from "@/app/libs/constant";
import { ConnectToDB } from "@/app/libs/db";
import Order from "@/app/models/Order.model";
import { Product } from "@/app/models/Product.model";
import { error } from "console";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== userRole) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await request.json();

    await ConnectToDB();
    if (!productId) {
      return NextResponse.json(
        { error: "Please provide product id" },
        { status: 400 }
      );
    }

    const productDetails = await Product.findById(productId);

    if (!productDetails) {
      return NextResponse.json({ error: "Product Not found" }, { status: 400 });
    }

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: Math.round(productDetails.price * 100),
      currency: productDetails.currencyType,
      receipt: `receipt_${Date.now()}`,
      notes: {
        productName: productDetails.name,
      },
    });

    const newOrder = await Order.create({
      product: productId,
      paymentStatus: "pending",
      razorpayOrderId: order.id,
      userId: session.user.id,
      amount: Math.round(productDetails.price * 100),
    });
    return NextResponse.json({
      orderId: newOrder._id,
      amount: newOrder.amount,
      currency: newOrder.currency,
    });
  } catch (err) {
    console.error("Error creating order:", err);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
