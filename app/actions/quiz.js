"use server";

import { Quizset } from "@/model/quizset-model";

export async function updateQuizSet(quizSetId, dataToUpdate) {
  try {
    await Quizset.findByIdAndUpdate(quizSetId, dataToUpdate);
  } catch (error) {
    throw new Error(error);
  }
};
