import React from "react";
import MyBookmarkComponent from "./MyBookmarkComponent";

import { BookmarkType } from "../../pages/Mypage";
import { Grid, Box } from "@mui/material";

type BookmarkList = {
  list: BookmarkType[];
};

const MyBookmark: React.FC<BookmarkList> = ({ list }) => {
  return (
    <Grid container spacing={2}>
      {list.map((item: BookmarkType) => (
        <Grid item xs={6}>
          <Box style={{ padding: "1.5rem" }}>
            <MyBookmarkComponent
              name={item.name}
              address={item.address}
              locationType={item.locationType}
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default MyBookmark;
