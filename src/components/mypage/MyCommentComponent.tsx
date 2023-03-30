import React from "react";
import { CommentType } from "../../pages/Mypage";
import { createStyle } from "../../lib/styleHelper";
import { Box, Typography, Button } from "@mui/material";

import axios from "../../lib/axios";

const MyCommentComponent: React.FC<CommentType> = (props) => {
  const style = createStyle({
    componentContainer: {
      display: "flex",
      padding: "1.5rem",
      justifyContent: "space-between",
      alignContent: "center",
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignContent: "center",
    },
  });

  const deleteHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios.delete(`/comments/${props.ID}`).then((res) => {});
  };

  return (
    <Box sx={style.sx.componentContainer}>
      <Box>
        <Typography variant="button">{props.Name}</Typography>
        <Typography variant="body1">{props.Content}</Typography>
      </Box>
      <Box sx={style.sx.buttonContainer}>
        <Button variant="outlined" onClick={deleteHandler}>
          삭제
        </Button>
      </Box>
    </Box>
  );
};

export default MyCommentComponent;
