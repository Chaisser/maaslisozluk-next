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
import Title from "./../ui/Title";
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

    if (!title.trim()) {
      return setErrorMessage("başlık en az 1 harften oluşmalıdır.");
    }

    if (!description.trim()) {
      return setErrorMessage("konunun ilk yazısının girilmesi gereklidir.");
    }

    if (description.trim().length < 10) {
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
          <Title title="yeni başlık oluştur" />
          <form onSubmit={onSubmit}>
            {errorMessage && <Alert title={errorMessage} bg="red" />}
            <div className="mb-4">
              {categories.length > 0 &&
                categories.map((c) => (
                  <span
                    key={c.id}
                    className={`border cursor-pointer mr-2 px-2 py-1 ${
                      c.id === category ? "bg-green-300" : "bg-dark-400"
                    }`}
                    onClick={() => setCategory(c.id)}
                  >
                    {c.title}
                  </span>
                ))}
            </div>
            <div className="mb-4">
              <input
                className="w-full px-3 py-2 text-gray-800 bg-gray-200 rounded-md outline-none"
                onChange={(e) => setTitle(e.target.value.toLowerCase().slice(0, settings.maxTopicChar))}
                value={title}
                placeholder="konu"
              />
              <div className="mt-2 text-xs text-dark-400">
                {title.length} / {settings.maxTopicChar} karakter
              </div>
            </div>
            <NewEntry description={description} setDescription={setDescription} />
            <div className="mb-4">
              <button
                className="px-3 py-2 rounded-md bg-brand-500 text-brand-300 dark:bg-dark-100 dark:text-dark-400 dark:hover:bg-dark-300 "
                type="submit"
              >
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
