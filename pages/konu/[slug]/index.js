import { useEffect, useState } from "react";
import { VscLoading } from "react-icons/vsc";
import Head from "next/head";
import { useSelector } from "react-redux";
import Currency from "./../../../components/Currency";

import { CgMediaLive } from "react-icons/cg";
import Template from "./../../Template";
import NewEntry from "./../../../components/NewEntry";
import Pagination from "./../../../components/Pagination";
import LivePosts from "./../../../components/LivePosts";

import Title from "./../../../ui/Title";
import Alert from "./../../../ui/Alert";
import { renderPosts, getTokenFromCookie } from "./../../../utils/functions";
import getClient from "./../../../apollo/apollo";
import { GETTOPIC } from "../../../gql/topic/query";
import { CREATEPOST } from "../../../gql/topic/mutation";

const recordsPerPage = 10;

const Konu = ({ topic, postError }) => {
  const [page, setPage] = useState(1);
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [posts, setPosts] = useState(topic.posts);

  const [showLivePosts, setShowLivePosts] = useState(false);
  const user = useSelector((state) => state.user.token);
  const adblockStatus = useSelector((state) => state.adblocker.status);
  const totalPosts = topic.postsCount;
  const skip = (page - 1) * recordsPerPage;
  const totalPages = Math.ceil(totalPosts / recordsPerPage);

  useEffect(() => {
    setPage(1);
    setPosts(() => [...topic.posts]);
  }, [topic]);

  useEffect(() => {
    setDescription("");
    setShowLivePosts(false);
  }, [topic]);

  useEffect(() => {
    if (!postError) {
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
    }
  }, [page]);

  const onSubmit = async (status) => {
    setErrorMessage("");
    if (!description.trim()) {
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
    return (
      <Template>
        <div className="flex items-center justify-center">
          <span className="animate-spin">
            <VscLoading />
          </span>
        </div>
      </Template>
    );
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
        <meta property="og:url" content={`https://www.maaslisozluk.com/konu/${topic.slug}`} />
        <meta property="og:image" content="https://storage.googleapis.com/cdn.maaslisozluk.com/maasli-sozluk.jpg" />
      </Head>
      <div className="col-span-7">
        <div className="mt-4">
          {totalPages > 1 && <Pagination page={page} setPage={setPage} totalPages={totalPages} />}
          <div className="flex justify-between">
            <Title title={topic.title} />

            <button
              onClick={() => setShowLivePosts(!showLivePosts)}
              className="flex items-center justify-end px-4 py-2 mb-4 text-xs font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
            >
              <CgMediaLive className="mr-2 text-xl text-red-500" /> {showLivePosts ? "takibi kapat" : "canlı takip et"}
            </button>
          </div>

          {showLivePosts && (
            <div className="w-full p-4 mt-4 mb-12 border border-red-800">
              <LivePosts user={user} slug={topic.slug} title={topic.title} />
            </div>
          )}

          <div id="posts">{renderPosts(posts, user, topic.title, false, "", topic.slug)}</div>

          {totalPages > 1 && <Pagination page={page} setPage={setPage} totalPages={totalPages} />}
          {user ? (
            !postError && (
              <div className="mt-4">
                <Title title="eklemek istedikleriniz" />
                {errorMessage && <Alert title={errorMessage} bg="red" />}
                <NewEntry description={description} setDescription={setDescription} />
                <div className="flex justify-between mb-4">
                  <div className="flex ">
                    <div className="mr-2">
                      <button
                        onClick={() => onSubmit("ACTIVE")}
                        className="px-3 py-2 rounded-md bg-brand-500 text-brand-300 dark:bg-dark-100 dark:text-dark-400 dark:hover:bg-dark-300 "
                        type="button"
                      >
                        gönder
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => onSubmit("DRAFT")}
                        className="px-3 py-2 rounded-md bg-brand-500 text-brand-300 dark:bg-dark-100 dark:text-dark-400 dark:hover:bg-dark-300 "
                        type="button"
                      >
                        sakla
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">{description.length} karakter</div>
                </div>
              </div>
            )
          ) : (
            <div></div>
          )}
        </div>
      </div>

      <div className="col-span-2">
        {adblockStatus ? (
          <div className="p-4 mb-4 text-center text-white bg-red-800">
            kazancımızı reklamlardan elde ediyoruz. yazarlarımıza destek olmak için reklam engelleyicinizi lütfen
            kapatın
          </div>
        ) : (
          <div className="p-4 mb-4 text-center text-white bg-green-800">
            yazarlarımıza destek olduğunuz için teşekkürler!
          </div>
        )}
        <Currency />
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
      first: 10,
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
        postsCount: 0,
        slug: context.params.slug,
      },
    },
  };
}

export default Konu;
