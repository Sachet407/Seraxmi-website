import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import NewsletterModel from "@/model/Newsletter";

interface MongooseError extends Error {
  code?: number;
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    // Basic validation
    if (!body.email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    // Create newsletter entry
    const subscriber = await NewsletterModel.create({
      email: body.email,
    });

    return NextResponse.json({ success: true, data: subscriber }, { status: 201 });
  } catch (error:unknown) {
    console.error("Error creating subscriber:", error);
const mongooseError = error as MongooseError;
    // Handle duplicate key email
    if (mongooseError instanceof Error && mongooseError.code === 11000) {
      return NextResponse.json(
        { success: false, error: "Email already subscribed" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const subscribers = await NewsletterModel.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: subscribers });
  } catch (error) {
    console.error("Error fetching newsletter subscribers:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
