import { useState, useEffect } from "react";
import NoSsr from "./NoSsr";
import { useSubscription } from "@apollo/react-hooks";
import { LIVEPOSTSUBSCRIPTION } from "../gql/post/subscription";
import { renderPosts } from "./../utils/functions";
const GetLivePosts = (props) => {
  const [livePosts, setLivePosts] = useState([]);

  const { loading, error, data } = useSubscription(LIVEPOSTSUBSCRIPTION, {
    variables: {
      slug: props.slug,
    },
    fetchPolicy: "no-cache",
  });

  console.log(data);
  useEffect(() => {
    setLivePosts(() => []);
    return () => setLivePosts(() => []);
  }, []);
  useEffect(() => {
    console.log(data);
    if (data) {
      const newData = [...livePosts, data.livePostSubscription.node].reverse();
      setLivePosts((oldPosts) => newData);
    }
  }, [data, loading]);

  return <NoSsr>{renderPosts(livePosts, props.user, props.title, false)}</NoSsr>;
};

export default GetLivePosts;
