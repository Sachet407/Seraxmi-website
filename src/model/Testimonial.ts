import mongoose, { Schema, Document } from "mongoose";

export interface Testimonial extends Document {
  profileImage: string;
  position: string;
  fullName: string;
  companyName: string;
  review: string;
  stars?: number;
}

const TestimonialSchema: Schema<Testimonial> = new Schema(
  {
    profileImage: {
      type: String,
      required: [true, "Please provide a profile image URL"],
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
    },
    fullName: {
      type: String,
      required: [true, "Please provide full name"],
    },
    companyName: {
      type: String,
      required: [true, "Please provide company name"],
    },
    review: {
      type: String,
      required: [true, "Please provide a review"],
    },
    stars: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
  },
  { timestamps: true }
);

const TestimonialModel =
  (mongoose.models.Testimonial as mongoose.Model<Testimonial>) ||
  mongoose.model<Testimonial>("Testimonial", TestimonialSchema);

export default TestimonialModel;
