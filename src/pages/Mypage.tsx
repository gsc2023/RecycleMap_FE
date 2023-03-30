import React, { useEffect, useState } from "react";
import MyProfile from "../components/mypage/MyProfile";
import MyBookmark from "../components/mypage/MyBookmark";
import MyComment from "../components/mypage/MyComment";
import MyReport from "../components/mypage/MyReport";

import axios from "../lib/axios";
import useStore from "../store/auth";

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
  Nickname: string;
  Email: string;
};

export type ReportType = {
  ID: String;
  Name: String;
  LocationType: Number;
  Address: String;
  Content: String;
  Likes: String;
};

export type BookmarkType = {
  Name: String;
  Address: String;
  LocationType: Number;
};

export type CommentType = {
  ID: String;
  Name: String;
  Content: String;
};

const Mypage: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileType>();
  // const [bookmarkData, setBookmarkData] = useState<BookmarkType[]>([]);
  // const [reportData, setReportData] = useState<ReportType[]>([]);
  // const [commentData, setCommentData] = useState<CommentType[]>([]);

  useEffect(() => {
    axios
      .get("https://vscode-qjnbi.run.goorm.site/proxy/8080/my/")
      .then((res) => {
        console.log(res.data.User);
        setProfileData(res.data.User);
      });

    // axios
    //   .get("https://vscode-qjnbi.run.goorm.site/proxy/8080/my/bookmark")
    //   .then((res) => {
    //     setBookmarkData(res.data);
    //   });

    // axios
    //   .get("https://vscode-qjnbi.run.goorm.site/proxy/8080/my/report/")
    //   .then((res) => {
    //     setReportData(res.data);
    //   });

    // axios
    //   .get("https://vscode-qjnbi.run.goorm.site/proxy/8080/my/comment")
    //   .then((res) => {
    //     setCommentData(res.data);
    //   });
  }, []);

  // const profileData = {
  //   nickname: "닉네임",
  //   email: "example@example.com",
  //   password: "password",
  // };

  const bookmarkData: BookmarkType[] = [
    {
      Name: "아름다운가게 양재점",
      Address: "서울 강남구 남부순환로351길 34",
      LocationType: 2,
    },
    {
      Name: "아름다운가게 양재점",
      Address: "서울 강남구 남부순환로351길 34",
      LocationType: 2,
    },
  ];

  const commentData: CommentType[] = [
    {
      ID: "1",
      Name: "아름다운가게 양재점",
      Content: "가게가 쾌적하고 친절하게 대해주셨어요.",
    },
    {
      ID: "2",
      Name: "아름다운가게 양재점",
      Content: "가게가 쾌적하고 친절하게 대해주셨어요.",
    },
    {
      ID: "3",
      Name: "아름다운가게 양재점",
      Content: "가게가 쾌적하고 친절하게 대해주셨어요.",
    },
    {
      ID: "4",
      Name: "아름다운가게 양재점",
      Content: "가게가 쾌적하고 친절하게 대해주셨어요.",
    },
    {
      ID: "5",
      Name: "아름다운가게 양재점",
      Content: "가게가 쾌적하고 친절하게 대해주셨어요.",
    },
  ];

  const reportData: ReportType[] = [
    {
      ID: "1",
      Name: "아름다운가게 양재점",
      LocationType: 2,
      Address: "서울 강남구 남부순환로351길 34",
      Content: "제보 내용입니다.",
      Likes: "100",
    },
    {
      ID: "2",
      Name: "아름다운가게 양재점",
      LocationType: 2,
      Address: "서울 강남구 남부순환로351길 34",
      Content: "제보 내용입니다.",
      Likes: "100",
    },
  ];

  return (
    <React.Fragment>
      {profileData && bookmarkData && reportData && commentData ? (
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
                Nickname={profileData.Nickname}
                Email={profileData.Email}
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
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Mypage;
