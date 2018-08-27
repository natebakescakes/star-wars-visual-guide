import { ItemDetail } from './ItemDetail';

export interface Vehicle extends ItemDetail {
  name: string;
  vehicle_class: string;
  max_atmosphering_speed: string;
  manufacturer: string;
  cargo_capacity: string;
  consumables: string;
  model: string;
  pilots: string[];
  crew: string;
  cost_in_credits: string;
  length: string;
  films: string[];
  passengers: string[];
}
