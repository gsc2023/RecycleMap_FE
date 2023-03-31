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

import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";

import { useNavigate } from "react-router-dom";

const style = createStyle({
  gridContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "calc(100vh - 20vh)",
    padding: "0 19.2vw",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "20vh",
    backgroundColor: "#F5FFFA",
    border: "1px solid #DBF5EC",
  },
  footer: {
    display: "flex",
    flexDirection: "column",
    padding: "0 24px",
    height: "12vh",
    rowGap: "1rem",
  },
});

const Home: React.FC = () => {
  const navigate = useNavigate();

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
            <Chip
              label="로그인"
              onClick={() => {
                navigate("/auth/signin");
              }}
            ></Chip>
            <Chip
              label="회원가입"
              onClick={() => {
                navigate("/auth/signup");
              }}
            ></Chip>
          </Box>
        </Toolbar>
        <Box sx={{ padding: "0 24px" }}>
          <Box
            sx={{
              backgroundColor: "#CCC",
              height: "1px",
            }}
          ></Box>
        </Box>
      </AppBar>
      <Box sx={style.sx.gridContainer}>
        <Grid container gap={2}>
          <Grid container xs={12} sm={5} lg={6}>
            <Grid item lg={12}>
              <Paper
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  backgroundColor: "#F5FFFA",
                  border: "1px solid #DBF5EC",
                }}
              >
                재활용 지도
              </Paper>
            </Grid>
          </Grid>
          <Grid container xs={12} sm={7} lg={6} spacing={2}>
            <Grid item lg={6}>
              <Paper sx={style.sx.contentContainer}>제보하기</Paper>
            </Grid>
            <Grid item lg={6}>
              <Paper sx={style.sx.contentContainer}>분류 정보</Paper>
            </Grid>
            <Grid item lg={6}>
              <Paper sx={style.sx.contentContainer}>오늘의 꿀팁</Paper>
            </Grid>
            <Grid item lg={6}>
              <Paper sx={style.sx.contentContainer}>마이 페이지</Paper>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box sx={style.sx.footer}>
        <Box
          sx={{ width: "100%", backgroundColor: "#CCC", height: "1px" }}
        ></Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography>Recycle Map</Typography>
            <Typography variant="overline" sx={{ color: "#AAA" }}>
              @ 2023 RecycleMap. All rights reserved
            </Typography>
          </Box>
          <Box sx={{ display: "flex", columnGap: "0.8rem" }}>
            <a href="https://github.com/gsc2023">
              <GitHubIcon />
            </a>
            <EmailIcon />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
