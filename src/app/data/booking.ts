import { Flight } from './flight';
import { Passenger } from './passenger';

export interface Booking {
  id?: number;
  passenger: Passenger;
  origin: string;
  destination: string;
  departure: string;
  arrival: string;
  firstFlight: Flight;
  secondFlight?: Flight;
  thirdFlight?: Flight;
  bookingDate: string;
  createdBy?: string;
}
