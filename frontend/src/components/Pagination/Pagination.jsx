import styles from './Pagination.module.css'

export default function Pagination({totalPages, paginate, currPage}) {
  const pageNumbers = []

  for (let i=1; i<=totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <nav className={styles.paginationContainer}>
      <div className={styles.paginationNumsContainer}>
        {pageNumbers.map(num => 
          <div className={num===currPage?styles.paginationNumBoxcurr:styles.paginationNumBox} key={num}>
            <a className={styles.paginationNum} onClick={() => paginate(num-1)} href="#">{num}</a>
          </div>  
        )}
      </div>
    </nav>
  )
}