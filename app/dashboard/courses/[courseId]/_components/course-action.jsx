"use client";

import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { changeCoursePublishedState, deleteCourse } from "@/app/actions/course";

export const CourseActions = ({ courseId, isActive }) => {
  const [action, setAction] = useState(null);
  const [published, setPublished] = useState(isActive);
  const router = useRouter();



  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      switch (action) {
        case "change-active": {
          const activeState = await changeCoursePublishedState(courseId);
          setPublished(!published);
          toast.success("The course has been updated!");
          router.refresh();
          break;
        }

        case "delete": {
          if (published) {
            toast.error(
              "A published course can not be deleted. First Unpublished it, then delete."
            );
          }else{
            await deleteCourse(courseId);
            toast.success("The course has been deleted successfully");
            router.refresh();
            router.push(`/dashboard/courses`)
          }
          break;
        }

        default: {
          throw new Error("Invalid Course Action");
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setAction("change-active")}
        >
          {published ? "Unpublished" : "Publish"}
        </Button>

        <Button size="sm" onClick={() => setAction("delete")}>
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};
