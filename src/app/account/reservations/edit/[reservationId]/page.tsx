import UpdateReservationForm from "@/components/UpdateReservationForm";
import { getBookingApi } from "@/services/booking";
import { getCabinApi } from "@/services/cabin";

export interface ReservationProps {
  params: {
    reservationId: number;
  };
}

const Page = async ({ params }: Readonly<ReservationProps>) => {
  const { reservationId } = params;
  const reservation = await getBookingApi(reservationId);
  const { max_capacity: maxCapacity } = await getCabinApi(reservation.cabin_id);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>

      <UpdateReservationForm
        reservation={reservation}
        maxCapacity={maxCapacity}
      />
    </div>
  );
};

export default Page;
