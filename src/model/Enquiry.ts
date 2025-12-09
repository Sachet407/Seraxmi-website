import mongoose, { Schema, Document } from "mongoose";

export interface Enquiry extends Document {
  fullname: string;
  companyName?: string;
  projectBudget: string;
  email: string;
  projectDescription: string;
}

const EnquirySchema: Schema<Enquiry> = new Schema(
  {
    fullname: {
      type: String,
      required: [true, "Please provide full name"],
    },
    companyName: {
      type: String,
    },
    projectBudget: {
      type: String,
      required: [true, "Please provide project budget"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email address"],
    },
    projectDescription: {
      type: String,
      required: [true, "Please provide project description"],
    },
  },
  { timestamps: true }
);

const EnquiryModel =
  (mongoose.models.Enquiry as mongoose.Model<Enquiry>) ||
  mongoose.model<Enquiry>("Enquiry", EnquirySchema);

export default EnquiryModel;
