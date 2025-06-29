import mongoose, { Schema, Document } from "mongoose";

export interface BlogPost extends Document {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: Date;
  readTime: string;
  category: string;
  imageUrl: string;
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const BlogPostSchema: Schema<BlogPost> = new Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
    maxlength: [120, 'Title cannot exceed 120 characters']
  },
  excerpt: {
    type: String,
    required: [true, 'Please provide an excerpt'],
    trim: true,
    maxlength: [200, 'Excerpt cannot exceed 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Please provide content']
  },
  author: {
    type: String,
    required: [true, 'Please provide an author name'],
    trim: true
  },
  publishDate: {
    type: Date,
    required: [true, 'Please provide a publish date'],
    default: Date.now
  },
  readTime: {
    type: String,
    required: [true, 'Please provide read time'],
    match: [/^\d+\smin read$/, 'Read time format should be "X min read"']
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    trim: true,
    enum: {
      values: ['Design', 'Development', 'Product', 'Case Study', 'Tutorial'],
      message: 'Invalid category'
    }
  },
  imageUrl: {
    type: String,
    required: [true, 'Please provide an image URL'],
    validate: {
      validator: (value: string) => {
        return /^(https?:\/\/)/.test(value);
      },
      message: 'Please provide a valid URL'
    }
  },
  tags: {
    type: [String],
    required: [true, 'Please provide at least one tag'],
    validate: {
      validator: (value: string[]) => value.length > 0,
      message: 'Please provide at least one tag'
    }
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Model definition with type checking
const BlogPostModel = (mongoose.models.BlogPost as mongoose.Model<BlogPost>) || 
                     mongoose.model<BlogPost>("BlogPost", BlogPostSchema);

export default BlogPostModel;