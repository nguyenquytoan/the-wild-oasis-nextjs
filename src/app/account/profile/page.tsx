import { Metadata, NextPage } from "next";

import SelectCountry from "@/components/SelectCountry";
import UpdateProfileForm from "@/components/UpdateProfileForm";
import { auth } from "@/services/auth";
import { getGuestApi } from "@/services/guest";

export const metadata: Metadata = {
  title: "Update profile",
};

const Page: NextPage = async () => {
  const session = await auth();
  const guest = await getGuestApi(session?.user?.email || "");

  const nationality = guest.nationality || "portugal";

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <UpdateProfileForm guest={guest}>
        <SelectCountry
          name="nationality"
          id="nationality"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultCountry={nationality}
        />
      </UpdateProfileForm>
    </div>
  );
};

export default Page;
