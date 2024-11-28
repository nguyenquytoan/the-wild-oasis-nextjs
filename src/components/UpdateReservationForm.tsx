"use client";

import { BookingModel } from "@/models/booking/booking";
import { updateReservation } from "@/services/actions";
import SubmitButton from "./SubmitButton";

export interface UpdateReservationFormProps {
  reservation: BookingModel;
  maxCapacity: number;
}

const UpdateReservationForm = ({
  reservation,
  maxCapacity,
}: Readonly<UpdateReservationFormProps>) => {
  const { id: reservationId, num_guests, observations } = reservation;

  const handleUpdateReservation = (formData: FormData) =>
    updateReservation(reservationId, formData);

  return (
    <form
      action={handleUpdateReservation}
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
    >
      <div className="space-y-2">
        <label htmlFor="num_guests">How many guests?</label>
        <select
          name="num_guests"
          id="num_guests"
          defaultValue={num_guests}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          required
        >
          <option value="" key="">
            Select number of guests...
          </option>
          {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
            <option value={x} key={x}>
              {x} {x === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="observations">
          Anything we should know about your stay?
        </label>
        <textarea
          name="observations"
          defaultValue={observations}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <SubmitButton pendingLabel="Updating...">
          Update reservation
        </SubmitButton>
      </div>
    </form>
  );
};

export default UpdateReservationForm;
