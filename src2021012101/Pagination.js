import React, { useState, useEffect } from 'react';
import "./App.css";
function Pagination(props) {
  const pager = () => {
    const pager=Math.ceil(props.total/props.pageSize)
    console.log(props.total)
    console.log(pager)
    let pages = [];
    for (let i = 0; i < pager; i++) {
      pages[i] = i + 1
    }
    return pages
  }
  return (
    <div className="pagination">
      {pager().length > 0 && pager().map(page =>
        <button onClick={(e) => props.handleCurrentPage(page)}>{page}</button>
      )}
    </div>
  )
}
export default Pagination;
