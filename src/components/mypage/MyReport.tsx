import React from "react";
import MyReportComponent from "./MyReportComponent";

import { ReportType } from "../../pages/Mypage";

type ReportList = {
  list: ReportType[];
};

const MyReport: React.FC<ReportList> = ({ list }) => {
  return (
    <React.Fragment>
      {list.map((item: ReportType) => (
        <MyReportComponent
          name={item.name}
          address={item.address}
          locationType={item.locationType}
          content={item.content}
          likes={item.likes}
        />
      ))}
    </React.Fragment>
  );
};

export default MyReport;
