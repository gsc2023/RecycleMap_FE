import React, { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { BookmarkType } from "../../pages/Mypage";

import { createStyle } from "../../lib/styleHelper";
import { Box, Typography } from "@mui/material";

const style = createStyle({
  componentContainer: {
    border: "1px solid #EEE",
    borderRadius: "1rem",
    padding: "1.5rem 1.8rem",
  },
  contentContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bodyContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  tagWrapper: {
    backgroundColor: "#13BD7E",
    color: "#FFF",
    padding: "0.3rem 0.8rem",
    borderRadius: "1rem",
    fontWeight: "bold",
  },
});

type BookmarkComponentProps = {
  props: BookmarkType;
  onDelete: Function;
};

const MyBookmarkComponent: React.FC<BookmarkComponentProps> = ({
  props,
  onDelete,
}) => {
  const [type, setType] = useState<String>("");

  useEffect(() => {
    switch (props.LocationType) {
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

  const deleteHandler = () => {
    onDelete(props.LocationID);
  };

  return (
    <Box sx={style.sx.componentContainer}>
      <Box sx={{ paddingBottom: "0.3rem" }}>
        <Typography variant="caption" sx={style.sx.tagWrapper}>
          {type}
        </Typography>
      </Box>
      <Box sx={style.sx.contentContainer}>
        <Box sx={style.sx.bodyContainer}>
          <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
            {props.Name}
          </Typography>
          <Typography variant="subtitle2" style={{ color: "#808080" }}>
            {props.Address}
          </Typography>
        </Box>
        <StarIcon style={{ color: "#13BD7E" }} onClick={deleteHandler} />
      </Box>
    </Box>
  );
};

export default MyBookmarkComponent;
