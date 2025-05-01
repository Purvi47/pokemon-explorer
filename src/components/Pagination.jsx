import React from 'react';

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  return (
    <div style={{ marginTop: '1rem' }}>
      <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Prev</button>
      <span style={{ margin: '0 10px' }}>
        Page {currentPage} of {totalPages}
      </span>
      <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
    </div>
  );
};

export default Pagination;
