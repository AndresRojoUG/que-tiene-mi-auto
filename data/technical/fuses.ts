import type { TechnicalDataVerification } from "./types";

export type Fuse = {
  vehicleId: string;
  number: number | string;
  amperage: number;
  type: "MINI" | "ATO" | "MAXI";
  description: string;
  location: "interior" | "bateria";
  verification: TechnicalDataVerification;
};
export const fuses: Fuse[] = [
  {
    vehicleId: "vw-jetta-a4-classic-2009-2.0",
    number: 37,
    amperage: 20,
    type: "ATO",
    description:
      "Alimentación relacionada con el relé principal y unidad de control del motor.",
    location: "interior",
    verification: {
      status: "pending",
    },
  },
];
