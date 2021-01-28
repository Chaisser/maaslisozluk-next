import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTopics } from "./../store/actions/category";
import { HiOutlinePlus } from "react-icons/hi";
import { BiRefresh } from "react-icons/bi";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Pagination from "./Pagination";

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
        <div className="my-2 text-default-200 dark:text-dark-200">{currentCategoryTitle}</div>
        <div className="flex items-center">
          <button
            onClick={() => dispatch(getTopics(currentCategory, recordsPerPage, 0, "", true, currentCategoryTitle))}
            className="dark:text-dark-200 text-default-400"
          >
            <BiRefresh className="mr-2 text-xl" />
          </button>

          <Link href="/yeni">
            <a className="dark:text-dark-200 text-default-400">
              <HiOutlinePlus className="mr-2 text-xl" />
            </a>
          </Link>
        </div>
      </div>
      {topics.length > 0 && renderTopics(topics)}

      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default SideTopics;
