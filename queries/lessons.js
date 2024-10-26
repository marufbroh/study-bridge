import { replaceMongoIdInObject } from "@/lib/convertData";
import { Lesson } from "@/model/lesson.model";

export const getLesson = async (lessonId) => {
  const lesson = await Lesson.findById(lessonId).lean();
  return replaceMongoIdInObject(lesson);
};

export const create = async (lessonData) => {
  try {
    const lesson = await Lesson.create(lessonData);
    return JSON.parse(JSON.stringify(lesson));
  } catch (error) {
    throw new Error(error);
  }
};
