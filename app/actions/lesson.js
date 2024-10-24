"use server";

import { Lesson } from "@/model/lesson.model";
import { Module } from "@/model/module.model";
import { create } from "@/queries/lessons";
import mongoose from "mongoose";

export async function createLesson(formData) {
  try {
    const title = formData.get("title");
    const slug = formData.get("slug");
    const moduleId = formData.get("moduleId");
    const order = formData.get("order");

    const createdLesson = await create({ title, slug, moduleId, order });

    const currentModule = await Module.findById(moduleId);
    currentModule.lessonIds.push(createdLesson?._id);
    currentModule.save();

    return createdLesson;
  } catch (error) {
    throw new Error(error);
  }
}

export async function reOrderLesson(data) {
  try {
    await Promise.all(
      data.map(async (element) => {
        await Lesson.findByIdAndUpdate(element.id, { order: element.position });
      })
    );
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateLesson(lessonId, data) {
  // console.log("**** updateLesson", lessonId, data);
  try {
    await Lesson.findByIdAndUpdate(lessonId, data);
  } catch (error) {
    throw new Error(error);
  }
}

export async function changeLessonPublishedState(lessonId) {
  try {
    const lesson = await Lesson.findById(lessonId);
    const res = await Lesson.findByIdAndUpdate(
      lessonId,
      {
        active: !lesson.active,
      },
      { lean: true }
    );

    return res.active;
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteLesson(lessonId, moduleId) {
  try {
    const currentModule = await Module.findById(moduleId);
    currentModule.lessonIds.pull(new mongoose.Types.ObjectId(`${lessonId}`));
    await Lesson.findByIdAndDelete(lessonId);
    currentModule.save();
  } catch (error) {
    throw new Error(error);
  }
}
