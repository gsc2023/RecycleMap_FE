
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
  clickMarker: PlaceInfo | null;
};

export type EvtHandler<K extends keyof EventPayload> =
  EventPayload[K] extends void ?
    () => unknown :
    (ev: EventPayload[K]) => unknown;



export type PlaceType = 'cloth' | 'battery' | 'shop' | 'recycle';

export interface PlaceInfo {
  id: string;
  Latitude: number;
  Longitude: number;
  Content: string;
  Name: string;
  LocationType: 1 | 2 | 3 | 4;
}

export type PlaceLst = { [key in PlaceType]: PlaceInfo[] };
