import React, { useState, useEffect } from 'react';
import axios from '../lib/axios';

import { createStyle } from '../lib/styleHelper';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const style = createStyle({
  tableHead: {
    fontFamily: 'NanumGothic',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '18px',
    color: '#13BD7E',
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

const LIKE_THRESHOLD = 10;

const ReportList: React.FC = () => {
  const [originData, setOriginData] = useState<Array<row>>([]);
  const [data, setData] = useState<Array<row>>([]);
  const [rows, setRows] = useState<Array<row>>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<boolean>(true);

  useEffect(() => {
    axios.get('/reports/').then(({ data }) => {
      console.log(data);
      data.sort((a: any, b: any) => a.Date - b.Date);
      setOriginData(data);
      setData(data);
      setRows(data.slice(0, 10));
    });
  }, []);

  const onPageChange = (e: any, value: any) => {
    setCurrentPage(value);
    setRows(data.slice(10 * (value - 1), 10 * value));
  };

  const handleClickBestReport = () => {
    const data = sortBy
      ? originData.filter((data) => data.Report.Like >= LIKE_THRESHOLD).sort((a: any, b: any) => a.Like - b.Like)
      : originData;
    setData(data);
    setRows(data.slice(0, 10));
    setCurrentPage(1);
    setSortBy((prev) => !prev);
  };

  return (
    <Box sx={{ flexGrow: 1, width: "100%", margin: "auto", fontFamily: "NanumGothic", fontStyle: "normal", fontWeight: 700 }}>
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                fontFamily: 'inherit',
                fontStyle: 'inherit',
                fontWeight: 'inherit',
                fontSize: '21px',
                lineHeight: '21px',
                color: '#FFFFFF',
                ml: '50px',
              }}
            >
              게시물 목록
            </Typography>
          </Toolbar>
        </AppBar>

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={style.sx.tableHead}>
                  제목
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
                    <TableCell align="center">{row.Report.Name}</TableCell>
                    <TableCell align="center">{row.User.DisplayName}</TableCell>
                    <TableCell align="center">{row.Report.Like}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
        {sortBy ? (
          <Button variant="contained" color="primary" onClick={handleClickBestReport}>
            BEST 게시물만 보기
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleClickBestReport}>
            일반 게시물 보기
          </Button>
        )}
        <Stack>
          <Pagination
            count={~~(rows.length / 10) + (rows.length % 10 ? 1 : 0)}
            color="secondary"
            variant="outlined"
            shape="rounded"
            page={currentPage}
            onChange={onPageChange}
          />
        </Stack>
        <Link to="/report/send" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            제보하기
          </Button>
        </Link>
      </div>
    </Box>
  );
};

export default ReportList;
