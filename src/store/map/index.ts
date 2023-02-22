import { EventPayload, EvtHandler, GeoLoc } from './type';

const LAT_LNG_AJOU = {
  lat: 37.5639635,
  lng: 126.891867,
};

/**
 * google map controller
 * 
 * singleton pattern
 * 
 * div id must be "google_map"
 */
class MapManager {
  static instance: MapManager | null = null;

  private _eventMapper: Partial<{
    [K in keyof EventPayload]: EvtHandler<K>[];
  }> = {};

  apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  mapCenter: google.maps.LatLngLiteral = { ...LAT_LNG_AJOU };

  geoLocState: GeoLoc;
  loadProm: Promise<void>;

  public static getInstance() {
    return this.instance || (this.instance = new MapManager());
  }

  private constructor() {
    if (typeof this.apiKey !== 'string' || this.apiKey === '') {
      throw Error('google api map key is not available');
    }
    if (!navigator.geolocation) {
      throw Error('can not use navigator.geolocation');
    }
    this.geoLocState = {
      use: true,
      nowLoc: { ...LAT_LNG_AJOU },
    };
    this.loadProm = new Promise(async (resolve) => {
      const pos = await new Promise<GeolocationPosition | null>(
        (resPos) => navigator.geolocation.getCurrentPosition(
          (pos) => resPos(pos),
          () => resPos(null),
        ),
      );
      if (pos === null) {
        this.geoLocState = { use: false };
        this.emit('useGeo', false);
        return;
      }
      navigator.geolocation.watchPosition(
        (pos) => {
          this.geoLocState = {
            use: true,
            nowLoc: {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            },
          };
          this.emit('nowLoc', this.geoLocState.nowLoc);
        },
        () => {
          this.geoLocState = { use: false };
          this.emit('useGeo', false);
        },
      );
      


      resolve();
    });
  }

  addEventListener<K extends keyof EventPayload>(evtStr: K, handler: EvtHandler<K>) {
    if (!this._eventMapper[evtStr]) {
      this._eventMapper[evtStr] = [];
    }
    this._eventMapper[evtStr]!.push(handler);
  }
  
  removeEventListener<K extends keyof EventPayload>(evtStr: K, handler: EvtHandler<K>) {
    const lst = this._eventMapper[evtStr];
    if (!lst) return;
    const idx = lst.findIndex((h) => h === handler);
    if (idx !== -1) {
      lst.splice(idx, 1);
    }
  }

  private emit<K extends keyof EventPayload>(evtStr: K, arg: EventPayload[K]) {
    const lst = this._eventMapper[evtStr];
    if (lst) {
      lst.forEach((handler) => handler(arg));
    }
  }
}

export default MapManager;
