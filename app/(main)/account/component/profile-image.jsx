"use client";

import Image from "next/image";
import { useState } from "react";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { toast } from "sonner";
import { updateUserProfile } from "@/app/actions/account";

const ProfileImage = ({ loggedInUser }) => {
  const onSuccess = async ({ event, info }) => {
    try {
      if (event === "success") {
        // console.log("secure_url");
        const updatedData = { profilePicture: info?.secure_url };
        await updateUserProfile(loggedInUser?.email, updatedData);
        toast.success("User profile picture updated successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <CldUploadWidget uploadPreset="studybridge" onSuccess={onSuccess}>
        {({ open }) => (
          <div
            className="relative size-28 mx-auto cursor-pointer"
            onClick={() => open()}
          >
            <Image
              src={loggedInUser?.profilePicture || "https://i.pravatar.cc"}
              className="rounded-full shadow-md dark:shadow-gray-800 ring-4 ring-slate-50 dark:ring-slate-800 aspect-square object-cover"
              id="profile-banner"
              alt={`${loggedInUser?.firstName} ${loggedInUser?.lastName}`}
              width={112}
              height={112}
            />
            {/* <label
              className="absolute inset-0 cursor-pointer"
              htmlFor="pro-img"
            /> */}
          </div>
        )}
      </CldUploadWidget>

      {/* <input
        id="pro-img"
        name="profile-image"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={loadFile}
      /> */}
    </>
  );
};

export default ProfileImage;
