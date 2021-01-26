import React from 'react';
import { UserContext } from './context/User'
import "./App.css";
function Pagination() {
  const { state,currentPage } = React.useContext(UserContext);
  const pager = () => {
    const pager = Math.ceil(state.pagination.total / state.pagination.pageSize)
    let pages = [];
    for (let i = 0; i < pager; i++) {
      pages[i] = i + 1
    }
    return pages
  }
  return (
    <div className="pagination">
      {pager().length > 0 && pager().map(page =>
        <button key={page} onClick={(e) => currentPage(page)}>{page}</button>
      )}
    </div>
  )
}
export default Pagination;
