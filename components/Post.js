import { useState } from "react";
import Link from "next/link";
import UseAnimations from "react-useanimations";
import facebook from "react-useanimations/lib/facebook";
import twitter from "react-useanimations/lib/twitter";
import arrowUp from "react-useanimations/lib/arrowUpCircle";
import arrowDown from "react-useanimations/lib/arrowDownCircle";
import bookmark from "react-useanimations/lib/bookmark";
import moment from "moment";
import Title from "./../ui/Title";
import { GrApps } from "react-icons/gr";
import { BiBitcoin } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import parser from "./../utils/bbParser";

const Post = ({
  id,
  description,
  author,
  topic,
  createdAt,
  updatedAt,
  isLoggedIn,
  likes,
  favorites,
  isEditable = false,
}) => {
  const [readMore, setReadMore] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  let wordCount = description.split(" ").length;

  return (
    <div className="flex w-full">
      <div className=" text-gray-900 my-4 flex-grow border-b border-gray-300 pb-4 whitespace-pre-line text-base	">
        {topic && <Title title={topic} />}
        {description && wordCount < 150 ? (
          <div>
            <div>{parser.toReact(description)}</div>
          </div>
        ) : (
          <div>
            <div className={` ${!readMore && "h-36 overflow-hidden"}`}>{parser.toReact(description)}</div>
            <div className="cursor-pointer mt-2 underline" onClick={() => setReadMore(!readMore)}>
              {!readMore ? "devamını oku" : "kısalt"}
            </div>
          </div>
        )}

        <div className="meta flex justify-between mt-4">
          <div className="flex items-center">
            <div className="share flex mr-6">
              <span className="mr-2">
                <UseAnimations size={25} strokeColor="#1877f2" animation={facebook} />
              </span>
              <span>
                <UseAnimations size={25} strokeColor="#1DA1F2" animation={twitter} />
              </span>
            </div>

            <div className="like flex mr-6">
              <span className="mr-2">
                <UseAnimations size={25} strokeColor="#56584A" animation={arrowUp} />
              </span>
              <span>
                <UseAnimations autoPlay={false} loop={false} size={25} strokeColor="#56584A" animation={arrowDown} />
              </span>
            </div>
            {isLoggedIn && (
              <div className="like flex mr-6 items-center">
                <span className="mr-2 text-3xl cursor-pointer">
                  <UseAnimations
                    reverse={isBookmarked}
                    size={25}
                    strokeColor={isBookmarked ? "red" : `#56584A`}
                    animation={bookmark}
                    onClick={() => setIsBookmarked(!isBookmarked)}
                  />
                </span>
              </div>
            )}
          </div>
          <div className="text-sm flex justify-end items-center">
            <span className="mr-4 flex items-center">
              <span className="text-brand-400">{likes.length} beğeni </span>
            </span>
            <span className="mr-4 flex items-center">
              <span className="text-brand-400">{favorites.length} fav </span>
            </span>

            <span className="mr-4 flex items-center">
              <span className="text-brand-400">0.00000012</span> <BiBitcoin />
            </span>
            <span className="mr-4">{wordCount} kelime</span>
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
                <a className="mr-4 text-brand-500 hover:text-brand-400 cursor-pointer">
                  <FiEdit />
                </a>
              </Link>
            )}
            <span>
              <GrApps />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Post;
