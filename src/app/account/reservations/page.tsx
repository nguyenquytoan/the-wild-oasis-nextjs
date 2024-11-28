import { Metadata, NextPage } from "next";

import ReservationList from "@/components/ReseravationList";
import { auth } from "@/services/auth";
import { getBookingsApi } from "@/services/booking";
import { BookingModel } from "@/models/booking/booking";

export const metadata: Metadata = {
  title: "Reservations",
};

const Page: NextPage = async () => {
  const session = await auth();
  const bookings: BookingModel[] = await getBookingsApi(
    (session as any).user.guestId || ""
  );

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <a className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </a>
        </p>
      ) : (
        <ReservationList bookings={bookings} />
      )}
    </div>
  );
};

export default Page;
