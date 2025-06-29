import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, email, password, isAdmin, adminSecret } = await request.json();

    // Basic validation
    if (!username || !email || !password) {
      return Response.json(
        { success: false, message: 'Username, email, and password are required.' },
        { status: 400 }
      );
    }

    // Check for existing user
    const existingUser = await UserModel.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return Response.json(
        { success: false, message: 'Username or email already exists.' },
        { status: 400 }
      );
    }

    // Admin creation validation
    if (isAdmin) {
      if (!adminSecret || adminSecret !== process.env.ADMIN_CREATION_SECRET) {
        return Response.json(
          { success: false, message: 'Invalid admin creation secret.' },
          { status: 403 }
        );
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      role: isAdmin ? 'admin' : 'user', // Add role field
      isVerified: false
    });

    await newUser.save();

    return Response.json(
      {
        success: true,
        message: isAdmin 
          ? 'Admin registered successfully.' 
          : 'User registered successfully. Please verify your account.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error registering user:', error);
    return Response.json(
      { success: false, message: 'Error registering user.' },
      { status: 500 }
    );
  }
}