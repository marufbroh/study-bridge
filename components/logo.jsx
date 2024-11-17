// import Image from "next/image";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
export const Logo = ({ className = "" }) => {
  return (
    // <Image className={cn("max-w-[100px]", className)} src={logo} alt="logo" />
    <div className="relative">
      {/* <span className="bg-gradient-to-r from-blue-700 to-green-700 blur-lg filter opacity-30 w-full h-full absolute inset-0"></span> */}
      <h1 className="text-xl lg:text-2xl cursor-pointer">{"<"}StudyBridge{"/>"}</h1>
      <Badge className="-top-4 -right-10 absolute">Ongoing</Badge>
    </div>
  );
};
