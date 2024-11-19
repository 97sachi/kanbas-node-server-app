import courses from "./courses.js";
import modules from "./modules.js";
import assignments from "./assignments.js";
import users from "./users.js";
import enrollmentsData from "./enrollments.js";
export default { courses, modules, assignments, users, enrollments: enrollmentsData };

// Make enrollments mutable to allow real-time updates
const enrollments = [...enrollmentsData];

// Enroll a user in a course
export const enrollUser = async (userId, courseId) => {
  const newEnrollment = { _id: `${Date.now()}`, user: userId, course: courseId };
  enrollments.push(newEnrollment);
  return newEnrollment;
};

// Unenroll a user from a course
export const unenrollUser = async (userId, courseId) => {
  const index = enrollments.findIndex(
    (enrollment) => enrollment.user === userId && enrollment.course === courseId
  );
  if (index > -1) {
    enrollments.splice(index, 1);
  }
  return { user: userId, course: courseId };
};

// Get all enrollments for a specific user
export const getUserEnrollments = async (userId) => {
  return enrollments.filter((enrollment) => enrollment.user === userId);
};

// Export the modules, courses, etc., along with enrollments
export { courses, modules, users, assignments, enrollments };
