// src/app/api/clients/[id]/route.ts (Handling PUT/PATCH for Password Reset)
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ success: false, message: 'Invalid ID format.' }, { status: 400 });
  }

  try {
    const { newPassword } = await request.json();

    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json({ success: false, message: 'Password must be at least 6 characters.' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Find client and update password and email, ensuring only 'client' role is affected
    const updatedClient = await UserModel.findOneAndUpdate(
      { _id: id, role: 'client' },
      { $set: { password: hashedPassword } },
      { new: true, select: '-password' }
    );

    if (!updatedClient) {
      return NextResponse.json({ success: false, message: 'Client not found or ID is incorrect.' }, { status: 404 });
    }

    // Admin should display the new plain-text password to provide to the client
    return NextResponse.json({ success: true, message: 'Client password reset successfully.' }, { status: 200 });

  } catch (error) {
    console.error("Error resetting client password:", error);
    return NextResponse.json({ success: false, message: 'Error resetting password.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ success: false, message: 'Invalid ID format.' }, { status: 400 });
  }
  
  try {
    // Ensure only 'client' role accounts are deleted
    const deletedClient = await UserModel.findOneAndDelete({ _id: id, role: 'client' });

    if (!deletedClient) {
      return NextResponse.json({ success: false, message: 'Client not found or is not a client role.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Client account deleted successfully.' }, { status: 200 });
  } catch (error) {
    console.error("Error deleting client:", error);
    return NextResponse.json({ success: false, message: 'Error deleting client.' }, { status: 500 });
  }
}