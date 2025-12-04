export interface Bike {
  id: string;
  brand: string;
  model: string;
  category?: string; // e.g., Street, Enduro, Scooter
  imageUrl: string;
}

export type BrandFilter = string | 'TODAS';