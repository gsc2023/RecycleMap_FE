
const LAT_LNG_AJOU = {
  lat: 37.5639635,
  lng: 126.891867,
};

interface UseGeoLoc {
  use: true;
  nowLoc: google.maps.LatLngLiteral;
}
interface NUserGeoLoc {
  use: false;
}

type GeoLoc = UseGeoLoc | NUserGeoLoc;

/**
 * google map controller
 * 
 * singleton pattern
 * 
 * div id must be "google_map"
 */
class MapManager {
  static instance: MapManager | null = null;

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
          // call event
          // user location update
        },
        () => {
          this.geoLocState = { use: false };
          // call event
        },
      );
      


      resolve();
    });
  }
}

export default MapManager;
