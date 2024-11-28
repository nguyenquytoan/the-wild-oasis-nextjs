import { CountryModel } from "@/models/common/common";
import supabase from "./supabase";

import { GuestModel, GuestUpdateModel } from "@/models/guest/guestModel";

export const getGuestApi = async (email: string) => {
  const { data } = await supabase
    .from("guests")
    .select("*")
    .eq("email", email)
    .single();

  // No error here! We handle the possibility of no guest in the sign in callback
  return data as GuestModel;
};

export const createGuestApi = async (newGuest: {
  full_name: string;
  email: string;
}) => {
  const { data, error } = await supabase.from("guests").insert([newGuest]);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }

  return data;
};

export const updateGuestApi = async (
  id: number,
  updatedFields: GuestUpdateModel
) => {
  const { data, error } = await supabase
    .from("guests")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }

  return data;
};

export const getCountriesApi = async () => {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag"
    );
    const countries = await res.json();
    return countries as CountryModel[];
  } catch {
    throw new Error("Could not fetch countries");
  }
};
