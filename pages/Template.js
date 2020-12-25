import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, getTopics } from "./../store/actions/category";
import { checkToken } from "./../store/actions/user";
import Header from "./../components/Header";

const Template = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    if (!token) {
      if (localStorage.getItem("token")) {
        dispatch(checkToken(localStorage.getItem("token")));
      }
    }
  }, [token]);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getTopics());
  }, []);

  return (
    <Fragment>
      <Header />
      <div>{props.children}</div>
    </Fragment>
  );
};

export default Template;
