import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, Input, Typography } from '@mui/material';
import { init, predict } from '../lib/teachImage';
import { useEffectOnce } from '../lib/useEffectOnce';
import DDialog from '../components/detector/Dialog';


const Detector: React.FC = () => {
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [predRes, setPredRes] = useState({
    result: '',
    probability: 0,
    resIdx: 0,
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffectOnce(() => {
    init().then((r) => setLoading(false));
  });

  const handleClick = useCallback(() => {
    const i = document.createElement('input');
    i.type = 'file';
    i.accept = 'image/*';
    i.capture = 'camera';
    i.onchange = (e) => {
      console.log(e.target);
      if (!(e.target instanceof HTMLInputElement)) return;
      const { files } = e.target;
      if (!files) return;
      const srcFile = files[0];
      if (!srcFile.type.startsWith('image')) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (!ev.target) return;
        const src = ev.target.result;
        if (typeof src !== 'string') return;
        setImgSrc(src);
      };
      reader.readAsDataURL(srcFile);
      setImgFile(srcFile);
      predict(srcFile).then((r) => {
        setPredRes(r);
        setDialogOpen(true);
      });
    }
    i.click();
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {imgSrc && (
        <>
          <img style={{ width: '300px', height: '500px', objectFit: 'contain' }} src={imgSrc} alt="" />
          <Typography sx={{ mb: 5 }}>
            {`${predRes.result} ${(predRes.probability * 100).toFixed(2)}%`}
          </Typography>
        </>
      )}
      <Button variant="contained" onClick={handleClick} disabled={loading}>
        사진 업로드
      </Button>
      <DDialog
        text={predRes.result}
        open={dialogOpen}
        type={predRes.resIdx}
        onClose={() => setDialogOpen(false)}
      />
    </Box>
  );
};

export default Detector;
