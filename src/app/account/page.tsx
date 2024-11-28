import { Metadata, NextPage } from "next";

import { auth } from "@/services/auth";

export const metadata: Metadata = {
  title: "Guest Area",
};

const Page: NextPage = async () => {
  const session = await auth();
  const firstName = session?.user?.name?.split("").at(0) || "";

  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome, {firstName}
    </h2>
  );
};

export default Page;
