import { useState } from "react";

/**
 * Pagination hook
 * @param {number} defaultAfter Current page number, default 1
 * @param {pageSize} defaultPageSize Current pageSize, default 20
 * @example const [after, pageSize, handlePageChange] = usePagination();
 *
 */
const usePagination = (defaultAfter = 1, defaultPageSize = 20) => {
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [after, setAfter] = useState(defaultAfter);

  const handlePageChange = newPage => {
    setAfter(newPage);
  };

  return [after, pageSize, handlePageChange];
};

export default usePagination;
