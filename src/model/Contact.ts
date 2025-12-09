import mongoose, { Schema, Document } from "mongoose";

export interface Contact extends Document {
  fullname: string;
  email: string;
  phoneNumber?: string;
  subject: string;
  message: string;
}

const ContactSchema: Schema<Contact> = new Schema(
  {
    fullname: {
      type: String,
      required: [true, "Please provide full name"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email address"],
    },
    phoneNumber: {
      type: String,
    },
    subject: {
      type: String,
      required: [true, "Please provide subject"],
    },
    message: {
      type: String,
      required: [true, "Please provide message"],
    },
  },
  { timestamps: true }
);

const ContactModel =
  (mongoose.models.Contact as mongoose.Model<Contact>) ||
  mongoose.model<Contact>("Contact", ContactSchema);

export default ContactModel;
