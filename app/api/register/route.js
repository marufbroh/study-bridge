import { User } from "@/model/user-model";
import { dbConnect } from "@/service/mongo";
import bcrypt from "bcryptjs/dist/bcrypt";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { firstName, lastName, email, password, userRole } =
    await request.json();

  await dbConnect();

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return new NextResponse("User already exists", { status: 409 }); // 409 Conflict status
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    const newUser = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: userRole,
    };

    await User.create(newUser);

    return new NextResponse("User has been created", { status: 201 });
  } catch (error) {
    console.error(error);
    return new NextResponse(error.message, { status: 500 });
  }
};
