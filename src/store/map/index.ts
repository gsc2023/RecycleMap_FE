import { GoogleMap } from '@googlemaps/map-loader';
import axios from '../../lib/axios';
import {
  EventPayload,
  EvtHandler,
  GeoLoc,
  PlaceLst,
  PlaceType,
} from './type';

const placeType = ['', '의류 수거함', '폐건전지/현광등', '아름다운가게', '재활용품판매;'];

const LAT_LNG_AJOU = {
  lat: 37.5639635,
  lng: 126.891867,
};

/**
 * google map controller
 * 
 * singleton pattern
 */
class MapManager {
  static instance: MapManager | null = null;

  private _eventMapper: Partial<{
    [K in keyof EventPayload]: EvtHandler<K>[];
  }> = {};

  apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  queriedCoord: google.maps.LatLngLiteral = {
    lat: -1,
    lng: -1,
  };

  geoLocState: GeoLoc;
  loadProm: Promise<void>;

  map!: google.maps.Map;
  infoWindow!: google.maps.InfoWindow;
  watcher: number | null = null;
  searchMarker!: google.maps.Marker;

  placeLst: PlaceLst = {
    cloth: [],
    battery: [],
    shop: [],
    recycle: [],
  };
  apiLock = false;
  dragState = false;
  placeFilter: PlaceType[] = ['cloth'];
  markers: google.maps.Marker[] = [];
  clickedMarker: string | null = null;

  public static getInstance() {
    return this.instance || (this.instance = new MapManager());
  }

  private constructor() {
    window.clickPlace = (p) => {
      this.clickedMarker = p;
      const place = Object.values(this.placeLst).flat().find(i => i.id === p);
      if (!place) {
        throw Error('');
      }
      this.emit('clickMarker', place);
    }
    if (typeof this.apiKey !== 'string' || this.apiKey === '') {
      throw Error('google api map key is not available');
    }
    if (!navigator.geolocation) {
      throw Error('can not use navigator.geolocation');
    }
    this.geoLocState = {
      use: false,
    };
    this.loadProm = new Promise(async (resolve) => {
      const mapLoader = new GoogleMap();
      const divEl = document.createElement('div');
      divEl.id = '__google_map';
      divEl.style.width = '100%';
      divEl.style.height = '100%';
      document.body.append(divEl);
      const map = await mapLoader.initMap({
        apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        divId: '__google_map',
        mapOptions: {
          center: { ...LAT_LNG_AJOU },
          zoom: 15,
          fullscreenControl: false,
          mapTypeControl: false,
          mapTypeId: 'roadmap', // if need TODO
          zoomControl: false,
          streetViewControl: false,
          rotateControl: false,
          panControl: false,
          scaleControl: false,
        },
        apiOptions: {
          version: 'weekly',
          language: 'ko',
          region: 'ko',
          libraries: ['places'],
        },
      });
      this.map = map;
      this.infoWindow = new google.maps.InfoWindow();
      map.addListener('zoom_changed', () => {
        this.emit('zoom', map.getZoom());
        if (this.geoLocState.use && this.geoLocState.eqCenter) {
          const center = map.getCenter();
          if (
            this.geoLocState.nowLoc.lat !== center.lat() ||
            this.geoLocState.nowLoc.lng !== center.lng()
          ) {
            this.geoLocState.eqCenter = false;
            this.emit('eqCenter', false);
          }
        }
      });
      map.addListener('dragstart', () => {
        this.dragState = true;
        if (this.geoLocState.use && this.geoLocState.eqCenter) {
          this.geoLocState.eqCenter = false;
          this.emit('eqCenter', false);
        }
      });
      map.addListener('dragend', () => {
        this.dragState = false;
        const { lat, lng } = map.getCenter().toJSON();
        this.getPlaces(lat, lng);
      });
      map.addListener('center_changed', () => {
        const { lat, lng } = map.getCenter().toJSON();
        if (Math.abs(this.queriedCoord.lat - lat) + Math.abs(this.queriedCoord.lng - lng) >= 0.003) {
          if (this.dragState === false) {
            this.getPlaces(lat, lng);
          }
        }
      });
      this.searchMarker = new google.maps.Marker({
        anchorPoint: new google.maps.Point(0, -29),
        map,
      });
      await this.updateGeoLoc();
      resolve();
    });
  }

  private getPlaces(lat: number, lng: number) {
    if (this.apiLock === false) {
      this.apiLock = true;
      axios.post('/locations/around', {
        Latitude: lat,
        Longitude: lng,
      }).then((resp) => {
        this.placeLst = {
          cloth: [],
          battery: [],
          shop: [],
          recycle: [],
        };
        const mapper = {
          1: this.placeLst.cloth,
          2: this.placeLst.battery,
          3: this.placeLst.shop,
          4: this.placeLst.recycle,
        };
        resp.data.forEach((place: any) => {
          const {
            ID,
            Location,
          } = place;
          const fetchLst = mapper[Location.LocationType as (1 | 2 | 3 | 4)];
          fetchLst.push({ id: ID, ...Location });
        });
        this.queriedCoord = { lat, lng };
        this.updatePlaceMarker();
      }).finally(() => {
        this.apiLock = false;
      });
    }
  }

