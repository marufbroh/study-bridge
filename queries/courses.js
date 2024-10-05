import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/lib/convertData";
import { Category } from "@/model/category-model";
import { Course } from "@/model/course-model";
import { Module } from "@/model/module.model";
import { Testimonial } from "@/model/testimonial-model";
import { User } from "@/model/user-model";
import { getEnrollmentsForCourse } from "./enrollments";
import { getTestimonialsForCourse } from "./testimonials";

export const getCourseList = async () => {
  const courses = await Course.find({})
    .select([
      "title",
      "subtitle",
      "thumbnail",
      "modules",
      "price",
      "category",
      "instructor",
    ])
    .populate({
      path: "category",
      model: Category,
    })
    .populate({
      path: "instructor",
      model: User,
    })
    .populate({
      path: "modules",
      model: Module,
    })
    .populate({
      path: "testimonials",
      model: Testimonial,
    })
    .lean();
  return replaceMongoIdInArray(courses);
};

export const getCourseDetails = async (id) => {
  const course = await Course.findById(id)
    .populate({
      path: "category",
      model: Category,
    })
    .populate({
      path: "instructor",
      model: User,
    })
    .populate({
      path: "modules",
      model: Module,
    })
    .populate({
      path: "testimonials",
      model: Testimonial,
      populate: {
        path: "user",
        model: User,
      },
    })
    .lean();

  return replaceMongoIdInObject(course);
};

export const getCourseDetailsByInstructor = async (instructorId) => {
  const courses = await Course.find({ instructor: instructorId }).lean();

  const enrollments = await Promise.all(
    courses.map(async (course) => {
      const enrollment = await getEnrollmentsForCourse(course._id.toString());
      // console.log("enrollment",enrollment);
      return enrollment;
    })
  );

  const totalEnrollments = enrollments.reduce((item, currentValue) => {
    return item.length + currentValue.length;
  });

  // const totalTestimonials = courses.reduce((item, currentValue) => {
  //   return item.testimonials.length + currentValue.testimonials.length;
  // });

  const testimonials = await Promise.all(
    courses.map(async (course) => {
      const testimonial = await getTestimonialsForCourse(course._id.toString());
      // console.log("enrollment",enrollment);
      return testimonial;
    })
  );

  const totalTestimonials = testimonials.flat();

  console.log(totalTestimonials);

  const avgRating =
    totalTestimonials.reduce((acc, obj) => {
      return acc + obj.rating;
    }, 0) / totalTestimonials.length;


  return {
    coursesNumber: courses?.length,
    enrollments: totalEnrollments,
    reviews: totalTestimonials.length,
    rating: avgRating.toPrecision(2),
  };
};
