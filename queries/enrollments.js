const { replaceMongoIdInArray } = require("@/lib/convertData");
const { Enrollment } = require("@/model/enrollment-model");

export const getEnrollmentsForCourse = async (courseId) => {
  const enrollments = await Enrollment.find({ course: courseId }).lean();
  return replaceMongoIdInArray(enrollments);
};
