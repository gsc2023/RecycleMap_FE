
export interface UseGeoLoc {
  use: true;
  nowLoc: google.maps.LatLngLiteral;
}
export interface NUserGeoLoc {
  use: false;
}

export type GeoLoc = UseGeoLoc | NUserGeoLoc;

export type EventPayload = {
  example: {
    example: number;
  },
  exVoid: void;
  nowLoc: google.maps.LatLngLiteral;
  useGeo: boolean;
};

export type EvtHandler<K extends keyof EventPayload> =
  EventPayload[K] extends void ?
    () => unknown :
    (ev: EventPayload[K]) => unknown;
