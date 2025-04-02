import ImageKit from "imagekit";
import { NextRequest, NextResponse } from "next/server";

const configuration = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_PUBLIC_URL_ENDPOINT!,
});

export async function GET(request: NextRequest) {
  try {
    const authenticationParameters =
      configuration.getAuthenticationParameters();
    return NextResponse.json(authenticationParameters);
  } catch (err) {
   
    return NextResponse.json(
      { error: "Authentication failed" },
      {
        status: 500,
      }
    );
  }
}
