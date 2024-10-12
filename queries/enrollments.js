import { Course } from "@/model/course-model";

const { replaceMongoIdInArray } = require("@/lib/convertData");
const { Enrollment } = require("@/model/enrollment-model");

export const getEnrollmentsForCourse = async (courseId) => {
  const enrollments = await Enrollment.find({ course: courseId }).lean();
  return replaceMongoIdInArray(enrollments);
};

export async function getEnrollmentsForUser(userId) {
  try {
    const enrollments = await Enrollment.find({ student: userId })
      .populate({
        path: "course",
        model: Course,
      })
      .lean();
    return replaceMongoIdInArray(enrollments);
  } catch (error) {
    throw new Error(error);
  }
}

export const enrollForCourse = async (courseId, userId, paymentMethod) => {
  const newEnrollment = {
    course: courseId,
    student: userId,
    method: paymentMethod,
    enrollment_date: Date.now(),
    status: "not-started",
  };

  try {
    const response = await Enrollment.create(newEnrollment);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
