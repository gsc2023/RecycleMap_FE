import React, { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { BookmarkType } from "../../pages/Mypage";

import { createStyle } from "../../lib/styleHelper";
import { Box, Typography } from "@mui/material";

import axios from "../../lib/axios";

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

type LocationType = {
  ID: String;
  Location: {
    Name: String;
    LocationType: Number;
    Latitude: Number;
    Longitude: Number;
    Content: String;
  };
};

const MyBookmarkComponent: React.FC<BookmarkComponentProps> = ({
  props,
  onDelete,
}) => {
  const [type, setType] = useState<String>("");
  const [location, setLocation] = useState<LocationType>({
    ID: "",
    Location: {
      Name: "",
      LocationType: 0,
      Latitude: 0,
      Longitude: 0,
      Content: "",
    },
  });
  const [address, setAddress] = useState<String>("");

  const locationCall = async () => {
    await axios.get(`/locations/${props.Bookmark.LocationID}`).then((res) => {
      setLocation(res.data);
      switch (res.data.Location.LocationType) {
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
            Latitude: res.data.Location.Latitude,
            Longitude: res.data.Location.Longitude,
          },
        })
        .then((res) => {
          setAddress(res.data.response.result[0].text);
        });
    });
  };

  useEffect(() => {
    locationCall();
  }, []);

  const deleteHandler = () => {
    onDelete(props.ID);
  };

  return (
    <React.Fragment>
      <Box sx={style.sx.componentContainer}>
        <Box sx={{ paddingBottom: "0.3rem" }}>
          <Typography variant="caption" sx={style.sx.tagWrapper}>
            {type}
          </Typography>
        </Box>
        <Box sx={style.sx.contentContainer}>
          <Box sx={style.sx.bodyContainer}>
            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
              {location.Location.Name}
            </Typography>
            <Typography variant="subtitle2" style={{ color: "#808080" }}>
              {address}
            </Typography>
          </Box>
          <StarIcon style={{ color: "#13BD7E" }} onClick={deleteHandler} />
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default MyBookmarkComponent;
