import React from "react";
import MyBookmarkComponent from "./MyBookmarkComponent";

import { BookmarkType } from "../../pages/Mypage";

type BookmarkList = {
  list: BookmarkType[];
};

const MyBookmark: React.FC<BookmarkList> = ({ list }) => {
  return (
    <React.Fragment>
      {list.map((item: BookmarkType) => (
        <MyBookmarkComponent
          name={item.name}
          address={item.address}
          locationType={item.locationType}
        />
      ))}
    </React.Fragment>
  );
};

export default MyBookmark;
