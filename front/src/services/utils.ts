import { LatLngExpression } from "leaflet";

export const latLngToId = (latLng: LatLngExpression) => {
  return Object.values(latLng).toLocaleString();
};