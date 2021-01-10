import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "./../store/actions/user";
import { getTopics } from "./../store/actions/category";

import Link from "next/link";

const Header = () => {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories.categories);
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);

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
              <div>
                <Link href="/yeni">
                  <a>
                    <span className="ml-4">yeni başlık</span>
                  </a>
                </Link>

                <Link href={`/yazar/${user.username}`}>
                  <a>
                    <span className="ml-4">{user.username}</span>
                  </a>
                </Link>

                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    dispatch(logoutUser());
                  }}
                >
                  <span className="ml-4">çıkış yap</span>
                </button>
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
