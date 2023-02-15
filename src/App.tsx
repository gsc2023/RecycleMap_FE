import React, { useState } from 'react';
import { Box } from '@mui/system';
import { createStyle } from './lib/styleHelper';
import { useEffectOnce } from './lib/useEffectOnce';
import { GoogleMap } from '@googlemaps/map-loader';

const style = createStyle({
  top: {
    width: '100%',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  mapTop: {
    width: '100%',
    height: '100%',
  },
});

const App: React.FC = () => {
  const [sltItem, setSltItem] = useState<null | string>(null);
  const [nowLoc, setNowLoc] = useState<google.maps.LatLngLiteral>({
    lat: 37.5639635,
    lng: 126.891867,
  });

  useEffectOnce(async () => {
    let center: google.maps.LatLngLiteral = {
      lat: 37.5639635,
      lng: 126.891867,
    };
    if (navigator.geolocation) {
      
      navigator.geolocation.watchPosition((pos) => {
        console.log('watch')
        console.log({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setNowLoc({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      }, (fail) => {
        console.log('watch fail')
        console.log(fail);
      });
      const ret = await new Promise<GeolocationPosition>((resolve, reject) => navigator.geolocation.getCurrentPosition((pos) => resolve(pos), (fail) => reject(fail))).catch((r) => {
        console.log(r);
        return r;
      });
      if (ret.coords) {
        center = {
          lat: ret.coords.latitude,
          lng: ret.coords.longitude,
        };
        setSltItem(`${center.lat} ${center.lng}`);
      } else {
        setSltItem(ret.message);
      }
    } else {
      
    }
    const mapLoader = new GoogleMap();
    const map = await mapLoader.initMap({
      apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      divId: 'google_map',
      mapOptions: {
        center,
        zoom: 15,
      },
      apiOptions: {
        version: 'weekly',
        libraries: [
          'drawing',
          'geometry',
          'localContext',
          'marker',
          'places',
          'visualization',
        ],
        language: 'ko',
        region: 'ko',
      },
    });
    const marker = new google.maps.Marker({
      position: {
        lat: 37.2830557,
        lng: 127.0448373,
      },
      map,
      title: 'Hello, World!\n',
    });
    const marker2 = new google.maps.Marker({
      position: {
        lat: 37.2830557,
        lng: 127.0448373,
      },
      icon: {
        path: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2z',
        fillColor: 'blue',
        fillOpacity: 0.6,
        strokeWeight: 0,
        anchor: new google.maps.Point(12, 12),
      },
      map,
      title: 'hhhh'
    });
    console.log(marker2);
    marker.set('id', 'ajouUniv');
    marker.addListener('click', (evt) => {
      setSltItem((prev) => prev === marker.get('id') ? null : marker.get('id'));
    });
  });

  return (
    <Box sx={style.sx.top}>
      <Box id="google_map" sx={style.sx.mapTop} />
      {sltItem && (
        <Box sx={{
          position: 'fixed',
          top: '100px',
          left: '10px',
          background: '#fff',
        }}>
          {sltItem}
        </Box>
      )}
    </Box>
  );
}

export default App;
