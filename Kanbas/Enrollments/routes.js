import * as enrollmentsDao from "./dao.js";

export default function EnrollmentRoutes(app) {
  // Enroll a user in a course
  app.post("/api/enrollments", (req, res) => {
    const { userId, courseId } = req.body;
    try {
      enrollmentsDao.enrollUserInCourse(userId, courseId);
      res.sendStatus(201);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

  // Unenroll a user from a course
  app.delete("/api/enrollments", (req, res) => {
    const { userId, courseId } = req.body;
    try {
      enrollmentsDao.unenrollUserFromCourse(userId, courseId);
      res.sendStatus(204);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

  // Get all enrollments for a user
  app.get("/api/enrollments/:userId", (req, res) => {
    const { userId } = req.params;
    try {
      const enrollments = enrollmentsDao.getUserEnrollments(userId);
      res.json(enrollments);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

  


  app.get("/api/enrollments/:userId/courses", (req, res) => {
    const { userId } = req.params;
    try {
      const courses = enrollmentsDao.getEnrolledCoursesForUser(userId);
      res.json(courses);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
  
}
