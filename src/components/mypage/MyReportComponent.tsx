import React, { useState } from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

type reportType = {
  name: String;
  locationType: Number;
  address: String;
  content: String;
  like: Number;
};

const MyReportComponent: React.FC = (props: reportType) => {
  const [type, setType] = useState("");

  const typeHandler = () => {
    switch (props.locationType) {
      case 0:
      case 1:
      case 2:
      case 3:
      default:
    }
  };

  return (
    <div>
      <p>{type}</p>
      <p>{props.name}</p>
      <p>{props.address}</p>
      <div>
        <ThumbUpAltIcon />
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
