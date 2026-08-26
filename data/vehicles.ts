export type Vehicle = {
  id: string;
  brand: string;
  model: string;
  generation: string;
  year: number;
  engine: string;
};

export const vehicles: Vehicle[] = [
  {
    id: "vw-jetta-a4-classic-2009-2.0",
    brand: "Volkswagen",
    model: "Jetta",
    generation: "A4 / Classic",
    year: 2009,
    engine: "2.0",
  },
];