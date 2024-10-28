import { AccordionContent } from "@/components/ui/accordion";
import SidebarLessonItems from "./sidebar-lesson-items";
import { replaceMongoIdInArray } from "@/lib/convertData";

const SidebarLessons = ({ courseId, lessons, moduleSlug }) => {
  const allLessons = replaceMongoIdInArray(lessons).toSorted(
    (a, b) => a.order - b.order
  );

  return (
    <AccordionContent>
      <div className="flex flex-col w-full gap-3">
        {allLessons.map((lesson) => (
          <SidebarLessonItems
            key={lesson?.id}
            courseId={courseId}
            moduleSlug={moduleSlug}
            lesson={lesson}
          />
        ))}
      </div>
    </AccordionContent>
  );
};

export default SidebarLessons;
