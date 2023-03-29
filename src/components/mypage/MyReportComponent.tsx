import React, { useState } from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

import { ReportType } from "../../pages/Mypage";
import { useEffect } from "react";
import { createStyle } from "../../lib/styleHelper";
import { Box, Button, Typography } from "@mui/material";

import axios from "axios";

const style = createStyle({
  componentContainer: {
    display: "flex",
    flexDirection: "column",
    rowGap: "1rem",
  },
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
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    columnGap: "0.5rem",
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

  const modifyHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const deleteHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <Box sx={style.sx.componentContainer}>
      <Box>
        <Box sx={{ paddingBottom: "0.3rem" }}>
          <Typography variant="caption" sx={style.sx.tagWrapper}>
            {type}
          </Typography>
        </Box>
        <Box sx={style.sx.titleContainer}>
          <Box>
            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
              {props.name}
            </Typography>
            <Typography variant="subtitle2" style={{ color: "#808080" }}>
              {props.address}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <Button variant="outlined">
              <ThumbUpAltIcon sx={{ transform: "scale(0.75)" }} />
              <Box>
                <Typography variant="subtitle2">{props.likes}</Typography>
              </Box>
            </Button>
          </Box>
        </Box>
      </Box>
      <Box sx={style.sx.contentContainer}>
        <Typography>{props.content}</Typography>
      </Box>
      <Box sx={style.sx.buttonContainer}>
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
