import React from 'react';

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange, t }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="pagination">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        {t('accountPage.previous')}
      </button>
      <span>{currentPage} / {totalPages}</span>
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        {t('accountPage.next')}
      </button>
    </div>
  );
};

export default Pagination;
