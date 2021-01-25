import { useEffect, useState } from "react";
import Head from "next/head";
import { useSelector } from "react-redux";
import moment from "moment";
import { CgChevronDoubleLeft, CgMediaLive, CgChevronDoubleRight, CgChevronLeft, CgChevronRight } from "react-icons/cg";
import { useSubscription } from "@apollo/react-hooks";
import { LIVEPOSTSUBSCRIPTION } from "./../../gql/post/subscription";
import Template from "./../Template";
import NewEntry from "./../../components/NewEntry";
import Title from "./../../ui/Title";
import Alert from "./../../ui/Alert";
import Button from "./../../ui/Button";
import { renderPosts, getTokenFromCookie } from "./../../utils/functions";
import getClient from "./../../apollo/apollo";
import { GETTOPIC } from "../../gql/topic/query";
import { CREATEPOST } from "../../gql/topic/mutation";
import "moment/locale/tr";

moment.locale("tr");

const recordsPerPage = 10;

const handlePaging = () => {
  console.log("tıklandı");
};
const Konu = ({ topic }) => {
  const [page, setPage] = useState(1);
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [posts, setPosts] = useState(topic.posts);
  const [livePosts, setLivePosts] = useState([]);
  const [showLivePosts, setShowLivePosts] = useState(false);
  const user = useSelector((state) => state.user.token);
  const adblockStatus = useSelector((state) => state.adblocker.status);

  const currency = useSelector((state) => state.currencies.currency);
  const totalPosts = topic.postsCount;

  const skip = (page - 1) * recordsPerPage;
  const totalPages = Math.ceil(totalPosts / recordsPerPage);

  const { loading, error, data } = useSubscription(LIVEPOSTSUBSCRIPTION, {
    variables: {
      slug: topic.slug,
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    console.log(data, "?");
    if (data) {
      const newData = [...livePosts, data.livePostSubscription.node].reverse();
      setLivePosts((oldPosts) => newData);
    }
  }, [data]);

  useEffect(() => {
    setPage(1);
    setPosts(() => [...topic.posts]);
  }, [topic]);

  useEffect(() => {
    console.log("değişti");
    setDescription("");
    setShowLivePosts(false);
    setLivePosts(() => []);
  }, [topic]);
  useEffect(() => {
    getClient(user)
      .query({
        query: GETTOPIC,
        variables: {
          slug: topic.slug,
          first: recordsPerPage,
          skip,
        },
      })
      .then((res) => {
        setPosts((oldPosts) => [...res.data.topic.posts]);
      });
  }, [page]);

  const onSubmit = async (status) => {
    setErrorMessage("");
    if (!description) {
      return setErrorMessage("yazı yazılması gereklidir.");
    }

    if (description.length < 10) {
      return setErrorMessage("yazı minimum 10 karakterden oluşmalıdır");
    }

    if (!user) {
      return setErrorMessage("yazı yazmak için üye olmak zorunludur.");
    }

    // dispatch(createPost(description, topic.slug));
    const result = await getClient(user).mutate({
      mutation: CREATEPOST,
      variables: {
        description,
        topic: topic.slug,
        status,
      },
    });

    if (result.data) {
      setPosts((oldPosts) => [...oldPosts, result.data.createPost]);
      // topic.posts.push(result.data.createPost);
    }

    setDescription("");
  };

  if (!topic.title) {
    return <Template>yükleniyor</Template>;
  }
  return (
    <Template>
      <Head>
        <title>{topic.title} | Maaşlı Sözlük</title>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@maaslisozluk" />
        <meta property="og:url" content="https://maaslisozluk.com/" />
        <meta property="og:title" content={`Maaşlı Sözlük`} />
        <meta property="og:description" content={`${topic.title} konusunda yazılanlar `} />
        <meta property="og:url" content={`https://www.maaslisozluk.com/konu/${topic.title}`} />
        <meta property="og:image" content="https://storage.googleapis.com/cdn.maaslisozluk.com/maasli-sozluk.jpg" />
      </Head>
      <div className="col-span-7">
        <div className="mt-4">
          <div className="flex justify-between">
            <Title title={topic.title} />

            <button
              onClick={() => setShowLivePosts(!showLivePosts)}
              className="flex items-center justify-end px-4 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
            >
              <CgMediaLive className="mr-2 text-xl text-red-500" /> {showLivePosts ? "takibi kapat" : "canlı takip et"}
            </button>
          </div>

          {showLivePosts && (
            <div className="w-full p-4 mt-4 mb-12 border border-red-800">
              {renderPosts(livePosts, user, topic.title, false)}
            </div>
          )}
          <div id="posts">{renderPosts(posts, user, topic.title, false)}</div>

          <div className="flex justify-center mt-4">
            <nav className="relative z-0 inline-flex -space-x-px shadow-sm" aria-label="Pagination">
              <button
                disabled={page === 1}
                onClick={() => {
                  handlePaging(1);
                  setPage(1);
                }}
                className="relative inline-flex items-center px-4 py-2 text-xs font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50"
              >
                <CgChevronDoubleLeft />
              </button>
              <button
                disabled={page === 1}
                className="relative inline-flex items-center px-4 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                onClick={() => {
                  handlePaging(page - 1);
                  setPage(page - 1);
                }}
              >
                <CgChevronLeft />
              </button>
              <span className="relative inline-flex items-center px-4 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300">
                {page} / {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => {
                  handlePaging(page + 1);
                  setPage(page + 1);
                }}
                className="relative items-center hidden px-4 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 md:inline-flex hover:bg-gray-50"
              >
                <CgChevronRight />
              </button>

              <button
                disabled={page === totalPages}
                onClick={() => {
                  handlePaging(totalPages);
                  setPage(totalPages);
                }}
                className="relative items-center hidden px-4 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 md:inline-flex rounded-r-md hover:bg-gray-50"
              >
                <CgChevronDoubleRight />
              </button>
            </nav>
          </div>

          {user ? (
            <div>
              <Title title="eklemek istedikleriniz" />
              {errorMessage && <Alert title={errorMessage} bg="red" />}
              <NewEntry description={description} setDescription={setDescription} />
              <div className="flex justify-between mb-4">
                <div className="flex ">
                  <div className="mr-2">
                    <button
                      onClick={() => onSubmit("ACTIVE")}
                      className="px-3 py-2 rounded-md bg-brand-500 text-brand-300"
                      type="button"
                    >
                      gönder
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => onSubmit("DRAFT")}
                      className="px-3 py-2 rounded-md bg-brand-500 text-brand-300"
                      type="button"
                    >
                      sakla
                    </button>
                  </div>
                </div>
                <div className="text-sm text-gray-500">{description.length} karakter</div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>

      <div className="col-span-2">
        {adblockStatus && (
          <div className="p-4 mb-4 text-center text-white bg-red-800">
            Kazancımızı reklamlardan elde ediyoruz. Yazarlarımıza destek olmak için reklam engelleyicinizi lütfen
            kapatın
          </div>
        )}
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-2 py-1 text-center bg-gray-300">TRY</th>
              <th className="px-2 py-1 text-center bg-gray-300">USD</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1 text-center border-b border-gray-300">
                {currency.turkishLira && currency.turkishLira.toFixed(2)}
              </td>

              <td className="px-2 py-1 text-center border-b border-gray-300">
                {currency.usDollar && currency.usDollar.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td colSpan="2" className="px-2 py-1 mb-4 text-xs text-center border-b border-gray-300">
                Son güncelleme: {currency && moment(currency.createdAt).format("DD MMM YYYYY HH:mm")}
              </td>
            </tr>
          </tbody>
        </table>
        toplam kazançç
      </div>
    </Template>
  );
};

export async function getServerSideProps(context) {
  const token = getTokenFromCookie(context);

  const result = await getClient(token).query({
    query: GETTOPIC,
    variables: {
      slug: context.params.slug,
      first: recordsPerPage,
      skip: 0,
    },
  });
  if (result.data.topic) {
    return {
      props: {
        postError: null,
        topic: result.data.topic,
      },
    };
  }

  return {
    props: {
      postError: "not",
      topic: {
        title: context.params.slug,
        posts: [],
      },
    },
  };
}

export default Konu;
