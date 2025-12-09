import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import BlogPostModel from "@/model/BlogPost";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    // Basic validation
    if (!body.title || !body.content || !body.authorId) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create new blog post
    const blogPost = await BlogPostModel.create({
      title: body.title,
      slug: body.slug,
      keywords: body.keywords,
      authorId: body.authorId,
      authorDetails: body.authorDetails,
      blogPhoto: body.blogPhoto,
      content: body.content,
      metadata: body.metadata,
    });

    return NextResponse.json(
      { success: true, data: blogPost },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error creating blog post:", error);
    // Handle duplicate key error (E11000)
    if (error instanceof Error && (error as any).code === 11000) {
      return NextResponse.json(
        { success: false, error: "Slug already exists" },
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
    const posts = await BlogPostModel.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: posts });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
