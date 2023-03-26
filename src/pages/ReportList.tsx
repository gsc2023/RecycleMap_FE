import React, { useState, useEffect } from "react";
import axios from "axios";

import { createStyle } from "../lib/styleHelper";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const style = createStyle({
    tableHead: {
        fontFamily: "NanumGothic",
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: "18px",
        lineHeight: "18px",
        color: "#13BD7E",
    },
});

interface report {
    Content: string;
    Disabled: boolean;
    Latitude: number;
    Longitude: number;
    Like: number;
    LocationType: number;
    Name: string;
    UID: string;
    Date: number;
}

interface user {
    Email: string;
    EmailVerified: boolean;
    PhoneNumber: string;
    DisplayName: string;
    PhotoURL: string;
    Disabled: boolean;
}

interface row {
    ID: string;
    Report: report;
    User: user;
}

const ReportList: React.FC = () => {
    const [data, setData] = useState<Array<row>>([]);
    const [rows, setRows] = useState<Array<row>>([]);

    useEffect(() => {
        axios.get("https://vscode-qjnbi.run.goorm.site/proxy/8080/reports/").then(({ data }) => {
            console.log(data);
            data.sort((a: any, b: any) => a.Date - b.Date);
            setData(data);
            setRows(data.slice(0, 10));
        });
    }, []);

    const onPageChange = (e: any, value: any) => {
        setRows(data.slice(10 * (value - 1), 10 * value));
    };

    return (
        <Box sx={{ flexGrow: 1, width: "80%", margin: "auto", fontFamily: "NanumGothic", fontStyle: "normal", fontWeight: 700 }}>
            <Box>
                <AppBar position="static" sx={{ borderRadius: "20px 20px 0px 0px" }}>
                    <Toolbar>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                flexGrow: 1,
                                fontFamily: "inherit",
                                fontStyle: "inherit",
                                fontWeight: "inherit",
                                fontSize: "21px",
                                lineHeight: "21px",
                                color: "#FFFFFF",
                            }}
                        >
                            게시물 목록
                        </Typography>
                    </Toolbar>
                </AppBar>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" sx={style.sx.tableHead}>
                                    번호
                                </TableCell>
                                <TableCell align="center" sx={style.sx.tableHead}>
                                    제목
                                </TableCell>
                                <TableCell align="center" sx={style.sx.tableHead}>
                                    작성일
                                </TableCell>
                                <TableCell align="center" sx={style.sx.tableHead}>
                                    작성자
                                </TableCell>
                                <TableCell align="center" sx={style.sx.tableHead}>
                                    추천
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row: row, index) => {
                                const date = new Date(row.Report.Date);

                                return (
                                    <TableRow
                                        key={row.ID}
                                        //sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center" sx={{ width: 50 }}>
                                            {index}
                                        </TableCell>
                                        <TableCell align="right">{row.Report.Name}</TableCell>
                                        <TableCell align="right">{date.toLocaleString()}</TableCell>
                                        <TableCell align="right">{row.User.DisplayName}</TableCell>
                                        <TableCell align="right">{row.Report.Like}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Stack>
                <Pagination
                    count={rows.length / 10 + (rows.length % 10 ? 1 : 0)}
                    color="secondary"
                    variant="outlined"
                    shape="rounded"
                    onChange={onPageChange}
                />
            </Stack>
        </Box>
    );
};

export default ReportList;
