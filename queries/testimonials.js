import { replaceMongoIdInArray } from "@/lib/convertData";
import { Testimonial } from "@/model/testimonial-model";


export const getTestimonialsForCourse = async (courseId) => {
  const testimonials = await Testimonial.find({ courseId: courseId }).lean();

  return replaceMongoIdInArray(testimonials);
};
