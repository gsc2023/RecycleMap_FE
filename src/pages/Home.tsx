import React from "react";
import {
  AppBar,
  Box,
  Grid,
  Paper,
  Toolbar,
  Typography,
  Button,
  Chip,
} from "@mui/material";

import { createStyle } from "../lib/styleHelper";

const style = createStyle({
  gridContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "calc(100vh - 8vh)",
  },
});

const Home: React.FC = () => {
  return (
    <Box>
      <AppBar
        position="static"
        elevation={0}
        sx={{ background: "#FFF", height: "8vh" }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>🗺️ Recycle Map</Typography>
          <Box sx={{ display: "flex", columnGap: "0.5vw" }}>
            <Chip label="로그인"></Chip>
            <Chip label="회원가입"></Chip>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={style.sx.gridContainer}>
        <Grid container gap={2}>
          <Grid container xs={12} sm={5} lg={6}>
            <Grid item lg={12}>
              <Paper sx={{ height: "100%" }}>재활용 지도</Paper>
            </Grid>
          </Grid>
          <Grid container xs={12} sm={7} lg={6} spacing={2}>
            <Grid item lg={6}>
              <Paper>제보하기</Paper>
            </Grid>
            <Grid item lg={6}>
              <Paper>분류 정보</Paper>
            </Grid>
            <Grid item lg={6}>
              <Paper>오늘의 꿀팁</Paper>
            </Grid>
            <Grid item lg={6}>
              <Paper>마이 페이지</Paper>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
