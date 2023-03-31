import React from "react";
import MyBookmarkComponent from "./MyBookmarkComponent";

import { BookmarkType } from "../../pages/Mypage";
import { Grid, Box } from "@mui/material";

type BookmarkProps = {
  list: BookmarkType[];
  onDelete: Function;
};

const MyBookmark: React.FC<BookmarkProps> = ({ list, onDelete }) => {
  return (
    <Grid container spacing={2}>
      {list.map((item: BookmarkType) => (
        <Grid item xs={6}>
          <Box style={{ padding: "1.5rem" }}>
            <MyBookmarkComponent props={item} onDelete={onDelete} />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default MyBookmark;
