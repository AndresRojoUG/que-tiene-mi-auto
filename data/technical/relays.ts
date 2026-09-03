import type { TechnicalDataVerification } from "./types";

export type Relay = {
  vehicleId: string;
  number: number | string;
  name: string;
  description: string;
  location: "interior" | "bateria" | "motor";
  verification: TechnicalDataVerification;
};

export const relays: Relay[] = [
  {
    vehicleId: "vw-jetta-a4-classic-2009-2.0",
    number: 409,
    name: "Relé principal",
    description:
      "Relé relacionado con la alimentación de sistemas eléctricos y de control del vehículo.",
    location: "interior",
    verification: {
      status: "pending",
    },
  },
];
