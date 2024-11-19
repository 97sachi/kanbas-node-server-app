import * as assignmentsDao from "./dao.js";

export default function AssignmentRoutes(app) {
    // Create a new assignment
    app.post("/api/assignments", (req, res) => {
        try {
            const newAssignment = assignmentsDao.createAssignment(req.body);
            res.status(201).json(newAssignment);
        } catch (error) {
            res.status(400).send(error.message);
        }
    });

    // Retrieve all assignments for a course
    app.get("/api/courses/:courseId/assignments", (req, res) => {
        const { courseId } = req.params;
        const assignments = assignmentsDao.findAssignmentsForCourse(courseId);
        res.json(assignments);
    });

    // Retrieve a single assignment by ID
    app.get("/api/assignments/:assignmentId", (req, res) => {
        const { assignmentId } = req.params;
        const assignment = assignmentsDao.findAssignmentById(assignmentId);
        if (assignment) {
            res.json(assignment);
        } else {
            res.status(404).send(`Assignment with ID ${assignmentId} not found.`);
        }
    });

    // Update an existing assignment
    app.put("/api/assignments/:assignmentId", (req, res) => {
        const { assignmentId } = req.params;
        try {
            const updatedAssignment = assignmentsDao.updateAssignment(assignmentId, req.body);
            res.json(updatedAssignment);
        } catch (error) {
            res.status(400).send(error.message);
        }
    });

    // Delete an assignment
    app.delete("/api/assignments/:assignmentId", (req, res) => {
        const { assignmentId } = req.params;
        try {
            assignmentsDao.deleteAssignment(assignmentId);
            res.sendStatus(204);
        } catch (error) {
            res.status(400).send(error.message);
        }
    });
}
