const SELECTED_VEHICLE_STORAGE_KEY = "selectedVehicleId";
export const SELECTED_VEHICLE_CHANGED_EVENT = "selected-vehicle-changed";

function isVehicleId(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function readSelectedVehicleId() {
  if (typeof window === "undefined") return undefined;

  try {
    const vehicleId = localStorage.getItem(SELECTED_VEHICLE_STORAGE_KEY);
    return isVehicleId(vehicleId) ? vehicleId : undefined;
  } catch {
    return undefined;
  }
}

export function saveSelectedVehicleId(vehicleId: string) {
  if (typeof window === "undefined" || !isVehicleId(vehicleId)) return;

  try {
    localStorage.setItem(SELECTED_VEHICLE_STORAGE_KEY, vehicleId);
    window.dispatchEvent(new Event(SELECTED_VEHICLE_CHANGED_EVENT));
  } catch {
    // Private browsing or a full storage quota must not block navigation.
  }
}

export function clearSelectedVehicleId() {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(SELECTED_VEHICLE_STORAGE_KEY);
    window.dispatchEvent(new Event(SELECTED_VEHICLE_CHANGED_EVENT));
  } catch {
    // Storage is an enhancement; the app remains usable without it.
  }
}
