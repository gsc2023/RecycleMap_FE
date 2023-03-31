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

type MyReportProps = {
  list: ReportType[];
  onDelete: Function;
};

const MyReport: React.FC<MyReportProps> = ({ list, onDelete }) => {
  return (
    <Box sx={style.sx.componentContainer}>
      {list.map((item: ReportType) => (
        <MyReportComponent props={item} onDelete={onDelete} />
      ))}
    </Box>
  );
};

export default MyReport;
