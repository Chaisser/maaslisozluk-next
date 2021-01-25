import { Fragment, useState } from "react";

import { useSelector } from "react-redux";
import Link from "next/link";
import UseAnimations from "react-useanimations";
import facebook from "react-useanimations/lib/facebook";
import twitter from "react-useanimations/lib/twitter";
import moment from "moment";
import Title from "./../ui/Title";
import { BiBitcoin } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import parser from "./../utils/bbParser";

import Favorite from "./post/Favorite";
import Like from "./post/Like";

const Post = ({
  id,
  description,
  author,
  topic,
  createdAt,
  updatedAt,
  isLoggedIn,
  showTopic,
  likesCount,
  totalEarnings,
  favorites,
  isEditable = false,
}) => {
  const [readMore, setReadMore] = useState(false);

  const [favLength, setFavLength] = useState(favorites.length);
  const [likesLength, setLikesLength] = useState(likesCount);

  const token = useSelector((state) => state.user.token);

  //[TO-DO: Harf sayısı kontrolü ve kelime bitişi kontrolü yap!]
  let wordCount = description.split(" ").length;
  const twitterShareLink = encodeURI(
    `https://twitter.com/intent/tweet?text=${topic}+https://www.maaslisozluk.com/konu/${topic}&related=maaslisozluk,interaktifis`
  );
  const facebookShareLink = encodeURI(`https://facebook.com/sharer.php?u=https://www.maaslisozluk.com/konu/${topic}`);
  return (
    <Fragment>
      <div className="p-2 border dark:border-dark-300">
        <div
          className="flex-grow pb-4 my-4 text-base text-gray-900 whitespace-pre-line "
          style={{ wordBreak: "break-word" }}
        >
          {showTopic && <Title title={topic} />}
          {description && wordCount < 150 ? (
            <div className="grid grid-cols-12">
              <div className="col-span-1">
                <div className="flex items-center mb-2 rounded-r-full dark:bg-dark-300 dark:text-dark-100">
                  <img src="https://storage.googleapis.com/cdn.maaslisozluk.com/happy.svg" width="50" />
                  {token && <Like id={id} token={token} setLikesLength={setLikesLength} />}
                </div>
                <div className="mb-2">
                  <img src="https://storage.googleapis.com/cdn.maaslisozluk.com/angry.svg" width="50" />
                  {token && <Favorite id={id} token={token} setFavLength={setFavLength} favLength={favLength} />}
                </div>
                <div className="mb-2">
                  <img src="https://storage.googleapis.com/cdn.maaslisozluk.com/flag.svg" width="50" />
                </div>
              </div>
              <div className="col-span-11 dark:text-dark-200">{parser.toReact(description)}</div>
            </div>
          ) : (
            <div>
              <div className={` ${!readMore && "h-36 overflow-hidden"}`}>{parser.toReact(description)}</div>
              <div className="mt-2 underline cursor-pointer" onClick={() => setReadMore(!readMore)}>
                {!readMore ? "devamını oku" : "kısalt"}
              </div>
            </div>
          )}

          <div className="flex justify-between mt-4 meta">
            <div className="flex items-center">
              <div className="flex mr-6 share">
                <span className="mr-2">
                  <a target="_blank" rel="noreferrer" href={facebookShareLink}>
                    <UseAnimations size={25} strokeColor="#1877f2" animation={facebook} />
                  </a>
                </span>
                <span>
                  <a target="_blank" rel="noreferrer" href={twitterShareLink}>
                    <UseAnimations size={25} strokeColor="#1DA1F2" animation={twitter} />
                  </a>
                </span>
              </div>
            </div>
            <div className="flex items-center justify-end text-sm dark:text-dark-200">
              <span className="flex items-center mr-4">
                <span className="text-brand-400">{likesLength} beğeni </span>
              </span>

              <span className="flex items-center mr-4">
                <span className="text-brand-400">{favLength} favori </span>
              </span>

              <span className="flex items-center mr-4">
                <span className="text-brand-400">{(totalEarnings / 100000000).toFixed(8)}</span> <BiBitcoin />
              </span>

              <span className="mr-4">
                {createdAt === updatedAt
                  ? moment(createdAt).format("DD.MM.YYYY HH:mm")
                  : `${moment(updatedAt).format("DD.MM.YYYY HH:mm")}*`}
              </span>
              <span className="mr-4">
                <Link href={`/yazar/${author}`}>
                  <a className="hover:text-brand-300 hover:underline">{author}</a>
                </Link>
              </span>
              {isEditable && isLoggedIn && (
                <Link href={`/duzenle/${id}`}>
                  <a className="mr-4 cursor-pointer text-brand-500 hover:text-brand-400">
                    <FiEdit />
                  </a>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Post;
