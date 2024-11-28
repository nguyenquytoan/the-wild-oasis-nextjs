import CabinCard from "@/components/CabinCard";
import { CabinModel } from "@/models/cabin/cabinModel";
import { getCabinsApi } from "@/services/cabin";

export interface CabinListProps {
  filter: string;
}

const CabinList = async ({ filter }: Readonly<CabinListProps>) => {
  const cabins = await getCabinsApi();

  if (!cabins.length) {
    return null;
  }

  let displayedCabins: CabinModel[] = [];
  if (filter === "all") displayedCabins = cabins;
  else if (filter === "small")
    displayedCabins = cabins.filter((cabin) => cabin.max_capacity <= 3);
  else if (filter === "medium")
    displayedCabins = cabins.filter(
      (cabin) => cabin.max_capacity >= 4 && cabin.max_capacity <= 7
    );
  else if (filter === "large")
    displayedCabins = cabins.filter((cabin) => cabin.max_capacity >= 8);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
};

export default CabinList;
