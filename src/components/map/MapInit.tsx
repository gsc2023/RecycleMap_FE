import React, { useEffect, useRef, useState } from 'react';

type GoogleLating = google.maps.LatLng;
type GoogleMap = google.maps.Map;

export const MapInit: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  const [map, setMap] = useState<GoogleMap>();

  const init = (zoomLevel: number, address: GoogleLating): void => {
    if (ref.current) {
      setMap(
        new google.maps.Map(ref.current, {
          zoom: zoomLevel,
          center: address,
          streetViewControl: false,
          rotateControl: false,
          scaleControl: true,
          fullscreenControl: false,
          panControl: false,
          zoomControl: true,
          gestureHandling: 'cooperative',
          draggableCursor: 'pointer',
        })
      )
    }
  };

  const defaultMapStart = (): void => {
    const defaultAddress = new google.maps.LatLng(37.5666805, 126.9784147);
    init(4, defaultAddress);
  };

  const startMap = (): void => {
    if (!map) {
      defaultMapStart();
    }
  };

  useEffect(startMap, [map]);

  return (
    <>
    </>
  );
};

export default MapInit;
