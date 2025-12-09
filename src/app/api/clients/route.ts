import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

import { encrypt, decrypt } from "@/lib/crypto";
import { NextResponse } from "next/server";

// ===========================
// POST: Create Client
// ===========================

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Username and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 chars." },
        { status: 400 }
      );
    }

    const existingUser = await UserModel.findOne({ username });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Username already exists." },
        { status: 400 }
      );
    }

    // Encrypt
    const encryptedPassword = encrypt(password);

    // Create client user
    const newUser = new UserModel({
      username,
      password: encryptedPassword,
      role: "client",
    });

    await newUser.save();

    return NextResponse.json(
      {
        success: true,
        message: "Client created successfully.",
        username,
        password, // show to admin
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error registering client:", error);

    if (error instanceof Error && (error as any).code === 11000) {
      return NextResponse.json(
        { success: false, message: "Username already exists." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Error registering client." },
      { status: 500 }
    );
  }
}

// ===========================
// GET: Fetch All Clients
// ===========================

export async function GET() {
  await dbConnect();

  try {
    // Fetch clients including password field
    const clients = await UserModel.find({ role: "client" })
      .select("+password")
      .sort({ username: 1 });

    // If you need decrypted/encrypted password for internal use:
    const clientsWithPasswords = clients.map((client) => ({
      ...client.toObject(),
      decryptedPassword: decrypt(client.password), // or decrypt()
    }));

    return NextResponse.json(
      { success: true, data: clientsWithPasswords },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching clients:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch client list." },
      { status: 500 }
    );
  }
}
