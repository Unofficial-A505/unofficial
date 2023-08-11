import styles from "./Pagination.module.css";
import Pagination from "@mui/material/Pagination";

export default function PaginationCustom({
  totalPages,
  paginate,
  currPage,
}) {

  const paginationLength = totalPages % 10;
  const paginationWidth = 100 + 40 * paginationLength;

  const handlePageChange = (event, value) => {
    paginate(value);
  };

  return (
    <div
      className={styles.paginationContainer}
      style={{ "--width": `${paginationWidth}px` }}
    >
      <Pagination
        count={totalPages}
        color="primary"
        page={currPage}
        onChange={handlePageChange}
      />
    </div>
  );
}
