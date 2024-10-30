import { CourseProgress } from "@/components/course-progress";
import DownloadCertificate from "./download-certificate";
import GiveReview from "./give-review";
import SidebarModules from "./sidebar-modules";
import { getCourseDetails } from "@/queries/courses";
import { Watch } from "@/model/watch-model";
import { getLoggedInUser } from "@/lib/loggedin-user";
import { getAReport } from "@/queries/reports";

export const CourseSidebar = async ({ courseId }) => {
  const course = await getCourseDetails(courseId);
  const loggedInUser = await getLoggedInUser();

  const report = await getAReport({
    course: courseId,
    student: loggedInUser?.id,
  });

  const totalCompletedModules = report?.totalCompletedModules
    ? report?.totalCompletedModules.length
    : 0;

  const totalModules = course?.modules ? course.modules.length : 0;

  const totalProgress =
    totalModules > 0 ? (totalCompletedModules / totalModules) * 100 : 0;

  const updatedModules = await Promise.all(
    course.modules.map(async (module) => {
      const moduleId = module?._id.toString();
      const lessons = module?.lessonIds;

      const updatedLessons = await Promise.all(
        lessons.map(async (lesson) => {
          const lessonId = lesson?._id.toString();

          const watch = await Watch.findOne({
            lesson: lessonId,
            module: moduleId,
            user: loggedInUser.id,
          });

          if (watch?.state) {
            lesson.state = "completed";
          }

          return lesson;
        })
      );

      return module;
    })
  );

  return (
    <>
      <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
        <div className="p-8 flex flex-col border-b">
          <h1 className="font-semibold">Reactive Accelerator</h1>

          {
            <div className="mt-10">
              <CourseProgress variant="success" value={totalProgress} />
            </div>
          }
        </div>

        <SidebarModules courseId={courseId} modules={updatedModules} />

        <div className="w-full px-6">
          <DownloadCertificate courseId={courseId} />
          <GiveReview courseId={courseId} />
        </div>
      </div>
    </>
  );
};
