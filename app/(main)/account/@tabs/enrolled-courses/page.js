// import { CourseProgress } from "@/components/course-progress";
import { auth } from "@/auth";
import EnrolledCourseCard from "../../component/enrolled-coursecard";
import { redirect } from "next/navigation";
import { getUserByEmail } from "@/queries/users";
import { getEnrollmentsForUser } from "@/queries/enrollments";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

async function EnrolledCourses() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const loggedInUser = await getUserByEmail(session?.user?.email);

  const enrollments = await getEnrollmentsForUser(loggedInUser?.id);

  //   console.log(enrollments);
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {enrollments && enrollments.length > 0 ? (
        <>
          {enrollments.map((enrollment) => (
            <Link
              href={`/courses/${enrollment?.course._id.toString()}/lesson`}
              key={enrollment.id}
            >
              <EnrolledCourseCard enrollment={enrollment} />
            </Link>
          ))}
        </>
      ) : (
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <span
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            No Enrollments found!
          </span>
          <Link href="/courses" className={cn(buttonVariants({ size: "lg" }))}>
            Explore Now
          </Link>
        </div>
      )}
    </div>
  );
}

export default EnrolledCourses;
