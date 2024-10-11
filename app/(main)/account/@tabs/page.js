import ChangePassword from "../component/change-password";
import ContactInfo from "../component/contact-info";
import PersonalDetails from "../component/personal-details";

function Profile() {
  return (
    <>
      <PersonalDetails />
      <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900 mt-[30px]">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
          <ContactInfo />
          <ChangePassword />
        </div>
      </div>
    </>
  );
}

export default Profile;
