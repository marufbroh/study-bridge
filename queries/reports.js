import { Report } from "@/model/report-model";
import { Assessment } from "@/model/assessment-model";

import { replaceMongoIdInObject } from "@/lib/convertData";
import mongoose from "mongoose";
import { Module } from "@/model/module.model";
import { getCourseDetails } from "./courses";

export async function getAReport(filter) {
  try {
    const report = await Report.findOne(filter)
      .populate({
        path: "quizAssessment",
        model: Assessment,
      })
      .lean();
    return replaceMongoIdInObject(report);
  } catch (error) {
    throw new Error(error);
  }
}

export async function createWatchReport(data) {
  try {
    let report = await Report.findOne({
      course: data.courseId,
      student: data.userId,
    });

    if (!report) {
      report = await Report.create({
        course: data.courseId,
        student: data.userId,
      });
    }

    const foundLesson = report.totalCompletedLessons.find((lessonId) => {
      return lessonId.toString() === data.lessonId;
    });

    if (!foundLesson) {
      report.totalCompletedLessons.push(
        new mongoose.Types.ObjectId(`${data.lessonId}`)
      );
    }

    const currentModule = await Module.findById(data.moduleId);

    const lessonIdsCheck = currentModule.lessonIds;

    const completedLessonsIds = report.totalCompletedLessons;

    const isModuleComplete = lessonIdsCheck.every((lesson) => {
      return completedLessonsIds.includes(lesson);
    });

    if (isModuleComplete) {
      const foundModule = report.totalCompletedModules.find((module) => {
        return module.toString() === data.moduleId;
      });

      if (!foundModule) {
        report.totalCompletedModules.push(
          new mongoose.Types.ObjectId(`${data.moduleId}`)
        );
      }
    }

    // Check if the course has completed
    // If so, add the completion time.
    const course = await getCourseDetails(data?.courseId);
    // console.log(course);
    const modulesInCourse = course?.modules;
    const moduleCount = modulesInCourse?.length ?? 0;

    const completedModule = report?.totalCompletedModules;
    const completedModuleCount = completedModule?.length ?? 0;

    // console.log(moduleCount, completedModuleCount);

    if (completedModuleCount >= 1 && completedModuleCount === moduleCount) {
      // console.log("Course completed");
      report.completion_date = Date.now();
    }

    report.save();
  } catch (error) {
    throw new Error(error);
  }
}
