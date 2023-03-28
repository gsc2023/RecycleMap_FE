import React, { useState } from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

import { ReportType } from "../../pages/Mypage";
import { useEffect } from "react";
import { createStyle } from "../../lib/styleHelper";
import { Box, Button, Typography } from "@mui/material";

const style = createStyle({
  titleContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  contentContainer: {
    backgroundColor: "#F5FFFA",
    border: "1px solid #DBF5EC",
    borderRadius: "0.5rem",
    padding: "1rem",
  },
  tagWrapper: {
    backgroundColor: "#13BD7E",
    color: "#FFF",
    padding: "0.3rem 0.8rem",
    borderRadius: "1rem",
    fontWeight: "bold",
  },
});

const MyReportComponent: React.FC<ReportType> = (props) => {
  const [type, setType] = useState<String>("");

  useEffect(() => {
    switch (props.locationType) {
      case 0:
        setType("의류수거함");
        break;
      case 1:
        setType("폐건전지/폐형광등");
        break;
      case 2:
        setType("아름다운 가게");
        break;
      case 3:
        setType("재활용품 판매센터");
        break;
      default:
        break;
    }
  }, []);

  const modifyHandler = () => {};

  const deleteHandler = () => {};

  return (
    <Box>
      <Box sx={style.sx.titleContainer}>
        <Box>
          <Box>
            <Typography variant="caption" sx={style.sx.tagWrapper}>
              {type}
            </Typography>
          </Box>
          <Typography>{props.name}</Typography>
          <Typography>{props.address}</Typography>
        </Box>
        <Box>
          <Button variant="outlined">
            <ThumbUpAltIcon />
            <Box>
              <Typography>{props.likes}</Typography>
            </Box>
          </Button>
        </Box>
      </Box>
      <Box sx={style.sx.contentContainer}>
        <Typography>{props.content}</Typography>
      </Box>
      <Box>
        <Button variant="outlined" onClick={modifyHandler}>
          수정
        </Button>
        <Button variant="outlined" onClick={deleteHandler}>
          삭제
        </Button>
      </Box>
    </Box>
  );
};

export default MyReportComponent;
