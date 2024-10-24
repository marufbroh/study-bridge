"use client";

import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { changeLessonPublishedState, deleteLesson } from "@/app/actions/lesson";

export const LessonActions = ({ lesson, moduleId, onDelete }) => {
  const [action, setAction] = useState();
  const [published, setPublished] = useState(lesson?.active);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      switch (action) {
        case "change-active": {
          const activeState = await changeLessonPublishedState(lesson.id);
          setPublished(!published);
          toast.success("The lesson has been updated!");
          break;
        }

        case "delete": {
          if (published) {
            toast.error(
              "A published lesson can not be deleted. First Unpublished it, then delete."
            );
          }else{
            await deleteLesson(lesson.id, moduleId);
            onDelete();
          }
          break;
        }

        default: {
          throw new Error("Invalid Lesson Action");
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
