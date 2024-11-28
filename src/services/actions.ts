"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";

import { auth, signIn } from "./auth";
import { updateGuestApi } from "./guest";
import {
  createBookingApi,
  deleteBookingApi,
  getBookingsApi,
  updateBookingApi,
} from "./booking";
import {
  BookingCreateDataModel,
  BookingCreateModel,
  BookingUpdateModel,
} from "@/models/booking/booking";
import { GuestUpdateModel } from "@/models/guest/guestModel";

// Login feature
export const signInAction = async () => {
  await signIn("google", {
    redirectTo: "/account",
  });
};

export const signOutAction = async () => {
  await signOut({
    redirectTo: "/",
  });
};

export const updateProfileAction = async (formData: FormData) => {
  const session = await auth();
  if (!session) {
    throw new Error("You must be logged in");
  }

  const nationalId = formData.get("national_id")?.toString() || "";
  const [nationality, countryFlag] = (
    formData.get("nationality")?.toString() || ""
  ).split("%");

  if (!/^[a-zA-Z0-9]{6-12}$/gm.test(nationalId)) {
    throw new Error("Please provide a valid national ID");
  }

  const updatedData: GuestUpdateModel = {
    nationality,
    country_flag: countryFlag,
    national_id: nationalId,
  };

  await updateGuestApi((session as any).user?.guestId || "", updatedData);

  revalidatePath("/account/profile");
};

// Reservation feature
export const createReservation = async (
  bookingData: BookingCreateDataModel,
  formData: FormData
) => {
  const session = await auth();
  if (!session) {
    throw new Error("You must be logged in");
  }

  const newBooking: BookingCreateModel = {
    ...bookingData,
    guest_id: (session as any).user.guestId || 1,
    num_guests: parseInt(formData.get("num_guests")?.toString() || ""),
    observations: formData.get("observations")?.toString().slice(0, 1000) || "",
    extras_price: 0,
    total_price: bookingData.cabin_price,
    is_paid: false,
    has_breakfast: false,
    status: "unconfirmed",
  };

  await createBookingApi(newBooking);

  revalidatePath(`/cabins/${bookingData.cabin_id}`);

  redirect("/cabins/thankyou");
};

export const updateReservation = async (
  bookingId: number,
  formData: FormData
) => {
  const session = await auth();
  if (!session) {
    throw new Error("You must be logged in");
  }

  const bookings = await getBookingsApi(bookingId);
  const bookingIds = bookings.map((booking) => booking.id);
  if (!bookingIds.includes(bookingId)) {
    throw new Error("You are not allowed to update this booking");
  }

  const updatedData: BookingUpdateModel = {
    num_guests: parseInt(formData.get("num_guests")?.toString() || ""),
    observations: formData.get("observations")?.toString().slice(0, 1000) || "",
  };

  await updateBookingApi(bookingId, updatedData);

  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");

  redirect("/account/reservations");
};

export const deleteReservation = async (bookingId: number) => {
  const session = await auth();
  if (!session) {
    throw new Error("You must be logged in");
  }

  const bookings = await getBookingsApi(bookingId);
  const bookingIds = bookings.map((booking) => booking.id);
  if (!bookingIds.includes(bookingId)) {
    throw new Error("You are not allowed to delete this booking");
  }

  await deleteBookingApi(bookingId);

  revalidatePath("/account/reservations");
};
