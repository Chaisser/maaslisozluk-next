import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, getTopics } from "./../store/actions/category";
import { getCurrency } from "./../store/actions/currency";
import { checkToken } from "./../store/actions/user";
import { getStatus } from "./../store/actions/adblocker";
import Header from "./../components/Header";
import SideTopics from "./../components/SideTopics";
import { detectAnyAdblocker } from "just-detect-adblock";

import Cookies from "js-cookie";
const Template = ({ children, sidebarVisible = true }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    detectAnyAdblocker().then((detected) => {
      dispatch(getStatus(!!detected));
    });
  }, []);

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
    dispatch(getCurrency());
  }, []);

  return (
    <div className="bg-white dark:bg-dark-600">
      <Header />
      <div className="container mx-auto mt-4">
        <div className={sidebarVisible ? "grid grid-cols-12 gap-12" : "block"}>
          {sidebarVisible && (
            <div className="col-span-3">
              <SideTopics />
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Template;
