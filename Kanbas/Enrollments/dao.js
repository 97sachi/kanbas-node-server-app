
import Database from "../Database/index.js";

export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  enrollments.push({ _id: Date.now(), user: userId, course: courseId });
}

export function unenrollUserFromCourse(userId, courseId) {
  const { enrollments } = Database;
  Database.enrollments = enrollments.filter(
    (enrollment) => !(enrollment.user === userId && enrollment.course === courseId)
  );
}

export function getUserEnrollments(userId) {
  const { enrollments } = Database;
  return enrollments.filter((enrollment) => enrollment.user === userId);
}

export function getEnrolledCoursesForUser(userId) {
  const { enrollments, courses } = Database; // Access the enrollments and courses data
  const enrolledCourseIds = enrollments
    .filter((enrollment) => enrollment.user === userId) // Find enrollments for the given user
    .map((enrollment) => enrollment.course); // Extract course IDs from the enrollments
  return courses.filter((course) => enrolledCourseIds.includes(course._id)); // Find and return course details
}
