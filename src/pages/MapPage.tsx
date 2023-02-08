import React, { useEffect, useState } from 'react';
import { GoogleMapUtils } from '../lib/GoogleMapUtils';
import { MapInit } from '../components/map/MapInit';

const MapPage: React.FC = () => {

  const [loadScripts, setLoadScripts] = useState(false);

  useEffect(() => {
    const googleMapScripts = GoogleMapUtils();
    googleMapScripts.addEventListener('load', function () {
      setLoadScripts(true);
    })
  }, [])

  return (
    <>
      {loadScripts && (
        <MapInit />
      )}
    </>
  );
};

export default MapPage;
