import { ItemDetail } from './ItemDetail';

export interface Planet extends ItemDetail {
  name: string;
  rotation_period: string;
  diameter: string;
  population: string;
  gravity: string;
  surface_water: string;
  films: string[];
  orbital_period: string;
  terrain: string;
  residents: string[];
  climate: string;
}
