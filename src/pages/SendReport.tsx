import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { Box, Button, Input, MenuItem, Select, TextField, Typography } from '@mui/material';
import MapManager from '../store/map';
import axios from '../lib/axios';
import { useNavigate } from 'react-router-dom';

const SendReport: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [addr, setAddr] = useState('');
  const [nowLoc, setNowLoc] = useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });
  const [pName, setPName] = useState('');
  const [pType, setPType] = useState<1|2|3|4>(1);
  const [content, setContent] = useState('');
  const [imgFile, setImgFile] = useState<File | null>(null);

  const mapInstance = MapManager.getInstance();

  const handleChangeNowLoc = useCallback((pos: google.maps.LatLngLiteral) => {
    setNowLoc(pos);
    console.log(`${pos.lat},${pos.lng}`);
    axios.post('https://www.guithin.com/getLoc', pos)
      .then(res => setAddr(res.data));
  }, []);

  useEffect(() => {
    mapInstance.loadProm.then(() => {
      setLoading(false);
      if (mapInstance.geoLocState.use) {
        handleChangeNowLoc(mapInstance.geoLocState.nowLoc);
      }
    });
    mapInstance.addEventListener('nowLoc', handleChangeNowLoc);
    return () => {
      mapInstance.removeEventListener('nowLoc', handleChangeNowLoc);
    };
  }, [mapInstance, handleChangeNowLoc]);
  
  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    if (loading) {
      alert('주소 로딩중입니다.');
      return;
    }
    if (pName.length === 0) {
      alert('이름을 입력해주세요.');
      return;
    }
    const fd = new FormData();
    fd.append('LocationType', pType.toString());
    fd.append('Name', pName);
    fd.append('Latitude', nowLoc.lat.toString());
    fd.append('Longitude', nowLoc.lng.toString());
    fd.append('Content', content);
    if (imgFile) {
      fd.append('Image', imgFile);
    }
    axios.post('/reports/new', fd).then(() => navigate('/report'));
  }, [
    nowLoc,
    pName,
    pType,
    content,
    loading,
    imgFile,
    navigate,
  ]);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography component="h1">
        현 위치 장소 제보하기
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          flexDirection: 'column',
          display: 'grid',
          width: '80%',
          gap: '20px'
        }}
      >
        장소 이름
        <TextField
          label="장소 이름"
          value={pName}
          onChange={e => setPName(e.target.value)}
        />
        주소
        <TextField
          label="주소"
          value={addr}
          disabled
        />
        장소 종류
        <Select
          value={pType}
          onChange={e => typeof e.target.value !== 'string' && setPType(e.target.value)}
        >
          <MenuItem value={1}>의류수거함</MenuItem>
          <MenuItem value={2}>폐건전지/폐현광등</MenuItem>
          <MenuItem value={3}>아름다운 가게</MenuItem>
          <MenuItem value={4}>재활용품 판매센터</MenuItem>
        </Select>
        INFORMATION
        <TextField
          value={content}
          multiline
          onChange={e => setContent(e.target.value)}
          rows="3"
        />
        {true &&<Input
          type="file"
          inputProps={{
            accept: 'image/*',
            capture: 'camera',
          }}
          // value={imgFile}
          onChange={e => setImgFile((e.target as any).files[0])}
        />}
        <Button type="submit" disabled={loading}>
          제보하기
        </Button>
      </Box>
    </Box>
  );
};

export default SendReport;
