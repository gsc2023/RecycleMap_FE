import React from "react";

type CommentType = {
  name: String;
  content: String;
};

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
