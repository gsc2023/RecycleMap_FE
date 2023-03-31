import React from "react";
import MyCommentComponent from "./MyCommentComponent";

import { CommentType } from "../../pages/Mypage";

type MyCommentProps = {
  list: CommentType[];
  onDelete: Function;
};

const MyComment: React.FC<MyCommentProps> = ({ list, onDelete }) => {
  return (
    <React.Fragment>
      {list.map((item: CommentType) => (
        <MyCommentComponent props={item} onDelete={onDelete} />
      ))}
    </React.Fragment>
  );
};

export default MyComment;
