import React, { useState } from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

type ReportType = {
  name: String;
  locationType: Number;
  address: String;
  content: String;
  likes: String;
};

const MyReportComponent: React.FC<ReportType> = (props) => {
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
      <div>
        <ThumbUpAltIcon />
        <div>
          <p>{props.likes}</p>
        </div>
      </div>
      <p>{props.content}</p>
      <div>
        <button>수정</button>
        <button>삭제</button>
      </div>
    </div>
  );
};

export default MyReportComponent;