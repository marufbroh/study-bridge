"use client";

import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { changeLessonPublishedState, deleteLesson } from "@/app/actions/lesson";
import { changeModulePublishedState, deleteModule } from "@/app/actions/module";
import { useRouter } from "next/navigation";

export const ModuleActions = ({ courseId, module }) => {
  const [action, setAction] = useState();
  const [published, setPublished] = useState(module?.active);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      switch (action) {
        case "change-active": {
          const activeState = await changeModulePublishedState(module?.id);
          setPublished(!published);
          toast.success("The module has been updated!");
          router.refresh();
          break;
        }

        case "delete": {
          if (published) {
            toast.error(
              "A published module can not be deleted. First Unpublished it, then delete."
            );
          }else{
            await deleteModule(module?.id, courseId);
            // router.refresh();
            router.push(`/dashboard/courses/${courseId}`)
          }
          break;
        }

        default: {
          throw new Error("Invalid Module Action");
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
