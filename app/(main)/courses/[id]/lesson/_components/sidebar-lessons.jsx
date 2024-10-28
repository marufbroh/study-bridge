import { AccordionContent } from "@/components/ui/accordion";
import SidebarLessonItems from "./sidebar-lesson-items";

const SidebarLessons = () => {
 
  return (
    <AccordionContent>
      <div className="flex flex-col w-full gap-3">
        <SidebarLessonItems/>
      </div>
    </AccordionContent>
  );
};

export default SidebarLessons;
