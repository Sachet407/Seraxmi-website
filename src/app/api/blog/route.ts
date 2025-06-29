// app/api/blogPosts/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import BlogPostModel from '@/model/BlogPost';// Assuming you have this model

export async function POST(request: Request) {
  try {
    // Connect to database
    await dbConnect();

    // Parse request body
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.content || !body.author) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create new blog post
    const blogPost = await BlogPostModel.create({
      title: body.title,
      excerpt: body.excerpt || body.content.substring(0, 100) + '...', // Auto-generate excerpt if not provided
      content: body.content,
      author: body.author,
      publishDate: body.publishDate || new Date(), // Default to now if not provided
      readTime: body.readTime || `${Math.ceil(body.content.length / 500)} min read`, // Estimate read time
      category: body.category || 'Uncategorized',
      imageUrl: body.imageUrl || '/default-blog-image.jpg',
      tags: body.tags || []
    });

    return NextResponse.json(
      { success: true, data: blogPost },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to fetch all blog posts
export async function GET() {
  try {
    await dbConnect();
    const posts = await BlogPostModel.find().sort({ publishDate: -1 });
    return NextResponse.json({ success: true, data: posts });
  } catch (error) {
      console.error("Error fetching blog:", error);
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    );
  }
}