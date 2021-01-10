import { useState } from "react";
import UseAnimations from "react-useanimations";
import bookmark from "react-useanimations/lib/bookmark";
import getClient from "./../../apollo/apollo";
import { FAVORITEPOST } from "./../../gql/post/mutation";
import { CHECKFAVORITE } from "./../../gql/post/query";

const Favorite = (props) => {
  const [isFavorited, setIsFavorited] = useState(false);

  useState(() => {
    getClient(props.token)
      .query({
        query: CHECKFAVORITE,
        variables: {
          id: props.id,
        },
      })
      .then((res) => {
        setIsFavorited(res.data.checkFavorite.result);
      });
  }, [props.token]);

  const handleFavorite = async (id) => {
    if (props.token) {
      const result = await getClient(props.token).mutate({
        mutation: FAVORITEPOST,
        variables: {
          id,
        },
      });
      if (result.data.favoritePost.result === "ADDED") {
        setIsFavorited(true);
        return props.setFavLength(props.favLength + 1);
      }
      setIsFavorited(false);
      return props.setFavLength(props.favLength - 1);
    }
    return null;
  };

  if (!props.token) {
    return <div></div>;
  }

  return (
    <div className="like flex mr-6 items-center">
      <button className="mr-2 text-3xl cursor-pointer" onClick={() => handleFavorite(props.id)}>
        <UseAnimations reverse={isFavorited} size={25} strokeColor={`#56584A`} animation={bookmark} />
      </button>
    </div>
  );
};

export default Favorite;
