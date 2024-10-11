"use client";

import { updateUserContactInfo } from "@/app/actions/account";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

const ContactInfo = ({ userInfo }) => {
  const [infoState, setInfoState] = useState({
    phone: userInfo?.phone,
    website: userInfo?.website,
  });

  const handleChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;

    setInfoState({
      ...infoState,
      [field]: value,
    });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      await updateUserContactInfo(userInfo?.email, infoState);
      toast.success("User contact updated successfully");
    } catch (error) {
      console.log(error);
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h5 className="text-lg font-semibold mb-4">Contact Info :</h5>
      <form onSubmit={handleUpdate}>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Label className="mb-2 block">Phone No. :</Label>
            <Input
              name="phone"
              id="number"
              value={infoState?.phone}
              type="number"
              placeholder="Phone :"
              onChange={handleChange}
            />
          </div>
          <div>
            <Label className="mb-2 block">Website :</Label>
            <Input
              name="website"
              id="url"
              value={infoState?.website}
              type="url"
              placeholder="Url :"
              onChange={handleChange}
            />
          </div>
        </div>
        {/*end grid*/}
        <Button className="mt-5" type="submit">
          Add
        </Button>
      </form>
    </div>
  );
};

export default ContactInfo;
