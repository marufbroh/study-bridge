import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/lib/convertData";
import { Quizset } from "@/model/quizset-model";
import { Quiz } from "@/model/quizzes-model";

export const getAllQuizSets = async (excludeUnPublished) => {
  try {
    let quizSets = [];

    if (excludeUnPublished) {
      quizSets = await Quizset.find({ active: true }).lean();
    } else {
      quizSets = await Quizset.find().lean();
    }

    return replaceMongoIdInArray(quizSets);
  } catch (error) {
    throw new Error(error);
  }
};

export const getQuizSetById = async (id) => {
  try {
    const quizSet = await Quizset.findById(id)
      .populate({
        path: "quizIds",
        model: Quiz,
      })
      .lean();

    return replaceMongoIdInObject(quizSet);
  } catch (error) {
    throw new Error(error);
  }
};

export async function createQuiz(quizData) {
  try {
    const quiz = await Quiz.create(quizData);
    return quiz._id.toString();
  } catch (error) {
    throw new Error(error);
  }
}
