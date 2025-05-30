'use client';

import React from 'react'

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ 
  currentPage = 1, 
  totalPages = 1, 
  onPageChange 
}) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // If we have fewer pages than the max to show, display all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include first page
      pages.push(1);
      
      // Calculate start and end of page range to show
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if we're at the start or end
      if (currentPage <= 2) {
        end = 4;
      } else if (currentPage >= totalPages - 1) {
        start = totalPages - 3;
      }
      
      // Add ellipsis if needed before middle pages
      if (start > 2) {
        pages.push('...');
      }
      
      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Add ellipsis if needed after middle pages
      if (end < totalPages - 1) {
        pages.push('...');
      }
      
      // Always include last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };
  
  const handlePageClick = (page: number | string) => {
    if (typeof page === 'number' && page !== currentPage && onPageChange) {
      onPageChange(page);
    }
  };
  
  const pageNumbers = getPageNumbers();
  
  return (
    <nav className="inline-flex rounded-md shadow">
      {/* Previous button */}
      <button
        onClick={() => currentPage > 1 && handlePageClick(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`px-3 py-2 rounded-l-md border border-gray-300 ${currentPage <= 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
      >
        Previous
      </button>
      
      {/* Page numbers */}
      {pageNumbers.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && handlePageClick(page)}
          disabled={page === '...' || page === currentPage}
          className={`px-3 py-2 border-t border-b border-gray-300 ${page === currentPage ? 'bg-blue-50 text-blue-600' : page === '...' ? 'bg-white text-gray-500 cursor-default' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
        >
          {page}
        </button>
      ))}
      
      {/* Next button */}
      <button
        onClick={() => currentPage < totalPages && handlePageClick(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`px-3 py-2 rounded-r-md border border-gray-300 ${currentPage >= totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
