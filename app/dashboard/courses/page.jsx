import { getInstructorDashboardData } from "@/lib/dashboard-helper";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

const CoursesPage = async () => {
  const data = await getInstructorDashboardData();
  // console.log(data);
  return (
    <div className="p-6">
      <DataTable columns={columns} data={data?.courses} />
    </div>
  );
};

export default CoursesPage;
