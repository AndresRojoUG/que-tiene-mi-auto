export type Vehicle = {
  id: string;
  brand: string;
  model: string;
  generation: string;
  year: number;
  engine: string;
  fuel: string;
  transmission: string;
};

export const vehicles: Vehicle[] = [
  {
    id: "vw-jetta-a4-classic-2009-2.0",
    brand: "Volkswagen",
    model: "Jetta",
    generation: "A4 / Classic",
    year: 2009,
    engine: "2.0",
    fuel: "Gasolina",
transmission: "Manual",
  },
  {
    id: "vw-golf-a4-2008-2.0",
    brand: "Volkswagen",
    model: "Golf",
    generation: "A4",
    year: 2008,
    engine: "2.0",
    fuel: "Gasolina",
transmission: "Manual",
  },
  {
    id: "nissan-sentra-b16-2011-2.0",
    brand: "Nissan",
    model: "Sentra",
    generation: "B16",
    year: 2011,
    engine: "2.0",
    fuel: "Gasolina",
transmission: "Manual",
  },
];

export function getVehicleById(vehicleId: string | null | undefined) {
  return vehicles.find((vehicle) => vehicle.id === vehicleId);
}
