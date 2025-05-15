import { Flight } from './flight';
import { Passenger } from './passenger';

export interface Booking {
  id?: number;
  passenger: Passenger;
  origin: string;
  destination: string;
  departure: string; // ISO 8601 String (z.B. "2025-05-15T13:45:00")
  arrival: string;
  firstFlight: Flight;
  secondFlight?: Flight; // optional
  thirdFlight?: Flight; // optional
  bookingDate: string;
  createdBy?: string;
}
