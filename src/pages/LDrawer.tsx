import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import MapIcon from '@mui/icons-material/Map';
import RateReviewIcon from '@mui/icons-material/RateReview';
import HomeIcon from '@mui/icons-material/Home';
import VideocamIcon from '@mui/icons-material/Videocam';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { useNavigate, Link } from 'react-router-dom';

interface NavigateInfo {
  icon: JSX.Element;
  path: string;
  text: string;
}

const lst: NavigateInfo[] = [{
  icon: <HomeIcon sx={{ fontSize: '32px' }} />,
  path: '/',
  text: '홈'
}, {
  icon: <MapIcon sx={{ fontSize: '32px' }} />,
  path: '/map',
  text: '지도',
}, {
  icon: <RateReviewIcon sx={{ fontSize: '32px' }} />,
  path: '/report',
  text: '제보'
}, {
  icon: <VideocamIcon sx={{ fontSize: '32px' }} />,
  path: '/detect',
  text: '카메라',
}, {
  icon: <PermIdentityIcon sx={{ fontSize: '32px' }} />,
  path: '/mypage',
  text: '내 정보',
}];

interface Props {
  open: boolean;
  onClose: () => unknown;
}

const LDrawer: React.FC<Props> = ({ open, onClose }) => {
  const navigate = useNavigate();
  return (
    <Drawer
      sx={{
        zIndex: 1001,
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 100 },
      }}
      open={open}
      onClose={() => onClose()}
      // variant="permanent"
    >
      <List>
        {lst.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(item.path);
                onClose();
              }}
              sx={{ flexDirection: 'column' }}
            >
              <ListItemIcon sx={{ minWidth: 0 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default LDrawer;