import { useState } from "react";
import getClient from "./../../apollo/apollo";
import { FAVORITEPOST } from "./../../gql/post/mutation";
import { CHECKFAVORITE } from "./../../gql/post/query";
import { RiBookmark3Line, RiBookmark3Fill } from "react-icons/ri";

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
    <div className="flex flex-col text-lg like">
      <button className="cursor-pointer text-default-200 dark:text-dark-200" onClick={() => handleFavorite(props.id)}>
        {isFavorited ? <RiBookmark3Fill /> : <RiBookmark3Line />}
      </button>
      <span className="text-base text-center text-default-200 dark:text-dark-200">{props.favLength}</span>
    </div>
  );
};

export default Favorite;
