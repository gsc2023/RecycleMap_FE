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
  Report: {
    ID: String;
    Name: String;
    LocationType: Number;
    Latitude: Number;
    Longitude: Number;
    Content: String;
    Likes: String;
  };
};

export type BookmarkType = {
  ID: String;
  Bookmark: {
    UID: String;
    LocationID: String;
  };
};

export type CommentType = {
  ID: String;
  Name: String;
  Content: String;
};

const Mypage: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileType>();
  const [bookmarkData, setBookmarkData] = useState<BookmarkType[]>([]);
  const [reportData, setReportData] = useState<ReportType[]>([]);
  const [commentData, setCommentData] = useState<CommentType[]>([]);

  useEffect(() => {
    axios
      .get("https://vscode-qjnbi.run.goorm.site/proxy/8080/my/")
      .then((res) => {
        console.log(res.data.User);
        setProfileData(res.data.User);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("https://vscode-qjnbi.run.goorm.site/proxy/8080/my/bookmark")
      .then((res) => {
        setBookmarkData(res.data);
      });

    axios
      .get("https://vscode-qjnbi.run.goorm.site/proxy/8080/my/report")
      .then((res) => {
        setReportData(res.data);
      });

    // axios
    //   .get("https://vscode-qjnbi.run.goorm.site/proxy/8080/my/comment")
    //   .then((res) => {
    //     console.log(res.data);
    //     setCommentData(res.data);
    //   });
  }, []);

  const reportDeleteHandler = (reportId: String) => {
    axios.delete(`/my/report/${reportId}`).then(() => {
      const newReportData = reportData.filter(
        (report) => report.ID !== reportId
      );
      setReportData(newReportData);
    });
  };

  const bookmarkDeleteHandler = (bookmarkId: String) => {
    axios.post(`/bookmarks/${bookmarkId}`).then(() => {
      const newBookmarkData = bookmarkData.filter(
        (bookmark) => bookmark.ID !== bookmarkId
      );
      setBookmarkData(newBookmarkData);
    });
  };

  const commentDeleteHandler = (commentId: String) => {
    axios.delete(`/my/comment/${commentId}`).then(() => {
      const newCommentData = commentData.filter(
        (comment) => comment.ID !== commentId
      );
      setCommentData(newCommentData);
    });
  };

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
              <MyReport list={reportData} onDelete={reportDeleteHandler} />
            </Paper>
            {/* <Paper sx={style.sx.paperContainer}>
              <Typography
                variant="subtitle1"
                component="h6"
                sx={style.sx.titleContainer}
              >
                나의 댓글 관리
              </Typography>
              <MyComment list={commentData} onDelete={commentDeleteHandler} />
            </Paper> */}
            <Paper sx={style.sx.paperContainer}>
              <Typography
                variant="subtitle1"
                component="h6"
                sx={style.sx.titleContainer}
              >
                즐겨찾기
              </Typography>
              <MyBookmark
                list={bookmarkData}
                onDelete={bookmarkDeleteHandler}
              />
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
