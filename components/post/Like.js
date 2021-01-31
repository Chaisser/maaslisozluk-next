import getClient from "./../../apollo/apollo";
import { HiOutlineChevronUp, HiOutlineChevronDown } from "react-icons/hi";
import { LIKEPOST } from "./../../gql/post/mutation";

const Like = (props) => {
  const handleLikePost = async (postId, likeType) => {
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
        }
      } catch (err) {
        props.setPostError(err.message);
      }
    }
    return null;
  };
  return (
    <div className="flex flex-col text-lg like">
      <span
        className="cursor-pointer text-default-200 dark:text-dark-200"
        onClick={() => handleLikePost(props.id, "LIKE")}
      >
        <HiOutlineChevronUp />
      </span>
      <span className="text-base text-center text-default-200 dark:text-dark-200">{props.likesLength}</span>
      <span
        className="cursor-pointer text-default-200 dark:text-dark-200"
        onClick={() => handleLikePost(props.id, "DISLIKE")}
      >
        <HiOutlineChevronDown />
      </span>
    </div>
  );
};

export default Like;
