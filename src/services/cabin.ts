import { notFound } from "next/navigation";
import supabase from "./supabase";

import { CabinModel } from "@/models/cabin/cabinModel";

export const getCabinsApi = async () => {
  const { data, error } = await supabase
    .from("cabins")
    .select(
      "id, name, max_capacity, regular_price, discount, image_url, created_at"
    )
    .order("name");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data as CabinModel[];
};

export const getCabinApi = async (id: number) => {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    notFound();
  }

  return data as CabinModel;
};
