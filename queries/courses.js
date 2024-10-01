import { Course } from "@/model/course-model";

export const getCourses = async () => {
  const courses = await Course.find({});
  return courses;
};
