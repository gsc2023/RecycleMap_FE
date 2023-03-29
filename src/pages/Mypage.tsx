import React, { useEffect, useState } from "react";
import MyProfile from "../components/mypage/MyProfile";
import MyBookmark from "../components/mypage/MyBookmark";
import MyComment from "../components/mypage/MyComment";
import MyReport from "../components/mypage/MyReport";

import axios from "axios";

import { Box, Paper, Typography } from "@mui/material";
import { createStyle } from "../lib/styleHelper";

const style = createStyle({
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    rowGap: "1.5rem",
    padding: "30px 19.2vw",
  },
  paperContainer: {
    width: "100%",
    borderRadius: "1rem",
  },
  titleContainer: {
    backgroundColor: "#13BD7E",
    color: "#FFF",
    borderRadius: "1rem 1rem 0 0",
    padding: "0.7rem 1.2rem",
    fontWeight: "bold",
  },
});

export type ProfileType = {
  nickname: string;
  email: string;
  password: string;
};

export type ReportType = {
  name: String;
  locationType: Number;
  address: String;
  content: String;
  likes: String;
};

export type BookmarkType = {
  name: String;
  address: String;
  locationType: Number;
};

export type CommentType = {
  name: String;
  content: String;
};

const Mypage: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileType>();
  const [bookmarkData, setBookmarkData] = useState<BookmarkType[]>([]);
  const [reportData, setReportData] = useState<ReportType[]>([]);
  const [commentData, setCommentData] = useState<CommentType[]>([]);

  useEffect(() => {
    axios
      .get("https://vscode-qjnbi.run.goorm.site/proxy/8080/reports/")
      .then((res) => {
        setProfileData(res.data);
      });

    axios
      .get("https://vscode-qjnbi.run.goorm.site/proxy/8080/reports/")
      .then((res) => {
        setBookmarkData(res.data);
      });

    axios
      .get("https://vscode-qjnbi.run.goorm.site/proxy/8080/reports/")
      .then((res) => {
        setReportData(res.data);
      });

    axios
      .get("https://vscode-qjnbi.run.goorm.site/proxy/8080/reports/")
      .then((res) => {
        setCommentData(res.data);
      });
  }, []);

  return (
    <React.Fragment>
      <Box sx={style.sx.pageContainer}>
        <Paper sx={style.sx.paperContainer}>
          <Typography
            variant="subtitle1"
            component="h6"
            sx={style.sx.titleContainer}
          >
            프로필 수정
          </Typography>
          <MyProfile
            nickname={profileData.nickname}
            email={profileData.email}
            password={profileData.password}
          />
        </Paper>
        <Paper sx={style.sx.paperContainer}>
          <Typography
            variant="subtitle1"
            component="h6"
            sx={style.sx.titleContainer}
          >
            나의 제보 관리
          </Typography>
          <MyReport list={reportData} />
        </Paper>
        <Paper sx={style.sx.paperContainer}>
          <Typography
            variant="subtitle1"
            component="h6"
            sx={style.sx.titleContainer}
          >
            나의 댓글 관리
          </Typography>
          <MyComment list={commentData} />
        </Paper>
        <Paper sx={style.sx.paperContainer}>
          <Typography
            variant="subtitle1"
            component="h6"
            sx={style.sx.titleContainer}
          >
            즐겨찾기
          </Typography>
          <MyBookmark list={bookmarkData} />
        </Paper>
      </Box>
    </React.Fragment>
  );
};

export default Mypage;
