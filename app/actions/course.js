"use server";

import { getLoggedInUser } from "@/lib/loggedin-user";
import { Course } from "@/model/course-model";
import { Lesson } from "@/model/lesson.model";
import { Module } from "@/model/module.model";
import { create } from "@/queries/courses";

export async function createCourse(data) {
  try {
    const loggedInUser = await getLoggedInUser();
    data["instructor"] = loggedInUser?.id;
    const course = await create(data);

    return course;
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateCourse(courseId, dataToUpdate) {
  try {
    await Course.findByIdAndUpdate(courseId, dataToUpdate);
  } catch (error) {
    throw new Error(error);
  }
}

export async function changeCoursePublishedState(courseId) {
  try {
    const course = await Course.findById(courseId);
    const res = await Course.findByIdAndUpdate(
      courseId,
      {
        active: !course.active,
      },
      { lean: true }
    );

    return res.active;
  } catch (error) {
    throw new Error(error);
  }
}


export async function deleteCourse(courseId) {
  try {
    const course = await Course.findById(courseId);

    if (!course) {
      throw new Error("Course not found");
    }

    // Delete all lessons from the modules of this course
    const moduleIds = course.modules;

    if (moduleIds && moduleIds.length > 0) {
      const modules = await Module.find({ _id: { $in: moduleIds } });

      const lessonIds = modules.flatMap(
        (singleModule) => singleModule.lessonIds
      );
      if (lessonIds.length > 0) {
        await Lesson.deleteMany({ _id: { $in: lessonIds } });
      }

      // Delete the modules
      await Module.deleteMany({ _id: { $in: moduleIds } });
    }

    // Delete the course itself
    await Course.findByIdAndDelete(courseId);
  } catch (error) {
    throw new Error(`Failed to delete course: ${error.message}`);
  }
}
