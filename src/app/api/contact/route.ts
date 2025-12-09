import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ContactModel from "@/model/Contact";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    // Basic validation
    if (!body.fullname || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create contact form entry
    const contact = await ContactModel.create({
      fullname: body.fullname,
      email: body.email,
      phoneNumber: body.phoneNumber,
      subject: body.subject,
      message: body.message,
    });

    return NextResponse.json({ success: true, data: contact }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating contact:", error);

    // Duplicate key (if you add unique email later)
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: "Entry already exists" },
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
    const contacts = await ContactModel.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: contacts });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
