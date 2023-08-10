import styles from './Pagination.module.css'

export default function Pagination({totalPages, paginate, currPage}) {
  const pageNumbers = []

  const paginationLength = totalPages % 10
  console.log('paginationLength', paginationLength)

  for (let i=1; i<=totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <nav className={styles.paginationContainer} style={{ '--width': `${paginationLength}00px` }}>
      <div>이쪽</div>
      <div className={styles.paginationNumsContainer}>
        {pageNumbers.map(num => 
          <div className={num==currPage?styles.paginationNumBoxcurr:styles.paginationNumBox} key={num}>
            <a className={num==currPage?styles.paginationNumcurr:styles.paginationNum} onClick={() => paginate(num-1)} href="#">{num}</a>
          </div>  
        )}
        </div>
      <div>저쪽</div>
    </nav>
  )
}