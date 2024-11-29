// src/Kanbas/Courses/Assignments/routes.js

import * as assignmentsDao from "./dao.js";

export default function AssignmentRoutes(app) {
  // Create a new assignment
  app.post("/api/assignments", async (req, res) => {
    try {
      const newAssignment = await assignmentsDao.createAssignment(req.body);
      res.status(201).json(newAssignment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Retrieve all assignments for a course
  app.get("/api/courses/:courseId/assignments", async (req, res) => {
    try {
      const { courseId } = req.params;
      const assignments = await assignmentsDao.findAssignmentsForCourse(courseId);
      res.json(assignments);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Retrieve a single assignment by ID
  app.get("/api/assignments/:assignmentId", async (req, res) => {
    try {
      const { assignmentId } = req.params;
      const assignment = await assignmentsDao.findAssignmentById(assignmentId);
      res.json(assignment);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });

  // Update an existing assignment
  app.put("/api/assignments/:assignmentId", async (req, res) => {
    try {
      const { assignmentId } = req.params;
      const assignmentUpdates = req.body;
      const updatedAssignment = await assignmentsDao.updateAssignment(assignmentId, assignmentUpdates);
      res.json(updatedAssignment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Delete an assignment
  app.delete("/api/assignments/:assignmentId", async (req, res) => {
    try {
      const { assignmentId } = req.params;
      await assignmentsDao.deleteAssignment(assignmentId);
      res.sendStatus(204);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
}
