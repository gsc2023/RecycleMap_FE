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
        <MyCommentComponent
          ID={item.ID}
          Name={item.Name}
          Content={item.Content}
        />
      ))}
    </React.Fragment>
  );
};

export default MyComment;
