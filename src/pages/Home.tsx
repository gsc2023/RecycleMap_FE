import React from "react";
import { Grid, Paper } from "@mui/material";

const Home: React.FC = () => {
  return (
    <Grid container>
      <Paper>재활용 지도</Paper>
      <Paper>재활용 제보</Paper>
      <Paper>재활용 분류</Paper>
      <Paper>오늘의 꿀팁</Paper>
      <Paper>마이 페이지</Paper>
    </Grid>
  );
};

export default Home;
