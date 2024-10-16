import { NextResponse } from "next/server";
import fs from "fs";
import { pipeline } from "stream";
import { promisify } from "util";
import { updateCourse } from "@/app/actions/course";

const pump = promisify(pipeline);

export async function POST(request, response) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    const destination = formData.get("destination");

    if (!destination) {
      return new NextResponse("Destination is not specified", {
        status: 500,
      });
    }

    const filePath = `${destination}/${file.name}`;

    await pump(file.stream(), fs.createWriteStream(filePath));

    const courseId = formData.get("courseId")
    await updateCourse(courseId, {thumbnail: file.name})

    return new NextResponse(`File ${file.name} uploaded successfully`);
  } catch (error) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}
