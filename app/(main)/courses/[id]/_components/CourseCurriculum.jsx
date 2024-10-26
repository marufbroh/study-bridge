import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import {
  BookCheck,
  Clock10,
  FileQuestion,
  NotepadText,
  Radio,
  StickyNote,
  Tv,
  Video,
} from "lucide-react";
import CourseModuleList from "./module/CourseModuleList";

const CourseCurriculum = ({ course }) => {
  const totalDuration = course?.modules
    .map((item) => {
      return item.lessonIds.reduce(function (acc, obj) {
        return acc + obj.duration;
      }, 0);
    })
    .reduce(function (acc, item) {
      return acc + item;
    }, 0);

  return (
    <>
      <div class="flex gap-x-5 items-center justify-center flex-wrap mt-4 mb-6 text-gray-600 text-sm">
        <span className="flex items-center gap-1.5">
          <BookCheck className="w-4 h-4" />
          {course?.module?.length} Chapters
        </span>
        <span className="flex items-center gap-1.5">
          <Clock10 className="w-4 h-4" />
          {(totalDuration/3600).toPrecision(2)} Hours
        </span>
        {/* <span className="flex items-center gap-1.5">
          <Radio className="w-4 h-4" />4 Live Class
        </span> */}
      </div>

      {/* contents */}
      <Accordion
        defaultValue={["item-1", "item-2", "item-3"]}
        type="multiple"
        collapsible
        className="w-full"
      >
        {course?.modules &&
          course?.modules.map((module, index) => (
            <CourseModuleList key={index} module={module} />
          ))}
      </Accordion>
    </>
  );
};

export default CourseCurriculum;
