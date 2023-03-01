import React, { useEffect, useState } from 'react';
import { DialogContent, Dialog, Box, Typography, Chip } from '@mui/material';
import MapManager from '../../store/map';
import { PlaceInfo } from '../../store/map/type';

const placeType = [, '의류 수거함', '폐건전지/현광등', '아름다운가게', '재활용품판매;']

const MapDialog: React.FC = () => {
  const [sltPlace, setSltPlace] = useState<PlaceInfo | null>(null);

  const mapInstance = MapManager.getInstance();

  useEffect(() => {
    mapInstance.addEventListener('clickMarker', setSltPlace);
    return () => {
      mapInstance.removeEventListener('clickMarker', setSltPlace);
    };
  }, [mapInstance]);

  if (sltPlace === null) {
    return null;
  }

  return (
    <Dialog
      open={true}
      onClose={() => mapInstance.closePlaceMarker()}
      maxWidth={false}
    >
      <DialogContent
        sx={{
          display: 'flex',
          width: '750px',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            width: '50%',
            height: '300px',
            background: '#000',
          }}
        >
        </Box>
        <Box sx={{ width: '50%' }}>
          <Chip label={placeType[sltPlace.LocationType]} color="primary" sx={{ color: '#fff' }} />
          <Typography component="h1" sx={{ fontWeight: 'bold', fontSize: '32px' }}>
            {sltPlace.Content}
          </Typography>

        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default MapDialog;
