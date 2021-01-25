import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTopics } from "./../store/actions/category";
import { HiOutlinePlus } from "react-icons/hi";
import { BiRefresh } from "react-icons/bi";
import { BsArrowLeft, BsArrowRight, BsArrowsAngleContract } from "react-icons/bs";

import Link from "next/link";
import Topic from "./Topic";
import settings from "./../utils/settings";

const SideTopics = () => {
  const dispatch = useDispatch();
  const topics = useSelector((state) => state.categories.topics);
  const currentCategory = useSelector((state) => state.categories.currentCategory);
  const totalTopic = useSelector((state) => state.categories.totalTopic);

  const currentCategoryTitle = useSelector((state) => state.categories.currentCategoryTitle);
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
      <div className="flex items-center justify-between">
        <div className="my-2 dark:text-dark-200">{currentCategoryTitle}</div>
        <div className="flex items-center">
          <button
            onClick={() => dispatch(getTopics(currentCategory, recordsPerPage, 0, "", true, currentCategoryTitle))}
            className="dark:text-dark-200"
          >
            <BiRefresh className="mr-2 text-xl" />
          </button>

          <Link href="/yeni">
            <a className="dark:text-dark-200">
              <HiOutlinePlus className="mr-2 text-xl" />
            </a>
          </Link>
        </div>
      </div>
      {topics.length > 0 && renderTopics(topics)}
      <div className="flex justify-center mt-4">
        <nav className="relative z-0 inline-flex -space-x-px shadow-sm" aria-label="Pagination">
          <button
            disabled={page === 1}
            onClick={() => {
              setPage(1);
            }}
            className="relative inline-flex items-center px-4 py-2 dark:text-dark-100"
          >
            <BsArrowLeft />
          </button>
          <button
            disabled={page === 1}
            className="relative inline-flex items-center px-4 py-2 dark:text-dark-400"
            onClick={() => {
              setPage(page - 1);
            }}
          >
            geri
          </button>
          <span className="relative inline-flex items-center px-4 py-2 dark:text-dark-400">
            {page} / {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => {
              setPage(page + 1);
            }}
            className="relative inline-flex items-center px-4 py-2 dark:text-dark-400"
          >
            ileri
          </button>

          <button
            disabled={page === totalPages}
            onClick={() => {
              setPage(totalPages);
            }}
            className="relative inline-flex items-center px-4 py-2 dark:text-dark-100"
          >
            <BsArrowRight />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default SideTopics;
