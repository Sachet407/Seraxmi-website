import mongoose, { Schema, Document } from "mongoose";

export interface IAuthorDetails {
  id: string;
  name: string;
  photo: string;
  role: string;
}

export interface IBlogPostMetadata {
  wordCount: number;
  readingTime: number;
  createdAt: Date;
}

export interface BlogPost extends Document {
  title: string;
  slug: string;
  keywords: string[];
  authorId: string;
  authorDetails: IAuthorDetails;
  blogPhoto: string;
  content: string;
  metadata: IBlogPostMetadata;
  createdAt?: Date;
  updatedAt?: Date;
}

const BlogPostSchema: Schema<BlogPost> = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      trim: true,
      maxlength: [120, "Title cannot exceed 120 characters"],
    },
    slug: {
      type: String,
      required: [true, "Please provide a slug"],
      unique: true,
      trim: true,
    },
    keywords: {
      type: [String],
      default: [],
    },
    authorId: {
      type: String,
      required: [true, "Please provide an author ID"],
    },
    authorDetails: {
      id: { type: String, required: true },
      name: { type: String, required: true },
      photo: { type: String, required: true },
      role: { type: String, required: true },
    },
    blogPhoto: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: [true, "Please provide content"],
    },
    metadata: {
      wordCount: { type: Number, default: 0 },
      readingTime: { type: Number, default: 0 },
      createdAt: { type: Date, default: Date.now },
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// Model definition with type checking
const BlogPostModel =
  (mongoose.models.BlogPost as mongoose.Model<BlogPost>) ||
  mongoose.model<BlogPost>("BlogPost", BlogPostSchema);

export default BlogPostModel;
