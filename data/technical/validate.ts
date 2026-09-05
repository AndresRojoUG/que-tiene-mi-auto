import { fuses } from "./fuses";
import { relays } from "./relays";
import { fusePanels } from "./fuse-panels";
import type { TechnicalDataVerification } from "./types";

type TechnicalRecord = {
  vehicleId: string;
  number: string | number;
  verification: TechnicalDataVerification;
};

export function validateTechnicalRecords(
  records: TechnicalRecord[],
  recordType: string,
): string[] {
  const issues: string[] = [];

  for (const record of records) {
    const label = `${recordType} ${record.number} for ${record.vehicleId}`;
    const verification = record.verification;

    if (verification.status === "verified") {
      if (!verification.source?.trim()) {
        issues.push(`${label} is verified but has no source.`);
      }
      if (!verification.verifiedAt?.trim()) {
        issues.push(`${label} is verified but has no verification date.`);
      }
    }
  }

  return issues;
}

export function validateTechnicalCatalog(): string[] {
  const issues = [
    ...validateTechnicalRecords(fuses, "Fuse"),
    ...validateTechnicalRecords(relays, "Relay"),
  ];

  const panelIds = new Set<string>();
  for (const panel of fusePanels) {
    if (panelIds.has(panel.id)) issues.push(`Fuse panel ${panel.id} is duplicated.`);
    panelIds.add(panel.id);
    if (panel.rows < 1 || panel.columns < 1) {
      issues.push(`Fuse panel ${panel.id} must have at least one row and column.`);
    }
    if (panel.verification.status === "verified") {
      if (!panel.verification.source?.trim() || !panel.verification.verifiedAt?.trim()) {
        issues.push(`Verified fuse panel ${panel.id} needs a source and verification date.`);
      }
    }
  }

  const occupiedPositions = new Set<string>();
  for (const fuse of fuses) {
    if (fuse.verification.status !== "verified") continue;
    if (!fuse.panelId || !fuse.position) {
      issues.push(`Verified fuse ${fuse.number} for ${fuse.vehicleId} needs a panel and position.`);
      continue;
    }
    const panel = fusePanels.find((item) => item.id === fuse.panelId);
    if (!panel) {
      issues.push(`Verified fuse ${fuse.number} references unknown panel ${fuse.panelId}.`);
      continue;
    }
    if (panel.vehicleId !== fuse.vehicleId || panel.location !== fuse.location) {
      issues.push(`Verified fuse ${fuse.number} does not match panel ${fuse.panelId}.`);
    }
    if (fuse.position.row > panel.rows || fuse.position.column > panel.columns) {
      issues.push(`Verified fuse ${fuse.number} is outside panel ${fuse.panelId}.`);
    }
    const positionKey = `${fuse.panelId}:${fuse.position.row}:${fuse.position.column}`;
    if (occupiedPositions.has(positionKey)) {
      issues.push(`More than one verified fuse occupies ${positionKey}.`);
    }
    occupiedPositions.add(positionKey);
  }

  return issues;
}
