import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Typography, ToggleButtonGroup, ToggleButton, Slider, Paper, TextField } from '@mui/material';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import GpsNotFixedIcon from '@mui/icons-material/GpsNotFixed';
import IconButton from '@mui/material/IconButton';
import useForceUpdate from '../lib/useForceUpdate';
import { createStyle } from '../lib/styleHelper';
import MapManager from '../store/map';
import { BatteryIcon, BeautyShop, ClothIcon, RecycleShop } from '../constants/svgs';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import MapDialog from '../components/map/Dialog';

const style = createStyle({
  top: {
    width: '100%',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  selectTop: {
    position: 'fixed',
    right: '1.5%',
    top: '4%',
    background: 'white',
    height: '50%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  selectDivider: {
    width: '100%',
    color: '#E6E6E6',
  },
  selectBox: {
    padding: '0 20px',
    height: '25%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
  },
  slider: {
    width: '300px',
  },
  sliderLoc: {
    position: 'fixed',
    bottom: '20px',
    right: '40px',
    display: 'flex',
    alignItems: 'center',
  },
});

interface IconsEl {
  icon: JSX.Element;
  text: JSX.Element;
  id: number;
}

const iconLst: IconsEl[] = [{
  icon: <ClothIcon style={{ width: '100%', height: '80%' }} />,
  text: (<Typography>의류 수거함</Typography>),
  id: 1,
}, {
  icon: <BatteryIcon style={{ width: '100%', height: '80%' }} />,
  text: <Typography>폐건전지<br />폐형광등</Typography>,
  id: 2,
}, {
  icon: <BeautyShop style={{ width: '100%', height: '80%' }} />,
  text: <Typography>아름다운<br />가게</Typography>,
  id: 3,
}, {
  icon: <RecycleShop style={{ width: '100%', height: '80%' }} />,
  text: <Typography>재활용품<br />판매센터</Typography>,
  id: 4,
}];

const MapPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [sltd, setSltd] = useState<number[]>([]);
  const [zoom, setZoom] = useState(0);
  const forceUpdate = useForceUpdate();

  const mapInstance = MapManager.getInstance();

  const handleChangeZoom = useCallback((v: number, adjMap = false) => {
    setZoom(v);
    if (adjMap) {
      mapInstance.map.setZoom(v);
    }
  }, [mapInstance.map]);

  useEffect(() => {
    // TODO how to remove event listener
    if (ref.current) {
      mapInstance.loadProm.then(() => {
        ref.current?.prepend(mapInstance.map.getDiv());
        mapInstance.addEventListener('zoom', handleChangeZoom);
        mapInstance.addEventListener('eqCenter', forceUpdate);
        setZoom(mapInstance.map.getZoom());
        setLoading(false);
      });
    }
    return () => {
      mapInstance.loadProm.then(() => {
        mapInstance.removeEventListener('zoom', handleChangeZoom);
        mapInstance.removeEventListener('eqCenter', forceUpdate);
      });
    };
  }, [
    ref,
    mapInstance,
    forceUpdate,
    handleChangeZoom,
  ]);

  useEffect(() => {
    if (inputRef.current) {
      const inputCurrent = inputRef.current;
      mapInstance.loadProm.then(() => {
        mapInstance.attachInput(inputCurrent);
      });
    }
  }, [inputRef, mapInstance]);

  const handleClearAutocomplete = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    mapInstance.clearSearchLoc();
  }, [mapInstance]);

  return (
    <Box sx={style.sx.top} ref={ref}>
      <TextField
        inputRef={inputRef}
        sx={{
          position: 'fixed',
          left: '5%',
          top: '5%',
          background: '#fff',
          width: '30%',
        }}
        size="small"
        InputProps={{
          startAdornment: <SearchIcon />,
          endAdornment: (
            <IconButton onClick={handleClearAutocomplete}>
              <CloseIcon />
            </IconButton>
          )
        }}
      />
      <ToggleButtonGroup
        sx={style.sx.selectTop}
        orientation="vertical"
        value={sltd}
        onChange={(_, newV) => setSltd(newV)}
      >
        {iconLst.map(({ icon, text, id }) => (
          <ToggleButton sx={style.sx.selectBox} value={id} key={id}>
            <Box
              sx={{
                color: sltd.includes(id) ? 'primary.main' : 'primary.dark',
                width: '100%',
                height: '50%',
                display: 'flex',
                alignItems: 'center',
              }}>
              {icon}
            </Box>
            <Box sx={{ my: 0.5 }} />
            {text}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <Box sx={style.sx.sliderLoc}>
        <Paper sx={{ borderRadius: '15px', mr: 1.5 }}>
          <IconButton onClick={() => mapInstance.updateGeoLoc()}>
            {mapInstance.geoLocState.use && mapInstance.geoLocState.eqCenter ?
              <GpsFixedIcon sx={{ fontSize: 32, color: 'primary.main' }} /> :
              <GpsNotFixedIcon sx={{ fontSize: 32 }} />
            }
          </IconButton>
        </Paper>
        <Paper sx={{ px: 3, py: 1, borderRadius: '15px' }}>
          <Slider
            sx={style.sx.slider}
            value={zoom}
            min={7}
            max={22}
            step={1}
            onChange={(_, v) => handleChangeZoom(v as number)}
            track="inverted"
          />
        </Paper>
      </Box>
      {loading && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: '#fff',
          }}
        >
          Loading...
        </Box>
      )}
      <MapDialog />
    </Box>
  );
}

export default MapPage;
