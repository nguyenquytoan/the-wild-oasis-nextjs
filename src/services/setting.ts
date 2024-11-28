import { SettingModel } from "@/models/setting/settingModel";
import supabase from "./supabase";

export const getSettingsApi = async () => {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }

  return data as SettingModel;
};
