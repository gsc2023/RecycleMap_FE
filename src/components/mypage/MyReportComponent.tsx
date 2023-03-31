import React, { useState } from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

import { ReportType } from "../../pages/Mypage";
import { useEffect } from "react";
import { createStyle } from "../../lib/styleHelper";
import { Box, Button, TextField, Typography } from "@mui/material";

import axios from "../../lib/axios";

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
    width: "100%",
    backgroundColor: "#F5FFFA",
    border: "1px solid #DBF5EC",
    borderRadius: "0.5rem",
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

type ReportComponentProps = {
  props: ReportType;
  onDelete: Function;
};

const MyReportComponent: React.FC<ReportComponentProps> = ({
  props,
  onDelete,
}) => {
  const [type, setType] = useState<String>("");
  const [content, setContent] = useState<String>("");
  const [address, setAddress] = useState<string>("");
  const [visible, setVisible] = useState<Boolean>(false);

  useEffect(() => {
    switch (props.Report.LocationType) {
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

    axios
      .get(`/reports/address`, {
        params: {
          Latitude: props.Report.Latitude,
          Longitude: props.Report.Longitude,
        },
      })
      .then((res) => {
        setAddress(res.data.response.result[0].text);
      });

    setContent(props.Report.Content);
  }, []);

  const modifyHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const userData = {
      LocationType: props.Report.LocationType,
      Name: props.Report.Name,
      Content: props.Report.Content,
    };

    axios.patch(`/report/${props.ID}`, userData).then((res) => {
      alert("정보가 수정되었습니다.");
    });
    setVisible(true);
  };

  const deleteHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onDelete(props.Report.ID);
  };

  const saveHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setVisible(false);
  };

  return (
    <React.Fragment>
      {content && address ? (
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
                  {props.Report.Name}
                </Typography>
                <Typography variant="subtitle2" style={{ color: "#808080" }}>
                  {address}
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
                    <Typography variant="subtitle2">
                      {props.Report.Likes}
                    </Typography>
                  </Box>
                </Button>
              </Box>
            </Box>
          </Box>
          {visible ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "0.5rem",
              }}
            >
              <TextField
                variant="outlined"
                id="content"
                defaultValue={content}
                sx={style.sx.contentContainer}
                onChange={(
                  event: React.ChangeEvent<
                    HTMLTextAreaElement | HTMLInputElement
                  >
                ) => setContent(event.target.value)}
              ></TextField>
              <Box sx={style.sx.buttonContainer}>
                <Button variant="outlined" onClick={saveHandler}>
                  저장
                </Button>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "0.5rem",
              }}
            >
              <TextField
                variant="outlined"
                id="content"
                defaultValue={content}
                disabled
                sx={style.sx.contentContainer}
              ></TextField>
              <Box sx={style.sx.buttonContainer}>
                <Button variant="outlined" onClick={modifyHandler}>
                  수정
                </Button>
                <Button variant="outlined" onClick={deleteHandler}>
                  삭제
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </React.Fragment>
  );
};

export default MyReportComponent;
