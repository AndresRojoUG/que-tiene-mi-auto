import type { TechnicalDataVerification } from "./types";

export type FusePanel = {
  /** Stable ID used by every fuse displayed in this panel. */
  id: string;
  vehicleId: string;
  location: "interior" | "bateria";
  /** Market and equipment scope must be explicit before publishing a map. */
  market: string;
  configuration: string;
  rows: number;
  columns: number;
  verification: TechnicalDataVerification;
};

/**
 * A panel is added only when its physical layout and configuration are known.
 * Keeping this separate from individual fuse facts prevents mixing layouts
 * from different generations, markets, or equipment packages.
 */
export const fusePanels: FusePanel[] = [];

export function getFusePanel(panelId: string | undefined) {
  return fusePanels.find((panel) => panel.id === panelId);
}
