import { useEffect, useState } from "react";
import { VscLoading } from "react-icons/vsc";
import { useSelector } from "react-redux";
import Head from "next/head";
import moment from "moment";
import Currency from "./../../../../components/Currency";
import Template from "./../../../Template";
import Post from "./../../../../components/Post";

import Title from "./../../../../ui/Title";
import Alert from "./../../../../ui/Alert";
import { renderPosts, getTokenFromCookie } from "./../../../../utils/functions";
import getClient from "./../../../../apollo/apollo";
import { GETPOST } from "./../../../../gql/post/query";
import "moment/locale/tr";

moment.locale("tr");

const PostItem = ({ post, postError }) => {
  const user = useSelector((state) => state.user.token);
  const adblockStatus = useSelector((state) => state.adblocker.status);

  return (
    <Template>
      <Head>
        <title>{post.topic.title} | Maaşlı Sözlük</title>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@maaslisozluk" />
        <meta property="og:url" content="https://maaslisozluk.com/" />
        <meta property="og:title" content={`Maaşlı Sözlük - ${post.topic.title}`} />
        <meta
          property="og:description"
          content={`${post.topic.title} konusunda ${post.user.username} kullanıcısının yazısı.`}
        />
        <meta property="og:url" content={`https://www.maaslisozluk.com/konu/${post.topic.slug}/${post.id}`} />
        <meta property="og:image" content="https://storage.googleapis.com/cdn.maaslisozluk.com/maasli-sozluk.jpg" />
      </Head>
      <div className="col-span-7">
        <Title title={post.topic.title} />
        <Post
          id={post.id}
          totalEarnings={post.totalEarnings}
          favorites={post.favorites}
          likesCount={post.likesCount}
          isLoggedIn={user}
          description={post.description}
          author={post.user ? post.user.username : null}
          topic={post.topic.title}
          topicSlug={post.topic.slug}
          showTopic={false}
          isEditable={post.isEditable}
          createdAt={post.createdAt}
          updatedAt={post.updatedAt}
          link={null}
        />
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

  console.log(context.params.id, "CONTEXT ID");
  const result = await getClient(token).query({
    query: GETPOST,
    variables: {
      id: context.params.id,
    },
  });

  if (result.data.post) {
    return {
      props: {
        postError: null,
        post: result.data.post,
      },
    };
  }

  return {
    props: {
      postError: "not",
    },
  };
}

export default PostItem;
