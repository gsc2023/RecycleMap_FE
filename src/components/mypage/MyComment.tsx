import React from "react";
import MyCommentComponent from "./MyCommentComponent";

import { CommentType } from "../../pages/Mypage";

type CommentList = {
  list: CommentType[];
};

const MyComment: React.FC<CommentList> = ({ list }) => {
  return (
    <React.Fragment>
      {list.map((item: CommentType) => (
        <MyCommentComponent name={item.name} content={item.content} />
      ))}
    </React.Fragment>
  );
};

export default MyComment;
