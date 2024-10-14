import { Logo } from "@/components/logo";
import { SidebarRoutes } from "./sidebar-routes";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <Link href={"/"} className="p-6">
        <Logo />
      </Link>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
