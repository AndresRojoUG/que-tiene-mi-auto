export type TechnicalSource = {
  vehicleId: string;
  market: string;
  title: string;
  description: string;
  url: string;
  publisher: string;
  publishedYear: number;
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
  },
];

export function getTechnicalSourcesForVehicle(vehicleId: string | null) {
  return technicalSources.filter((source) => source.vehicleId === vehicleId);
}
