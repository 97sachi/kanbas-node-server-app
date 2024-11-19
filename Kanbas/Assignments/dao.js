

import Database from "../Database/index.js"; // Assuming a shared Database file

// Create a new assignment
export function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: `${Date.now()}-${Math.floor(Math.random() * 100000)}` };
    Database.assignments = [...Database.assignments, newAssignment];
    return newAssignment;
}

// Update an existing assignment by ID
export function updateAssignment(assignmentId, assignmentUpdates) {
    const { assignments } = Database;
    const assignment = assignments.find((a) => a._id === assignmentId);
    if (!assignment) throw new Error(`Assignment with ID ${assignmentId} not found.`);
    Object.assign(assignment, assignmentUpdates);
    return assignment;
}

// Delete an assignment by ID
export function deleteAssignment(assignmentId) {
    const { assignments } = Database;
    Database.assignments = assignments.filter((a) => a._id !== assignmentId);
}

// Retrieve assignments for a specific course
export function findAssignmentsForCourse(courseId) {
    const { assignments } = Database;
    return assignments.filter((a) => a.course === courseId);
}

// Retrieve a single assignment by ID
export function findAssignmentById(assignmentId) {
    const { assignments } = Database;
    return assignments.find((a) => a._id === assignmentId);
}
