"use server";

import { Course } from "@/model/course-model";
import { Module } from "@/model/module.model";
import { create } from "@/queries/modules";

export async function createModule(data) {
  try {
    const title = data.get("title");
    const slug = data.get("slug");
    const courseId = data.get("courseId");
    const order = data.get("order");

    const createdModule = await create({
      title,
      slug,
      course: courseId,
      order,
    });

    const course = await Course.findById(courseId);
    course.modules.push(createModule._id);

    course.save();

    return createModule;
  } catch (error) {
    throw new Error(error);
  }
}

export async function reOrderModules(data) {
  try {
    await Promise.all(
      data.map(async (element) => {
        await Module.findByIdAndUpdate(element.id, { order: element.position });
      })
    );
  } catch (error) {
    throw new Error(error);
  }
}
