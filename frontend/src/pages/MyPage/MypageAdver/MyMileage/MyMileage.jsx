import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styles from "./MyMileage.module.css";
import { useEffect, useState } from "react";
import { PaginationControl } from "react-bootstrap-pagination-control";
import customAxios from "../../../../util/customAxios";
const hoursToAdd = 9;
const contentPerPage = 6;
export default function MyMileage() {
  const mileage = 5100;
  const [rows, setRows] = useState([]);
  const [pageInfo, setPageInfo] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    customAxios
      .get("/api/point/history?size=" + contentPerPage + "&page=" + (page - 1))
      .then((res) => {
        setRows(res.data.content);
        setPageInfo(res.data.pageInfo);
      });
  }, [page]);

  const formatDate = function (timestamp) {
    const inputDate = new Date(timestamp);
    const targetDate = new Date(
      inputDate.getTime() + hoursToAdd * 60 * 60 * 1000
    );

    const year = targetDate.getUTCFullYear().toString().slice(-2); // 년도의 마지막 두 자리
    const month = (targetDate.getUTCMonth() + 1).toString().padStart(2, "0"); // 월 (1부터 시작하므로 +1)
    const day = targetDate.getUTCDate().toString().padStart(2, "0"); // 일

    return `${year}.${month}.${day}`;
  };

  return (
    <div className={styles.contentContainer}>
      <div className={styles.mycontentContainer}>
        <div className={styles.mycontentTitle}>
          <h2 className={styles.mypostsTitle}>마일리지 관리</h2>
          <p className={styles.smallTitle}>
            마일리지 적립 및 사용 내역을 확인할 수 있습니다.
          </p>
        </div>
        <div className={styles.myMileContainer}>
          <TableContainer className={styles.myPointTable}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>설명</TableCell>
                  <TableCell align="right">마일리지</TableCell>
                  <TableCell align="right">적립날짜</TableCell>
                  <TableCell align="right">잔여</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length > 0 ? (
                  rows.map((row) => (
                    <TableRow
                      key={row.pointId}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row?.description}
                      </TableCell>
                      <TableCell align="right">
                        {row?.diff > 0 ? `(+) ${row.diff}` : `(-) ${row.diff}`}
                      </TableCell>
                      <TableCell align="right">
                        {formatDate(row?.actionDate)}
                      </TableCell>
                      <TableCell align="right">
                        {row?.remainingPoints}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <p>내역이 없습니다.</p>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <div>
            <PaginationControl
              page={page}
              between={4}
              total={pageInfo.totalElements}
              limit={pageInfo.size}
              changePage={(page) => {
                setPage(page);
              }}
              ellipsis={1}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
