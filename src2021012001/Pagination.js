import React, { useState, useEffect } from 'react';
import "./App.css";
function Pagination() {
  const [pagination, setPagination] = useState({ current: 1, totalPages: 1, pageSize: 1, total: 1 });

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      
    </div>
  )
}
export default Pagination;
