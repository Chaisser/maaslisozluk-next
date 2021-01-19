import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTopics } from "./../store/actions/category";
import { CgChevronDoubleLeft, CgChevronDoubleRight, CgChevronLeft, CgChevronRight } from "react-icons/cg";
import { BiRefresh } from "react-icons/bi";
import Topic from "./Topic";
import settings from "./../utils/settings";

const SideTopics = () => {
  const dispatch = useDispatch();
  const topics = useSelector((state) => state.categories.topics);
  const totalTopic = useSelector((state) => state.categories.totalTopic);
  const recordsPerPage = settings.topicRecordsPerPage;
  const [first, setFirst] = useState(recordsPerPage);
  const [page, setPage] = useState(1);
  const skip = (page - 1) * recordsPerPage;

  const totalPages = Math.ceil(totalTopic / recordsPerPage);

  useEffect(() => {
    dispatch(getTopics("", first, skip, "", true));
  }, [page]);

  const renderTopics = (topics) => {
    if (topics.length === 0) {
      return <div>konu bulunamadı.</div>;
    }

    return topics.map((topic) => {
      return <Topic key={topic.id} title={topic.title} counter={topic.postsCount} slug={topic.slug} />;
    });
  };

  return (
    <div>
      <button
        onClick={() => dispatch(getTopics(null, recordsPerPage, 0, "", true))}
        className="flex justify-center w-full items-center rounded-md px-4 py-2 border border-gray-300 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50"
      >
        <span className="text-lg mr-2">
          <BiRefresh />
        </span>
        yenile
      </button>

      {topics.length > 0 && renderTopics(topics)}
      <div className="flex justify-center mt-4">
        <nav className="relative z-0 inline-flex shadow-sm -space-x-px" aria-label="Pagination">
          <button
            disabled={page === 1}
            onClick={() => {
              setPage(1);
            }}
            className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-xs font-medium text-gray-500 hover:bg-gray-50"
          >
            <CgChevronDoubleLeft />
          </button>
          <button
            disabled={page === 1}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50"
            onClick={() => {
              setPage(page - 1);
            }}
          >
            <CgChevronLeft />
          </button>
          <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-xs font-medium text-gray-700">
            {page} / {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => {
              setPage(page + 1);
            }}
            className="hidden md:inline-flex relative items-center px-4 py-2 border border-gray-300 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50"
          >
            <CgChevronRight />
          </button>

          <button
            disabled={page === totalPages}
            onClick={() => {
              setPage(totalPages);
            }}
            className="hidden md:inline-flex relative items-center rounded-r-md px-4 py-2 border border-gray-300 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50"
          >
            <CgChevronDoubleRight />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default SideTopics;
