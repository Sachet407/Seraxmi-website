import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import TestimonialModel from "@/model/Testimonial";

interface MongooseError extends Error {
  code?: number;
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    // Basic validation
    if (!body.profileImage || !body.position || !body.companyName || !body.review || !body.fullName) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create testimonial
    const testimonial = await TestimonialModel.create({
      profileImage: body.profileImage,
      position: body.position,
      companyName: body.companyName,
      fullName: body.fullName,
      review: body.review,
      stars: body.stars, // optional
    });

    return NextResponse.json({ success: true, data: testimonial }, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating testimonial:", error);
const mongooseError = error as MongooseError;
    // Duplicate key (only triggers if you add unique fields later)
    if (mongooseError instanceof Error && mongooseError.code === 11000) {
      return NextResponse.json(
        { success: false, error: "Duplicate entry" },
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
    const testimonials = await TestimonialModel.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: testimonials }, { status: 200 });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
