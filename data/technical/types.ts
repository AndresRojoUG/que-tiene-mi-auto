export type TechnicalDataVerification = {
  status: "verified" | "pending";
  source?: string;
  verifiedAt?: string;
};
