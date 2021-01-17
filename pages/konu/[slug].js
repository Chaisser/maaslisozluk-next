import { useEffect, useState } from "react";
import Head from "next/head";
import { useSelector } from "react-redux";
import moment from "moment";
import { CgChevronDoubleLeft, CgMediaLive, CgChevronDoubleRight, CgChevronLeft, CgChevronRight } from "react-icons/cg";
import qs from "qs";

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
  const user = useSelector((state) => state.user.token);
  const currency = useSelector((state) => state.currencies.currency);
  const totalPosts = topic.postsCount;

  const skip = (page - 1) * recordsPerPage;
  const totalPages = Math.ceil(totalPosts / recordsPerPage);

  useEffect(() => {
    setPage(1);
    setPosts(() => [...topic.posts]);
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
      topic.posts.push(result.data.createPost);
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
        <meta property="og:url" content={`https://test.maaslisozluk.com/konu/${topic.title}`} />
        <meta property="og:image" content="https://storage.googleapis.com/cdn.maaslisozluk.com/maasli-sozluk.jpg" />
      </Head>
      <div className="col-span-7">
        <div className="mt-4">
          <div className="flex justify-between">
            <Title title={topic.title} count={topic.postsCount} />
            <button
              onClick={() => console.log("canlı başladı")}
              className="flex justify-end items-center px-4 py-2 border border-gray-300 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50"
            >
              <CgMediaLive className="mr-2 text-xl text-red-500" /> canlı takip et
            </button>
          </div>

          <div id="posts">{renderPosts(posts, user, topic.title, false)}</div>

          <div className="flex justify-center mt-4">
            <nav className="relative z-0 inline-flex shadow-sm -space-x-px" aria-label="Pagination">
              <button
                disabled={page === 1}
                onClick={() => {
                  handlePaging(1);
                  setPage(1);
                }}
                className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-xs font-medium text-gray-500 hover:bg-gray-50"
              >
                <CgChevronDoubleLeft />
              </button>
              <button
                disabled={page === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => {
                  handlePaging(page - 1);
                  setPage(page - 1);
                }}
              >
                <CgChevronLeft />
              </button>
              <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-xs font-medium text-gray-700">
                {page} / {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => {
                  handlePaging(page + 1);
                  setPage(page + 1);
                }}
                className="hidden md:inline-flex relative items-center px-4 py-2 border border-gray-300 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50"
              >
                <CgChevronRight />
              </button>

              <button
                disabled={page === totalPages}
                onClick={() => {
                  handlePaging(totalPages);
                  setPage(totalPages);
                }}
                className="hidden md:inline-flex relative items-center rounded-r-md px-4 py-2 border border-gray-300 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50"
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
              <div className="mb-4 flex justify-between">
                <div className="flex ">
                  <div className="mr-2">
                    <button
                      onClick={() => onSubmit("ACTIVE")}
                      className="bg-brand-500 text-brand-300 rounded-md px-3 py-2"
                      type="button"
                    >
                      gönder
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => onSubmit("DRAFT")}
                      className="bg-brand-500 text-brand-300 rounded-md px-3 py-2"
                      type="button"
                    >
                      sakla
                    </button>
                  </div>
                </div>
                <div className="text-gray-500 text-sm">{description.length} karakter</div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>

      <div className="col-span-2">
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
              <td colSpan="2" className="px-2 py-1 text-center text-xs border-b border-gray-300 mb-4">
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
