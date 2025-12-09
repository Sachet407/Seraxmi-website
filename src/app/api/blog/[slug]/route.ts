import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import BlogPostModel from '@/model/BlogPost';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        await dbConnect();
        const { slug } = await params;

        const post = await BlogPostModel.findOne({ slug });

        if (!post) {
            return NextResponse.json(
                { success: false, error: 'Post not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: post });
    } catch (error) {
        console.error("Error fetching blog post:", error);
        return NextResponse.json(
            { success: false, error: 'Server error' },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        await dbConnect();
        const { slug } = await params;
        const body = await request.json();

        const updatedPost = await BlogPostModel.findOneAndUpdate(
            { slug },
            body,
            { new: true, runValidators: true }
        );

        if (!updatedPost) {
            return NextResponse.json(
                { success: false, error: 'Post not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: updatedPost });
    } catch (error) {
        console.error("Error updating blog post:", error);
        return NextResponse.json(
            { success: false, error: 'Server error' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        await dbConnect();
        const { slug } = await params;

        const deletedPost = await BlogPostModel.findOneAndDelete({ slug });

        if (!deletedPost) {
            return NextResponse.json(
                { success: false, error: 'Post not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        console.error("Error deleting blog post:", error);
        return NextResponse.json(
            { success: false, error: 'Server error' },
            { status: 500 }
        );
    }
}
