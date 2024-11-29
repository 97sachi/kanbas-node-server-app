import model from "./model.js";
import Database from "../Database/index.js";




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


 

export async function findCoursesForUser(userId) {
  const enrollments = await model.find({ user: userId }).populate("course");
  return enrollments.map((enrollment) => enrollment.course);
 }
 export async function findUsersForCourse(courseId) {
  const enrollments = await model.find({ course: courseId }).populate("user");
  return enrollments.map((enrollment) => enrollment.user);
 }
 export function enrollUserInCourse(user, course) {
  return model.create({ user, course });
 }
 export function unenrollUserFromCourse(user, course) {
  return model.deleteOne({ user, course });
 }
 