export interface IBooking {
  customer_id: string;
  vehicle_id: string;
  rent_start_date: string;
  rent_end_date: string;
  total_price: number;
  status: "active" | "cancelled" | "returned";
}
