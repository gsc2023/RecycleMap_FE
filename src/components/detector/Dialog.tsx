import { Box, Dialog, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import plastic from '../../asset/plastic.jpeg';
import cardboard from '../../asset/cardboard.jpeg';
import glass_bottle from '../../asset/glass_bottle.jpeg';
import can from '../../asset/can.jpeg';
import styroform from '../../asset/styroform.jpg';
import battery from '../../asset/battery.png';
import plastic_cup from '../../asset/plastic_cup.jpeg';
import unknown from '../../asset/unknown.jpeg';

interface Props {
  text: string;
  type: number;
  open: boolean;
  onClose: () => unknown;
}

const typeMapper = [
  plastic,
  cardboard,
  glass_bottle,
  can,
  styroform,
  battery,
  plastic_cup,
  unknown,
];

const DDialog: React.FC<Props> = (props) => {
  return (
    <Dialog
      open={props.open}
      onClose={() => props.onClose()}
    >
      <DialogTitle sx={{ textAlign: 'center' }}>
        {props.text} 재활용 방법
      </DialogTitle>
      <DialogContent>
        {props.open && <img style={{ width: '100%', height: '500px', objectFit: 'contain' }} src={typeMapper[props.type]} alt="" />}
      </DialogContent>
    </Dialog>
  );
};

export default DDialog;
