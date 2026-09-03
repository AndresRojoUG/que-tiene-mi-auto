import { fuses } from "./fuses";
import { relays } from "./relays";
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
  return [
    ...validateTechnicalRecords(fuses, "Fuse"),
    ...validateTechnicalRecords(relays, "Relay"),
  ];
}
