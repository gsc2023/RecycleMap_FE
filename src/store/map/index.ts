import { GoogleMap } from '@googlemaps/map-loader';
import {
  EventPayload,
  EvtHandler,
  GeoLoc,
  PlaceLst,
  PlaceType,
} from './type';

const markerURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAvCAYAAAAb1BGUAAADdElEQVRYhbWYv2/aQBzFXyxXugEjIwUJQ5DMkMrulFSqlXQChSVTA39AUdeqDN3yY25+TB0ydA3t0C1kSwZaRR1KxJKoQ42aIZGsFEtUSgpItRQkOlBTTMydDeFtiLv73J3P7/vOU51OpwOGGm0LpbqOUr0KvWXip3Vzp40mylCECLLSPNRAhDUkAGCKBm+0LWyeH6JUr6LZtjwNCABRIiKfSCIrzY8GLxhl7F4c+4K6TWJHzUALyd7hq3oRxdrZyNBBbakrrrvATRoMAGv6AfZrp3T4JMC0CfTgBaM8MbCtzfMjXPW9KRzQPdW7F8e+BlICEWiiDIEnnvs02xbe/Djs/ea7Mzr0dKrtVygdVhHsg15ZN9gzynhvnDDH+PSrisr1JbSQjKnft386T75sMTtlpDmszy47oIPSWyZWvxdRbZnMsbbVDLhSXfcE3lYzVDAAqIEIPjx+gSgRqe2KtTM02ha4Ur1KbRglItZnl5kTtBXkCXbUDLNdqa6D0xlblE8kmSselBaSoYnurmZLb5ng3IpEv9Jh1RfYVkaao/5fbZp3Ha5fUSL6XrWtGRJitqHCZxgHhybhAXvSVDjrPNDUvGX7BhXebFsOO/QjvVVjwxVG6nCrRl60x3A7LSSDUwU6vGCc+F59wSi7Rq1+qQEJXHqa/io12xZefvuIhsdEo7dMbJ4fUdsIPEE6rIBLhxWmHVZbJp5V3qFyfUltVzDKWKm8Y04wHVYA/ItR+7VTrOkHzE4AsDStIB1WoAoSYkREtWlCb9WwZ5wwt9rW56evESPi/wyX+vrWc+dx9CqRRD6RAtD3quUTyYmDBZ4gF1/s/e7Bs9I8sxiMq1x8wWHXDpOxt2MS6qYg5/gOuBaSsTStTATu9ljv2OvGQ+/BwauUQMTbpSFGRDyPL9wrfGNIEnItLPlEylckpkkT5aF3NVd4kCfI3dPqtx8Nz3NDS2o+kWLaLksZaQ4xyhjUej6O8Qg8YaZeKjwrzYNV74dp0FB8w4HhJ5WmKBEdNjoy3EsGH5TXrM+EA/QTO6goEZnfYnzBY0RkXgJsebkq+YIDwPrsMtN4aIYyFtyL8fh5PL7gAJCLLw41HpahjA0P8sTVeASejJQFfMGBrvEMrj4XX/C96pHggPNED+ayicO1kNyr+V4+lwwT9cMvS1fWzUjbbesvteQrIZ42FaYAAAAASUVORK5CYII=';

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
  watcher: number | null = null;
  searchMarker!: google.maps.Marker;

  placeLst: PlaceLst = {
    cloth: [{
      id: 'temp1',
      Content: 'temp1',
      Latitude: 37.28009201520448,
      Longitude: 127.049926014682,
      Name: 'temp1',
      LocationType: 1,
    }, {
      id: 'temp2',
      Content: 'temp2',
      Latitude: 37.280506047074994,
      Longitude: 127.0503390748703,
      Name: 'temp2',
      LocationType: 1,
    }],
    battery: [],
    shop: [],
    recycle: [],
  };
  placeFilter: PlaceType[] = ['cloth'];
  markers: google.maps.Marker[] = [];
  clickedMarker: string | null = null;

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
          libraries: ['places']
        },
      });
      this.map = map;
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
        if (this.geoLocState.use && this.geoLocState.eqCenter) {
          this.geoLocState.eqCenter = false;
          this.emit('eqCenter', false);
        }
      });
      map.addListener('center_changed', () => {
        const { lat, lng } = map.getCenter().toJSON();
        if (Math.abs(this.queriedCoord.lat - lat) + Math.abs(this.queriedCoord.lng - lng) >= 0.003) {
          console.log(lat, lng);
          
          // call API
          this.queriedCoord = { lat, lng };
          this.updatePlaceMarker();
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

  updatePlaceMarker() {
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
            this.clickedMarker = place.id;
            this.emit('clickMarker', place);
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
