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

export type VehicleSelection = Pick<
  Vehicle,
  "brand" | "model" | "generation" | "year" | "engine"
>;

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

function uniqueSorted(values: string[]) {
  return [...new Set(values)].sort((first, second) =>
    first.localeCompare(second, "es"),
  );
}

export function getVehicleBrands() {
  return uniqueSorted(vehicles.map((vehicle) => vehicle.brand));
}

export function getVehicleModels(brand: string) {
  return uniqueSorted(
    vehicles
      .filter((vehicle) => vehicle.brand === brand)
      .map((vehicle) => vehicle.model),
  );
}

export function getVehicleGenerations(brand: string, model: string) {
  return uniqueSorted(
    vehicles
      .filter((vehicle) => vehicle.brand === brand && vehicle.model === model)
      .map((vehicle) => vehicle.generation),
  );
}

export function getVehicleYears(
  brand: string,
  model: string,
  generation: string,
) {
  return [
    ...new Set(
      vehicles
        .filter(
          (vehicle) =>
            vehicle.brand === brand &&
            vehicle.model === model &&
            vehicle.generation === generation,
        )
        .map((vehicle) => vehicle.year),
    ),
  ].sort((first, second) => second - first);
}

export function getVehicleEngines(
  brand: string,
  model: string,
  generation: string,
  year: number,
) {
  return uniqueSorted(
    vehicles
      .filter(
        (vehicle) =>
          vehicle.brand === brand &&
          vehicle.model === model &&
          vehicle.generation === generation &&
          vehicle.year === year,
      )
      .map((vehicle) => vehicle.engine),
  );
}

export function findVehicle(selection: VehicleSelection) {
  return vehicles.find(
    (vehicle) =>
      vehicle.brand === selection.brand &&
      vehicle.model === selection.model &&
      vehicle.generation === selection.generation &&
      vehicle.year === selection.year &&
      vehicle.engine === selection.engine,
  );
}

export function getVehicleDisplayName(vehicle: Vehicle) {
  return `${vehicle.brand} ${vehicle.model}`;
}

export function getVehicleSummary(vehicle: Vehicle) {
  return [
    vehicle.generation,
    String(vehicle.year),
    vehicle.engine,
    vehicle.fuel,
    vehicle.transmission,
  ].join(" · ");
}
