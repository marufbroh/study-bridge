import { User } from "@/model/user-model";
import { dbConnect } from "@/service/mongo";
import bcrypt from "bcryptjs/dist/bcrypt";

import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { firstName, lastName, email, password, userRole } =
    await request.json();
  await dbConnect();

  const userExits = await User.findOne({ email: email });

  if (userExits) {
    return new NextResponse("User already exits", {
      status: 500,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 5);

  const newUser = {
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role: userRole,
  };

  try {
    await User.create(newUser);
    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (error) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
};
