import { NextRequest, NextResponse } from "next/server";

export default function GET(request: NextRequest){
    try{
        return NextResponse.json({message: 'VERSION 2 IS NOT YET READY' } , {status:200})
    }
    catch(e){
        console.error("Registration error:", e);
        return NextResponse.json(
          { error: "Failed to register user" },
          { status: 500 }
        );
    }
}