// src/Kanbas/Courses/Assignments/dao.js

import AssignmentModel from "./model.js";

// Create a new assignment
export async function createAssignment(assignment) {
  try {
    const newAssignment = new AssignmentModel(assignment);
    return await newAssignment.save();
  } catch (error) {
    throw new Error(`Error creating assignment: ${error.message}`);
  }
}

// Update an existing assignment by ID
export async function updateAssignment(assignmentId, assignmentUpdates) {
  try {
    const updatedAssignment = await AssignmentModel.findByIdAndUpdate(
      assignmentId,
      assignmentUpdates,
      { new: true, runValidators: true }
    );
    if (!updatedAssignment) {
      throw new Error(`Assignment with ID ${assignmentId} not found.`);
    }
    return updatedAssignment;
  } catch (error) {
    throw new Error(`Error updating assignment: ${error.message}`);
  }
}

// Delete an assignment by ID
export async function deleteAssignment(assignmentId) {
  try {
    const deleted = await AssignmentModel.findByIdAndDelete(assignmentId);
    if (!deleted) {
      throw new Error(`Assignment with ID ${assignmentId} not found.`);
    }
  } catch (error) {
    throw new Error(`Error deleting assignment: ${error.message}`);
  }
}

// Retrieve assignments for a specific course
export async function findAssignmentsForCourse(courseId) {
  try {
    return await AssignmentModel.find({ course: courseId }).exec();
  } catch (error) {
    throw new Error(`Error fetching assignments: ${error.message}`);
  }
}

// Retrieve a single assignment by ID
export async function findAssignmentById(assignmentId) {
  try {
    const assignment = await AssignmentModel.findById(assignmentId).exec();
    if (!assignment) {
      throw new Error(`Assignment with ID ${assignmentId} not found.`);
    }
    return assignment;
  } catch (error) {
    throw new Error(`Error fetching assignment: ${error.message}`);
  }
}
