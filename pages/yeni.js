import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import getClient from "./../apollo/apollo";
import { CREATETOPIC } from "./../gql/topic/mutation";
import Template from "./Template";
import PrivateRoute from "./PrivateRoute";
import NewEntry from "./../components/NewEntry";
import Alert from "./../ui/Alert";
import settings from "./../utils/settings";
import { getTopics } from "../store/actions/category";

const Yeni = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const categories = useSelector((state) => state.categories.categories);
  const token = useSelector((state) => state.user.token);
  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!category) {
      return setErrorMessage("konuya uygun kategori seçimi yapılmalıdır.");
    }

    if (!title) {
      return setErrorMessage("başlık en az 1 harften oluşmalıdır.");
    }

    if (!description) {
      return setErrorMessage("konunun ilk yazısının girilmesi gereklidir.");
    }

    if (description.length < 10) {
      return setErrorMessage("yazı minimum 10 karakterden oluşmalıdır");
    }

    try {
      const result = await getClient(token).mutate({
        mutation: CREATETOPIC,
        variables: {
          title,
          description,
          category,
        },
      });
      if (result.data) {
        dispatch(getTopics("", "", "", true));
        router.push(`/konu/${result.data.createTopic.slug}`);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Template>
      <div className="col-span-9">
        <PrivateRoute>
          <div className="text-xl text-brand-500 font-semibold mb-4">yeni başlık oluştur</div>
          <form onSubmit={onSubmit}>
            {errorMessage && <Alert title={errorMessage} bg="red" />}
            <div className="mb-4">
              {categories.length > 0 &&
                categories.map((c) => (
                  <span
                    key={c.id}
                    className={`border cursor-pointer mr-2 px-2 py-1 ${c.id === category && "bg-green-300"}`}
                    onClick={() => setCategory(c.id)}
                  >
                    {c.title}
                  </span>
                ))}
            </div>
            <div className="mb-4">
              <input
                className="bg-gray-200 text-gray-800 py-2 px-3 rounded-md w-full outline-none"
                onChange={(e) => setTitle(e.target.value.toLowerCase().slice(0, settings.maxTopicChar))}
                value={title}
                placeholder="konu"
              />
              <div className="text-xs mt-2">
                {title.length} / {settings.maxTopicChar} karakter
              </div>
            </div>
            <NewEntry description={description} setDescription={setDescription} />
            <div className="mb-4">
              <button className="bg-brand-500 text-brand-300 rounded-md px-3 py-2" type="submit">
                kaydet
              </button>
            </div>
          </form>
        </PrivateRoute>
      </div>
    </Template>
  );
};

export default Yeni;
