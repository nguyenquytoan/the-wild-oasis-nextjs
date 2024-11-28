import { Suspense } from "react";

import Reservation from "@/components/Reservation";
import Spinner from "@/components/Spinner";
import Cabin from "@/components/Cabin";
import { getCabinApi, getCabinsApi } from "@/services/cabin";

export interface CabinProps {
  params: {
    cabinId: number;
  };
}

export const generateMetadata = async ({ params }: Readonly<CabinProps>) => {
  const { name } = await getCabinApi(params.cabinId);

  return {
    title: `Cabin ${name}`,
  };
};

export const generateStaticParams = async () => {
  const cabins = await getCabinsApi();
  const ids = cabins.map((cabin) => ({ cabinId: cabin.id.toString() }));
  return ids;
};

const Page = async ({ params }: Readonly<CabinProps>) => {
  const cabin = await getCabinApi(params.cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
