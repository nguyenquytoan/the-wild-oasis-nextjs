"use client";

import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { BookingModel } from "@/models/booking/booking";
import { deleteReservation } from "@/services/actions";

export interface ReservationListProps {
  bookings: BookingModel[];
}

const ReservationList = ({ bookings }: Readonly<ReservationListProps>) => {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (currentBookings: BookingModel[], bookingId: number) =>
      currentBookings.filter((booking) => booking.id !== bookingId)
  );

  const handleDelete = async (bookingId: number) => {
    optimisticDelete(bookingId);
    await deleteReservation(bookingId);
  };

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

export default ReservationList;
