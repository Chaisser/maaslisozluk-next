import { useState } from "react";
import { useSelector } from "react-redux";
import Template from "./../Template";
import Post from "./../../components/Post";
import NewEntry from "./../../components/NewEntry";
import Title from "./../../ui/Title";
import Alert from "./../../ui/Alert";
import Button from "./../../ui/Button";

import getClient from "./../../apollo/apollo";
import { GETTOPIC } from "../../gql/topic/query";
import { CREATEPOST } from "../../gql/topic/mutation";

const Konu = ({ topic }) => {
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const user = useSelector((state) => state.user.token);
  const renderPosts = (posts) => {
    if (posts.length === 0) {
      return <div className="mb-4">konu hakkında yazılan bir yazı yok.</div>;
    }

    return posts.map((post) => {
      return (
        <Post
          key={post.id}
          favorites={post.favorites}
          likes={post.likes}
          isLoggedIn={user}
          description={post.description}
          author={post.user.username}
        />
      );
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
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
      <div className="col-span-9">
        <div className="mt-4">
          <Title title={topic.title} count={topic.postsCount} />
          <div id="posts">{renderPosts(topic.posts)}</div>
          {user ? (
            <div>
              <Title title="eklemek istedikleriniz" />
              {errorMessage && <Alert title={errorMessage} bg="red" />}
              <form onSubmit={onSubmit}>
                <NewEntry description={description} setDescription={setDescription} />
                <div className="mb-4 flex justify-between">
                  <div className="flex ">
                    <div className="mr-2">
                      <Button title="gönder" type="submit" />
                    </div>
                    <div>
                      <Button title="sakla" type="button" />
                    </div>
                  </div>
                  <div className="text-gray-500 text-sm">{description.length} karakter</div>
                </div>
              </form>
            </div>
          ) : (
            <div>cevap yazmak için üye olun</div>
          )}
        </div>
      </div>
    </Template>
  );
};

export async function getServerSideProps(context) {
  const result = await getClient().query({
    query: GETTOPIC,
    variables: {
      slug: context.params.slug,
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
