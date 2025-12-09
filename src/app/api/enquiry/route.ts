import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import EnquiryModel from "@/model/Enquiry";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    // Basic validation
    if (
      !body.fullname ||
      !body.email ||
      !body.projectBudget ||
      !body.projectDescription
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create a new enquiry
    const enquiry = await EnquiryModel.create({
      fullname: body.fullname,
      companyName: body.companyName,
      projectBudget: body.projectBudget,
      email: body.email,
      projectDescription: body.projectDescription,
    });

    return NextResponse.json({ success: true, data: enquiry }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating enquiry:", error);

    // Handle duplicate key error (E11000)
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: "Email already exists" },
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
    const enquiries = await EnquiryModel.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: enquiries });
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
