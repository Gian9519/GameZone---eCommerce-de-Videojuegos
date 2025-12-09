import React from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';

const Pagination = ({ currentPage, totalPages, paginate }) => {
  const pageNumbers = [];
  
  // Determinar qué páginas mostrar
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + 4);
  
  if (endPage - startPage < 4) {
    startPage = Math.max(1, endPage - 4);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <BootstrapPagination className="justify-content-center mt-4">
      <BootstrapPagination.First 
        onClick={() => paginate(1)} 
        disabled={currentPage === 1} 
      />
      <BootstrapPagination.Prev 
        onClick={() => paginate(currentPage - 1)} 
        disabled={currentPage === 1} 
      />
      
      {startPage > 1 && (
        <>
          <BootstrapPagination.Item onClick={() => paginate(1)}>
            1
          </BootstrapPagination.Item>
          {startPage > 2 && <BootstrapPagination.Ellipsis disabled />}
        </>
      )}
      
      {pageNumbers.map(number => (
        <BootstrapPagination.Item 
          key={number} 
          active={number === currentPage}
          onClick={() => paginate(number)}
        >
          {number}
        </BootstrapPagination.Item>
      ))}
      
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <BootstrapPagination.Ellipsis disabled />}
          <BootstrapPagination.Item onClick={() => paginate(totalPages)}>
            {totalPages}
          </BootstrapPagination.Item>
        </>
      )}
      
      <BootstrapPagination.Next 
        onClick={() => paginate(currentPage + 1)} 
        disabled={currentPage === totalPages} 
      />
      <BootstrapPagination.Last 
        onClick={() => paginate(totalPages)} 
        disabled={currentPage === totalPages} 
      />
    </BootstrapPagination>
  );
};

export default Pagination;