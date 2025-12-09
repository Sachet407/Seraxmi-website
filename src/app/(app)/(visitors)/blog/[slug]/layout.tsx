import type { Metadata } from "next";
import dbConnect from "@/lib/dbConnect";
import BlogPostModel from "@/model/BlogPost";

type Props = {
    params: Promise<{ slug: string }>;
    children: React.ReactNode;
};

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    const { slug } = await params;

    await dbConnect();
    const post = await BlogPostModel.findOne({ slug }).select('title content blogPhoto keywords authorDetails').lean();

    if (!post) {
        return {
            title: "Post Not Found",
        };
    }

    // Strip HTML from content for description
    const description = post.content
        ? post.content.replace(/<[^>]*>?/gm, "").substring(0, 160) + "..."
        : "";

    return {
        title: post.title,
        description: description,
        keywords: post.keywords,
        openGraph: {
            title: post.title,
            description: description,
            type: "article",
            url: `/blog/${slug}`,
            images: [
                {
                    url: post.blogPhoto || "/seraxmi-Dark.svg",
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
            authors: [post.authorDetails?.name],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: description,
            images: [post.blogPhoto || "/seraxmi-Dark.svg"],
        },
    };
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