  attachInput(input: HTMLInputElement) {
    const autocomplete = new google.maps.places.Autocomplete(input, {
      fields: ['formatted_address', 'geometry', 'name'],
      strictBounds: false,
      types: ['establishment'],
    });
    autocomplete.bindTo('bounds', this.map);
    this.searchMarker.setVisible(false);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry || !place.geometry.location) {
        return;
      }
      if (place.geometry.viewport) {
        this.map.fitBounds(place.geometry.viewport);
      } else {
        this.map.setCenter(place.geometry.location);
        this.map.setZoom(17);
      }
      this.searchMarker.setPosition(place.geometry.location);
      this.searchMarker.setVisible(true);
      if (this.geoLocState.use && this.geoLocState.eqCenter) {
        this.geoLocState.eqCenter = false;
        this.emit('eqCenter', false);
      }
    });
  }

  clearSearchLoc() {
    this.searchMarker.setVisible(false);
  }

  async updateGeoLoc() {
    if (this.geoLocState.use && this.geoLocState.eqCenter) return;
    if (typeof this.watcher === 'number') {
      navigator.geolocation.clearWatch(this.watcher);
      this.watcher = null;
    }
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
    if (this.geoLocState.use) {
      this.geoLocState.eqCenter = true;
      this.map.setCenter(this.geoLocState.nowLoc);
      this.emit('eqCenter', true);
      return;
    }
    this.geoLocState = {
      use: true,
      eqCenter: true,
      nowLoc: {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      },
      marker: new google.maps.Marker({
        position: {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        },
        icon: {
          path: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2z',
          fillColor: 'blue',
          fillOpacity: 0.6,
          strokeWeight: 0,
          anchor: new google.maps.Point(12, 12),
        },
        map: this.map,
        title: 'Me',
      }),
    };
    this.map.setCenter(this.geoLocState.nowLoc);
    this.emit('eqCenter', true);
    this.emit('useGeo', true);
    this.watcher = navigator.geolocation.watchPosition(
      (pos) => {
        if (!this.geoLocState.use) throw Error('');
        this.geoLocState.nowLoc = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        this.geoLocState.marker.setPosition(this.geoLocState.nowLoc);
        if (this.geoLocState.eqCenter) {
          this.map.setCenter(this.geoLocState.nowLoc);
        }
        this.emit('nowLoc', this.geoLocState.nowLoc);
      },
      () => {
        if (this.geoLocState.use) {
          if (typeof this.watcher === 'number') {
            navigator.geolocation.clearWatch(this.watcher);
            this.watcher = null;
          }
          this.geoLocState.marker.setMap(null);
          this.geoLocState = { use: false };
          this.emit('useGeo', false);
        }
      },
    );
  }

  changePlaceFilter(k: PlaceType[]) {
    this.placeFilter = k;
    this.updatePlaceMarker();
  }

  updatePlaceMarker() {
    if (this.clickedMarker) {
      this.clickedMarker = null;
      this.emit('clickMarker', null);
    }
    this.markers.forEach((marker) => marker.setMap(null));
    this.markers = [];
    this.placeFilter.forEach((pt) => {
      this.placeLst[pt].forEach((place) => {
        const marker = new google.maps.Marker({
          map: this.map,
          position: {
            lat: place.Latitude,
            lng: place.Longitude,
          },
          title: place.Name,
        });
        marker.set('id', place.id);
        marker.addListener('click', () => {
          if (this.clickedMarker && this.clickedMarker === place.id) {
            this.clickedMarker = null;
            this.emit('clickMarker', null);
          } else {
            this.infoWindow.setContent(`
<div style="padding: 5px 10px; cursor: pointer;" onclick="clickPlace('${place.id}')">
  <div style="display: flex;">
    <div style="margin-right: 10px; font-size: 16px; font-weight: bold;">
      ${place.Content}
    </div>
    <div style="padding: 2px 10px; border-radius: 10px; background: #13BD7E; color: #fff;">
      ${placeType[place.LocationType]}
    </div>
  </div>
  <div style="margin-top: 5px;">
    자세히 보기
  </div>
</div>
            `);
            this.infoWindow.open(this.map, marker);
          }
        });
        this.markers.push(marker);
      });
    });
  }

  closePlaceMarker() {
    this.clickedMarker = null;
    this.emit('clickMarker', null);
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

// eslint-disable-next-line
(window as any).MapManager = MapManager;

export default MapManager;
