import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, getBudget } from "./../store/actions/user";
import { getTopics } from "./../store/actions/category";
import { IoIosLogOut } from "react-icons/io";
import { IoPersonSharp, IoAddSharp, IoRefreshSharp } from "react-icons/io5";
import settings from "./../utils/settings";
import Link from "next/link";
import Login from "./Login";
import Register from "./Register";

const Header = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const recordsPerPage = settings.topicRecordsPerPage;
  const categories = useSelector((state) => state.categories.categories);
  const currentCategory = useSelector((state) => state.categories.currentCategory);
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);
  const budget = useSelector((state) => state.user.budget);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      console.log(localStorage.getItem("token"));
      console.log("token geldi");
    }
  }, [token]);

  if (categories.length === 0) {
    return <div>yükleniyor</div>;
  }

  const renderCategories = (categories) => {
    if (categories.length === 0) {
      return <button>Kategori bulunmamaktadır.</button>;
    }
    return categories.map((category) => {
      return (
        <div key={category.id}>
          <button
            className={`${
              currentCategory === category.slug ? "dark:text-red-500" : "dark:text-dark-200"
            } font-semibold focus:outline-none `}
            onClick={() => dispatch(getTopics(category.slug, recordsPerPage, 0, "", true, category.title))}
          >
            {category.title}
          </button>
        </div>
      );
    });
  };

  const openModal = () => {
    setIsOpen(true);
    setIsRegisterOpen(false);
  };
  const closeModal = () => {
    setIsOpen(false);
    setIsRegisterOpen(false);
  };

  const openRegistrationModal = () => {
    setIsOpen(false);
    setIsRegisterOpen(true);
  };

  return (
    <div className="border border-b dark:border-dark-100">
      <div className="container mx-auto">
        <div className="grid grid-cols-12 py-3">
          <div className="flex flex-row items-center col-span-4">
            <Link href="/">
              <a>
                <div className="hidden ">
                  <img
                    src="https://storage.googleapis.com/cdn.maaslisozluk.com/logo_dark.svg"
                    width="250"
                    alt="maaşlı sözlük logo"
                  />
                </div>
                <div className="dark:hidden">
                  <img
                    src="https://storage.googleapis.com/cdn.maaslisozluk.com/logo.svg"
                    width="250"
                    alt="maaşlı sözlük logo"
                  />
                </div>
              </a>
            </Link>
            <div className="w-full mx-6">
              <input
                type="search"
                className="px-4 py-2 border border-gray-200 rounded-full dark:bg-dark-300"
                placeholder="başlık, #entry, @yazar"
              />
            </div>
          </div>
          <div className="flex items-center justify-between col-span-8">
            <div>
              <button
                className={`${
                  !currentCategory ? "dark:text-red-500" : "dark:text-dark-200"
                } font-semibold focus:outline-none `}
                onClick={() => dispatch(getTopics(null, recordsPerPage, 0, "", true))}
              >
                en yeniler
              </button>
            </div>

            {renderCategories(categories.slice(0, 8))}

            {!token && (
              <div className="flex items-center ml-6">
                <button
                  onClick={openModal}
                  className="px-4 py-2 font-semibold rounded-l-full focus:outline-none dark:bg-dark-100 dark:text-dark-200"
                >
                  giriş yap
                </button>
                <button
                  onClick={openRegistrationModal}
                  className="px-4 py-2 font-semibold rounded-r-full focus:outline-none dark:bg-dark-400 dark:text-dark-300"
                >
                  kayıt ol
                </button>
                <Register closeModal={closeModal} isOpen={isRegisterOpen} />
                <Login closeModal={closeModal} isOpen={isOpen} />
              </div>
            )}
            {token && (
              <div className="flex items-center">
                <div className="flex items-center mx-2 outline-none">
                  <span className="flex items-center outline-none">
                    <button onClick={() => dispatch(getBudget())} className="focus:outline-none">
                      <IoRefreshSharp className="mr-1" />
                    </button>
                    <Link href={"/bakiye"}>{(budget / 100000000).toFixed(8)}</Link>
                  </span>
                </div>

                <div className="flex items-center mx-2">
                  <Link href="/yeni">
                    <a>
                      <IoAddSharp className="text-xl" />
                    </a>
                  </Link>
                </div>

                <div className="flex items-center mx-2">
                  <Link href={`/profil`}>
                    <a title={user.username}>
                      <IoPersonSharp className="text-xl" />
                    </a>
                  </Link>
                </div>

                <div className="flex items-center mx-2">
                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      dispatch(logoutUser());
                    }}
                  >
                    <IoIosLogOut className="text-xl" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
