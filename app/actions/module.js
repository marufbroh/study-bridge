"use server";

import { Course } from "@/model/course-model";
import { Lesson } from "@/model/lesson.model";
import { Module } from "@/model/module.model";
import { create } from "@/queries/modules";
import mongoose from "mongoose";

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
    course.modules.push(createdModule._id);

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

export async function updateModule(moduleId, data) {
  try {
    await Module.findByIdAndUpdate(moduleId, data);
  } catch (error) {
    throw new Error(error);
  }
}

export async function changeModulePublishedState(moduleId) {
  try {
    const currentModule = await Module.findById(moduleId);
    const res = await Module.findByIdAndUpdate(
      moduleId,
      {
        active: !currentModule.active,
      },
      { lean: true }
    );

    return res.active;
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteModule(moduleId, courseId) {
  try {
    const currentModule = await Module.findById(moduleId);

    // here currentModule.lessonIds an array of lesson, I have also Lesson model, So, here is need to delete all of these lesson why someone delete a module.

    if (!currentModule) {
      throw new Error("Module not found");
    }

    // Delete all lessons associated with the module
    const lessonIds = currentModule.lessonIds;
    if (lessonIds && lessonIds.length > 0) {
      await Lesson.deleteMany({ _id: { $in: lessonIds } });
    }

    // Remove the module reference from the course
    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error("Course not found");
    }
    course.modules.pull(new mongoose.Types.ObjectId(`${moduleId}`));
    await course.save();

    // Delete the module itself
    await Module.findByIdAndDelete(moduleId);
  } catch (error) {
    throw new Error(error);
  }
}
