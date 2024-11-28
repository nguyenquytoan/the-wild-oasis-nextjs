export interface GuestModel {
  id: number;
  full_name: string;
  email: string;
  national_id: string;
  nationality: string;
  country_flag: string;
  created_at: string;
}

export interface GuestUpdateModel {
  nationality: string;
  country_flag: string;
  national_id: string;
}
