export interface BookingModel {
  id: number;
  start_date: string;
  end_date: string;
  num_nights: number;
  num_guests: number;
  cabin_price?: number;
  extras_price?: number;
  total_price: number;
  status?: string;
  has_breakfast?: boolean;
  is_paid?: boolean;
  observations?: string;
  cabin_id: number;
  cabins: any;
  guest_id: number;
  created_at: string;
}

export interface BookingCreateDataModel {
  start_date: string;
  end_date: string;
  num_nights: number;
  cabin_price: number;
  cabin_id: number;
}

export interface BookingCreateModel
  extends BookingCreateDataModel,
    BookingUpdateModel {
  extras_price: number;
  total_price: number;
  status: string;
  has_breakfast: boolean;
  is_paid: boolean;
  guest_id: number;
}

export interface BookingUpdateModel {
  num_guests: number;
  observations: string;
}
