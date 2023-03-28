import React from "react";
import MyReportComponent from "./MyReportComponent";

import { Box } from "@mui/material";

import { ReportType } from "../../pages/Mypage";
import { createStyle } from "../../lib/styleHelper";

const style = createStyle({
  componentContainer: {
    display: "flex",
    flexDirection: "column",
    rowGap: "1.5rem",
    padding: "1.5rem",
  },
});

type ReportList = {
  list: ReportType[];
};

const MyReport: React.FC<ReportList> = ({ list }) => {
  return (
    <Box sx={style.sx.componentContainer}>
      {list.map((item: ReportType) => (
        <MyReportComponent
          name={item.name}
          address={item.address}
          locationType={item.locationType}
          content={item.content}
          likes={item.likes}
        />
      ))}
    </Box>
  );
};

export default MyReport;
