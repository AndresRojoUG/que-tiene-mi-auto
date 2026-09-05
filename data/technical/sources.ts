export type TechnicalSource = {
  vehicleId: string;
  market: string;
  title: string;
  description: string;
  url: string;
  publisher: string;
  publishedYear: number;
  kind: "official" | "reference";
  topics: readonly ("fuses" | "relays" | "manual")[];
};

/**
 * Sources are kept separately from component data. A source must match the
 * vehicle's market and configuration before it can be used to publish a fuse
 * or relay assignment in the application.
 */
export const technicalSources: TechnicalSource[] = [
  {
    vehicleId: "nissan-sentra-b16-2011-2.0",
    market: "United States",
    title: "2011 Nissan Sentra Owner's Manual",
    description:
      "Official owner manual. Confirm that the vehicle is a U.S.-specification Sentra before using it; fuse assignments can vary by market and equipment.",
    url: "https://owners.nissanusa.com/content/techpub/ManualsAndGuides/Sentra/2011/2011-Sentra-owner-manual.pdf",
    publisher: "Nissan North America",
    publishedYear: 2011,
    kind: "official",
    topics: ["fuses", "manual"],
  },
  {
    vehicleId: "vw-jetta-a4-classic-2009-2.0",
    market: "Reference catalog — confirm vehicle label",
    title: "Volkswagen Jetta Classic 2009 fuse reference",
    description:
      "External reference organized by interior and battery fuse boxes. Confirm the original cover, engine, equipment, and market before using any assignment.",
    url: "https://www.opinautos.com/volkswagen/jetta/info/fusibles/2009/classic-clasico",
    publisher: "Opinautos",
    publishedYear: 2026,
    kind: "reference",
    topics: ["fuses", "relays"],
  },
];

export function getTechnicalSourcesForVehicle(vehicleId: string | null) {
  return technicalSources.filter((source) => source.vehicleId === vehicleId);
}

export function getTechnicalSourcesForTopic(
  vehicleId: string | null,
  topic: TechnicalSource["topics"][number],
) {
  return getTechnicalSourcesForVehicle(vehicleId).filter((source) => source.topics.includes(topic));
}
