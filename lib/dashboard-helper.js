import { auth } from "@/auth";
import { getCourseDetailsByInstructor } from "@/queries/courses";
import { getUserByEmail } from "@/queries/users";

export async function getInstructorDashboardData() {
  try {
    const session = await auth();
    const instructor = await getUserByEmail(session?.user?.email);

    const data = await getCourseDetailsByInstructor(instructor?.id, true);

    return data;
  } catch (error) {
    throw new Error(error);
  }
}
