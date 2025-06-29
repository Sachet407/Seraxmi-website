import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import BlogPostModel from '@/model/BlogPost';

// GET /api/blog/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const blog = await BlogPostModel.findById(params.id);

    if (!blog) {
      return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json({ success: false, message: "Error fetching blog" }, { status: 500 });
  }
}

// PUT /api/blog/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const body = await request.json();

    const updatedBlog = await BlogPostModel.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: updatedBlog,
      message: "Blog updated successfully"
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ success: false, message: "Error updating blog" }, { status: 500 });
  }
}

// DELETE /api/blog/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const deletedBlog = await BlogPostModel.findByIdAndDelete(params.id);

    if (!deletedBlog) {
      return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ success: false, message: "Error deleting blog" }, { status: 500 });
  }
}
