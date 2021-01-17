import { useSelector, useDispatch } from "react-redux";
import { logoutUser, getBudget } from "./../store/actions/user";
import { getTopics } from "./../store/actions/category";
import { IoIosLogOut } from "react-icons/io";
import { IoPersonSharp, IoAddSharp, IoRefreshSharp } from "react-icons/io5";
import Link from "next/link";

const Header = () => {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories.categories);
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);
  const budget = useSelector((state) => state.user.budget);
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
          <button onClick={() => dispatch(getTopics(category.slug, "", "", true))}>{category.title}</button>
        </div>
      );
    });
  };
  return (
    <div className=" bg-red-500 sm:bg-blue-500 lg:bg-green-500 ">
      <div className="container mx-auto">
        <div className="grid grid-cols-12 py-3">
          <div className="col-span-3 flex flex-col justify-center">
            maaslisozluk.com <div className="text-xs text-gray-700">Maaşlar 15'inde yatar!</div>
          </div>
          <div className="col-span-6 items-center flex justify-between">
            <div>
              <button onClick={() => dispatch(getTopics(null, "", "", true))}>en yeniler</button>
            </div>

            {renderCategories(categories.slice(0, 7))}
          </div>
          <div className="col-span-3 flex justify-end items-center">
            {token ? (
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
            ) : (
              <div>
                <Link href="/login">
                  <a className="bg-brand-300">giriş</a>
                </Link>

                <Link href="/register">
                  <a className="ml-4">kayıt ol</a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
