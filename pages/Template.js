import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, getTopics } from "./../store/actions/category";
import { checkToken } from "./../store/actions/user";
import Header from "./../components/Header";
import Topic from "./../components/Topic";
import Cookies from "js-cookie";
const Template = ({ children, sidebarVisible = true }) => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.user.token);
  const topics = useSelector((state) => state.categories.topics);

  useEffect(() => {
    if (!token) {
      if (localStorage.getItem("token")) {
        dispatch(checkToken(localStorage.getItem("token")));
        Cookies.set("token", localStorage.getItem("token"));
      } else {
        Cookies.remove("token");
      }
    }
  }, [token]);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getTopics());
  }, []);

  const renderTopics = (topics) => {
    if (topics.length === 0) {
      return <div>konu bulunamadı.</div>;
    }

    return topics.map((topic) => {
      return <Topic key={topic.id} title={topic.title} counter={topic.postsCount} slug={topic.slug} />;
    });
  };

  return (
    <Fragment>
      <Header />
      <div className="container mx-auto mt-4">
        <div className={sidebarVisible ? "grid grid-cols-12 gap-12" : "block"}>
          {sidebarVisible && (
            <div className="col-span-3">
              {topics.length > 0 && renderTopics(topics)}
              <div className="flex justify-between">
                <span className="bg-brand-100">1</span>
                <span className="bg-brand-200">2</span>
                <span className="bg-brand-300">3</span>
                <span className="bg-brand-400">4</span>
                <span className="bg-brand-500">5</span>
              </div>
            </div>
          )}
          {children}
        </div>
      </div>
    </Fragment>
  );
};

export default Template;
