import DateSelector from "@/components/DateSelector";
import ReservationForm from "@/components/ReservationForm";
import LoginMessage from "@/components/LoginMessage";
import { getSettingsApi } from "@/services/setting";
import { getBookedDatesByCabinIdApi } from "@/services/booking";
import { auth } from "@/services/auth";
import { CabinModel } from "@/models/cabin/cabinModel";

export interface ReservationProps {
  cabin: CabinModel;
}

const Reservation = async ({ cabin }: Readonly<ReservationProps>) => {
  const [settings, bookedDates] = await Promise.all([
    getSettingsApi(),
    getBookedDatesByCabinIdApi(cabin.id),
  ]);
  const session = await auth();

  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
};

export default Reservation;
