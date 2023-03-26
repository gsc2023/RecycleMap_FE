import React from "react";
import { CommentType } from "../../pages/Mypage";

const MyCommentComponent: React.FC<CommentType> = (props) => {
  const deleteHandler = () => {};
  return (
    <div>
      <p>{props.name}</p>
      <p>{props.content}</p>
      <button onClick={deleteHandler}>삭제</button>
    </div>
  );
};

export default MyCommentComponent;
