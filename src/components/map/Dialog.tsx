import React, { useCallback, useEffect, useState } from 'react';
import { DialogContent, Dialog, Box, Typography, Chip, IconButton } from '@mui/material';
import MapManager from '../../store/map';
import { PlaceInfo } from '../../store/map/type';
import axios from '../../lib/axios';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useBookmarkStore } from '../../store';

const placeType = ['', '의류 수거함', '폐건전지/현광등', '아름다운가게', '재활용품판매'];

const MapDialog: React.FC = () => {
  const { toggleBookMark, bookmarks } = useBookmarkStore();
  const [sltPlace, setSltPlace] = useState<PlaceInfo | null>(null);

  const mapInstance = MapManager.getInstance();

  const handleStarClick = useCallback((id: string) => {
    axios.post(`/bookmarks/${id}`, {
      LocationID: id,
    }).then(() => {
      toggleBookMark(id);
    });
  }, [toggleBookMark]);

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
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography component="h1" sx={{ fontWeight: 'bold', fontSize: '32px' }}>
                  {sltPlace.Content}
                </Typography>
                <IconButton onClick={() => handleStarClick(sltPlace.id)}>
                  {bookmarks.includes(sltPlace.id) ? (
                    <StarIcon sx={{ color: '#13BD7E', fontSize: '32px' }} />
                  ) : (
                    <StarBorderIcon sx={{ color: '#13BD7E', fontSize: '32px' }} />
                  )}
                </IconButton>
              </Box>
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
