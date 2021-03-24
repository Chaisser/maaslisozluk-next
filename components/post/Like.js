import { useState } from "react";
import getClient from "./../../apollo/apollo";
import { HiOutlineChevronUp, HiOutlineChevronDown } from "react-icons/hi";
import { LIKEPOST } from "./../../gql/post/mutation";

const Like = (props) => {
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleLikePost = async (postId, likeType) => {
    setButtonDisabled(true);

    props.setPostError("");
    if (props.token) {
      try {
        const result = await getClient(props.token).mutate({
          mutation: LIKEPOST,
          variables: {
            id: postId,
            likeType,
          },
        });
        if (result) {
          props.setLikesLength(result.data.likePost.likesCount);
          setTimeout(() => {
            setButtonDisabled(false);
          }, 100);
        }
      } catch (err) {
        props.setPostError("kendini beğenmiş");
        setTimeout(() => {
          setButtonDisabled(false);
        }, 100);
      }
    }
    return null;
  };
  return (
    <div className="flex flex-col text-lg like">
      <button
        disabled={buttonDisabled}
        className="cursor-pointer text-default-200 dark:text-dark-200"
        onClick={() => handleLikePost(props.id, "LIKE")}
      >
        <HiOutlineChevronUp />
      </button>
      <span className="text-base text-center text-default-200 dark:text-dark-200">{props.likesLength}</span>
      <button
        disabled={buttonDisabled}
        className="cursor-pointer text-default-200 dark:text-dark-200"
        onClick={() => handleLikePost(props.id, "DISLIKE")}
      >
        <HiOutlineChevronDown />
      </button>
    </div>
  );
};

export default Like;
