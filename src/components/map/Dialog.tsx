import React, { useEffect, useState } from 'react';
import { DialogContent, Dialog, Box, Typography, Chip } from '@mui/material';
import MapManager from '../../store/map';
import { PlaceInfo } from '../../store/map/type';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const placeType = ['', '의류 수거함', '폐건전지/현광등', '아름다운가게', '재활용품판매;'];

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
        sx={{ width: '1000px', padding: '50px 40px' }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ width: '47%', height: '400px' }}>
            {sltPlace.placeImg ? (
              <img style={{ objectFit: 'contain' }} src={sltPlace.placeImg} alt="" />
            ) : (
              <Box
                sx={{
                  borderRadius: '10px',
                  height: '100%',
                  background: '#F5F5F5',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <CameraAltIcon sx={{ fontSize: '72px', color: '#999' }} />
              </Box>
            )}
          </Box>
          <Box sx={{ width: '47%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: 3 }}>
              <Chip label={placeType[sltPlace.LocationType]} color="primary" sx={{ color: '#fff' }} />
              <Typography component="h1" sx={{ fontWeight: 'bold', fontSize: '32px' }}>
                {sltPlace.Content}
              </Typography>
              <Typography>
                주소주소주소주소주소주소
              </Typography>
            </Box>
            <Box sx={{ borderRadius: '15px', background: '#F5FFFA', padding: '25px', flex: '1 0', border: '1px solid #DBF5EC' }}>
              <Typography component="h2" sx={{ fontWeight: 'bold', mb: 2, color: '#13BD7E' }}>
                INFORMATION
              </Typography>
              <Typography sx={{ wordBreak: 'break-word' }}>
                {sltPlace.Content}
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default MapDialog;
