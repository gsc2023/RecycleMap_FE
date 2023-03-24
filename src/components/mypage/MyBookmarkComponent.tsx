import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";

type BookmarkType = {
  name: String;
  address: String;
  locationType: Number;
};

const MyBookmarkComponent: React.FC<BookmarkType> = (props) => {
  const [type, setType] = useState<String>("");

  const typeHandler = () => {
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
  };
  return (
    <div>
      <p>{type}</p>
      <p>{props.name}</p>
      <p>{props.address}</p>
      <StarIcon />
    </div>
  );
};

export default MyBookmarkComponent;
