import React from "react";
import { CommentType } from "../../pages/Mypage";

const MyCommentComponent: React.FC<CommentType> = (props) => {
  return (
    <div>
      <p>{props.name}</p>
      <p>{props.content}</p>
      <button>삭제</button>
    </div>
  );
};

export default MyCommentComponent;
