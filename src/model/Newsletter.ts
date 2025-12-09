import mongoose, { Schema, Document } from "mongoose";

export interface Newsletter extends Document {
  email: string;
}

const NewsletterSchema: Schema<Newsletter> = new Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide an email address"],
      unique: true,
    },
  },
  { timestamps: true }
);

const NewsletterModel =
  (mongoose.models.Newsletter as mongoose.Model<Newsletter>) ||
  mongoose.model<Newsletter>("Newsletter", NewsletterSchema);

export default NewsletterModel;
