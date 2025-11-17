import { useLoaderData, useNavigate, useLocation } from "react-router-dom";

const ComplexPaginationContainer = () => {
  const { meta } = useLoaderData();

  const { pageCount, page } = meta.pagination;

  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const handlePageChange = (numPage) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", numPage);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageBtn = ({ pageNum, activeClass }) => {
    return (
      <button
        key={pageNum}
        onClick={() => {
          handlePageChange(pageNum);
        }}
        className={`btn btn-xs sm:btn-md border-none join-item ${
          activeClass ? "bg-base-300 border-base-300" : ""
        }`}
      >
        {pageNum}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButton = [];
    pageButton.push(addPageBtn({ pageNum: 1, activeClass: page === 1 }));
    if (page > 2) {
      pageButton.push(
        <button className="join-item btn btn-xs sm:btn-md" key="dots-1">
          ...
        </button>
      );
    }

    if (page !== 1 && page !== pageCount) {
      pageButton.push(addPageBtn({ pageNum: page, activeClass: true }));
    }

    if (page < pageCount - 1) {
      pageButton.push(
        <button className="join-item btn btn-xs sm:btn-md" key="dots-2">
          ...
        </button>
      );
    }

    pageButton.push(
      addPageBtn({ pageNum: pageCount, activeClass: page === pageCount })
    );
    return pageButton;
  };

  if (pageCount < 2) return null;
  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let prevPage = page - 1;
            if (prevPage < 1) prevPage = pageCount;
            handlePageChange(prevPage);
          }}
        >
          Prev
        </button>
        {renderPageButtons()}
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let nextPage = page + 1;
            if (nextPage > pageCount) nextPage = 1;
            handlePageChange(nextPage);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default ComplexPaginationContainer;
