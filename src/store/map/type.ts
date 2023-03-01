
export interface UseGeoLoc {
  use: true;
  nowLoc: google.maps.LatLngLiteral;
  marker: google.maps.Marker;
  eqCenter: boolean;
}
export interface NUserGeoLoc {
  use: false;
}

export type GeoLoc = UseGeoLoc | NUserGeoLoc;

export type EventPayload = {
  nowLoc: google.maps.LatLngLiteral;
  useGeo: boolean;
  zoom: number;
  eqCenter: boolean;
};

export type EvtHandler<K extends keyof EventPayload> =
  EventPayload[K] extends void ?
    () => unknown :
    (ev: EventPayload[K]) => unknown;
