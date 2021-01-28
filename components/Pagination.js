import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
const Pagination = ({ page, setPage, totalPages }) => {
  if (totalPages === 1) {
    return <div></div>;
  }
  return (
    <div className="flex justify-center mt-4">
      <nav className="relative z-0 inline-flex -space-x-px shadow-sm" aria-label="Pagination">
        <button
          disabled={page === 1}
          onClick={() => {
            setPage(1);
          }}
          className="relative inline-flex items-center px-4 py-2 focus:outline-none text-default-400 dark:text-dark-100"
        >
          <BsArrowLeft />
        </button>
        <button
          disabled={page === 1}
          className="relative inline-flex items-center px-4 py-2 focus:outline-none text-default-200 dark:text-dark-400"
          onClick={() => {
            setPage(page - 1);
          }}
        >
          geri
        </button>
        <span className="relative inline-flex items-center px-4 py-2 text-default-200 dark:text-dark-400">
          {page} / {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => {
            setPage(page + 1);
          }}
          className="relative inline-flex items-center px-4 py-2 text-default-200 focus:outline-none dark:text-dark-400"
        >
          ileri
        </button>

        <button
          disabled={page === totalPages}
          onClick={() => {
            setPage(totalPages);
          }}
          className="relative inline-flex items-center px-4 py-2 text-default-400 focus:outline-none dark:text-dark-100"
        >
          <BsArrowRight />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
