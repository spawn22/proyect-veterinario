function PaginationTable({ currentPage, totalPages, onPageChange }) {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  return (
    <nav className="flex justify-end my-4">
      <ul className="flex justify-between items-center text-blue-500 gap-2">
        {pages.map((page) => (
          <li
            key={page}
            className={`page-item${page === currentPage ? " active" : ""}`}
          >
            <button
              className={`page-link py-2 px-3 font-semibold rounded-lg border border-gray-300 ${
                page === currentPage
                  ? " bg-gray-200 border-gray-200"
                  : " hover:bg-gray-100"
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default PaginationTable;
