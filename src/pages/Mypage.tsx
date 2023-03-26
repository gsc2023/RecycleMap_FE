import React from "react";
import MyProfile from "../components/mypage/MyProfile";
import MyBookmark from "../components/mypage/MyBookmark";
import MyComment from "../components/mypage/MyComment";
import MyReport from "../components/mypage/MyReport";

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
  const profileData = {
    nickname: "닉네임",
    email: "example@example.com",
    password: "password",
  };

  const bookmarkData: BookmarkType[] = [
    {
      name: "아름다운가게 양재점",
      address: "서울 강남구 남부순환로351길 34",
      locationType: 2,
    },
    {
      name: "아름다운가게 양재점",
      address: "서울 강남구 남부순환로351길 34",
      locationType: 2,
    },
  ];

  const commentData: CommentType[] = [
    {
      name: "아름다운가게 양재점",
      content: "가게가 쾌적하고 친절하게 대해주셨어요.",
    },
    {
      name: "아름다운가게 양재점",
      content: "가게가 쾌적하고 친절하게 대해주셨어요.",
    },
    {
      name: "아름다운가게 양재점",
      content: "가게가 쾌적하고 친절하게 대해주셨어요.",
    },
    {
      name: "아름다운가게 양재점",
      content: "가게가 쾌적하고 친절하게 대해주셨어요.",
    },
    {
      name: "아름다운가게 양재점",
      content: "가게가 쾌적하고 친절하게 대해주셨어요.",
    },
  ];

  const reportData: ReportType[] = [
    {
      name: "아름다운가게 양재점",
      locationType: 2,
      address: "서울 강남구 남부순환로351길 34",
      content: "제보 내용입니다.",
      likes: "100",
    },
    {
      name: "아름다운가게 양재점",
      locationType: 2,
      address: "서울 강남구 남부순환로351길 34",
      content: "제보 내용입니다.",
      likes: "100",
    },
  ];

  return (
    <React.Fragment>
      <MyProfile
        nickname={profileData.nickname}
        email={profileData.email}
        password={profileData.password}
      />
      <MyReport list={reportData} />
      <MyComment list={commentData} />
      <MyBookmark list={bookmarkData} />
    </React.Fragment>
  );
};

export default Mypage;
