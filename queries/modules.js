import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/lib/convertData";
import { Lesson } from "@/model/lesson.model";
import { Module } from "@/model/module.model";

export const create = async (moduleData) => {
  try {
    const createdModule = await Module.create(moduleData);
    return JSON.parse(JSON.stringify(createdModule));
  } catch (error) {
    throw new Error(error);
  }
};

export const getModule = async (moduleId) => {
  try {
    const singleModule = await Module.findById(moduleId)
    .populate({
      path: "lessonIds",
      model: Lesson
    })
    .lean();
    return replaceMongoIdInObject(singleModule);
  } catch (error) {
    throw new Error(error);
  }
};

export const getModuleBySlug = async (moduleSlug) => {
  try {
    const singleModule = await Module.findOne({slug: moduleSlug}).lean();
    return replaceMongoIdInObject(singleModule);
  } catch (error) {
    throw new Error(error);
  }
};
