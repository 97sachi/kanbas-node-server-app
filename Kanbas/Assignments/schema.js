// src/Kanbas/Assignments/schema.js
import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Title of the assignment
    course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel", required: true }, // Reference to a course document
  },
  { collection: "assignments" } // Collection name in MongoDB
);

export default schema;
