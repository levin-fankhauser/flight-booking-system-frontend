import { Airplane } from './airplane';

export interface Flight {
  id: number;
  airplane: Airplane;
  origin: string;
  destination: string;
  departure: string;
  arrival: string;
  createdBy: string;
}
