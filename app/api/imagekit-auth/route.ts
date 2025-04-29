import ImageKit from "imagekit";
import { NextRequest, NextResponse } from "next/server";

const configuration = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY as string,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_URL_ENDPOINT as string,
});
console.log(configuration , "configuration")

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
