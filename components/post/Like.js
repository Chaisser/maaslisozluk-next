import UseAnimations from "react-useanimations";
import arrowUp from "react-useanimations/lib/arrowUpCircle";
import arrowDown from "react-useanimations/lib/arrowDownCircle";
import getClient from "./../../apollo/apollo";

import { LIKEPOST } from "./../../gql/post/mutation";

const Like = (props) => {
  const handleLikePost = async (postId, likeType) => {
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
        console.log(err, "ERR FROM LIKE");
      }
    }
    return null;
  };
  return (
    <div className="like flex mr-6">
      <span className="mr-2 cursor-pointer" onClick={() => handleLikePost(props.id, "LIKE")}>
        <UseAnimations size={25} strokeColor="#56584A" animation={arrowUp} />
      </span>
      <span className="cursor-pointer" onClick={() => handleLikePost(props.id, "DISLIKE")}>
        <UseAnimations autoPlay={false} loop={false} size={25} strokeColor="#56584A" animation={arrowDown} />
      </span>
    </div>
  );
};

export default Like;
