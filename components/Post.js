import { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import Link from "next/link";
import Title from "./../ui/Title";
import Alert from "./../ui/Alert";

import { AiOutlineCalendar } from "react-icons/ai";
import { IoLogoBitcoin } from "react-icons/io";
import { RiUser3Line } from "react-icons/ri";
import { AiOutlineShareAlt, AiOutlineFacebook, AiOutlineTwitter, AiOutlineWhatsApp } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import parser from "./../utils/bbParser";
import getSlug from "speakingurl";

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
  link = false,
  topicSlug,
}) => {
  const [readMore, setReadMore] = useState(false);

  const [favLength, setFavLength] = useState(favorites.length);
  const [likesLength, setLikesLength] = useState(likesCount);
  const [showShareButtons, setShowShareButtons] = useState(false);
  const [postError, setPostError] = useState("");

  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    setTimeout(() => {
      setPostError("");
    }, 1500);
  }, [postError]);

  //[TO-DO: Harf sayısı kontrolü ve kelime bitişi kontrolü yap!]
  let wordCount = description.split(" ").length;

  const newDescription = description.replace(/[^\s]+/g, function (match) {
    return match.indexOf("http") === 0 ? match : match.toLowerCase();
  });

  const twitterShareLink = encodeURI(
    `https://twitter.com/intent/tweet?text=${topic}+https://www.maaslisozluk.com/konu/${getSlug(topic, {
      lang: "tr",
    })}&related=maaslisozluk,interaktifis`
  );
  const facebookShareLink = encodeURI(
    `https://facebook.com/sharer.php?u=https://www.maaslisozluk.com/konu/${getSlug(topic, { lang: "tr" })}`
  );
  const whatsappShareLink = encodeURI(
    `https://api.whatsapp.com/send?text=https://www.maaslisozluk.com/konu/${getSlug(topic, { lang: "tr" })} `
  );
  return (
    <Fragment>
      <div className="p-2 border dark:border-dark-300">
        <div
          className="flex-grow pb-4 my-4 text-base whitespace-pre-line dark:text-gray-100"
          style={{ wordBreak: "break-word" }}
        >
          {showTopic && <Title title={topic} link={link} />}

          <div className="grid grid-cols-12">
            <div className="col-span-1 border-r dark:border-dark-100">
              <div className="flex items-center justify-center">
                <Like
                  setPostError={setPostError}
                  id={id}
                  token={token}
                  setLikesLength={setLikesLength}
                  likesLength={likesLength}
                />
              </div>
              <div className="flex items-center justify-center mt-2">
                {token && <Favorite id={id} token={token} setFavLength={setFavLength} favLength={favLength} />}
              </div>
            </div>
            <div className="flex flex-col justify-between col-span-11 text-default-200 dark:text-dark-200">
              <div className="pl-4">
                {description && wordCount < 150 ? (
                  parser.toReact(newDescription)
                ) : (
                  <div>
                    <div className={` ${!readMore && "h-36 overflow-hidden"}`}>{parser.toReact(newDescription)}</div>
                    <div className="mt-2 underline cursor-pointer" onClick={() => setReadMore(!readMore)}>
                      {!readMore ? (
                        <div className="flex justify-between">
                          <div>devamını oku</div>
                        </div>
                      ) : (
                        "kısalt"
                      )}
                    </div>
                  </div>
                )}{" "}
              </div>
              <div className="flex items-center justify-end text-sm text-default-200 dark:text-dark-200">
                <span className="flex items-center mr-4">
                  <IoLogoBitcoin className="mr-2" />
                  <span className="text-brand-400">{(totalEarnings / 100000000).toFixed(8)}</span>
                </span>

                <Link href={`/konu/${topicSlug}/${id}`}>
                  <a className="flex items-center mr-4 hover:underline">
                    <AiOutlineCalendar className="mr-2" />

                    {createdAt === updatedAt
                      ? dayjs(createdAt).format("DD.MM.YYYY HH:mm")
                      : `${dayjs(updatedAt).format("DD.MM.YYYY HH:mm")}*`}
                  </a>
                </Link>
                <span className="flex items-center mr-4">
                  <RiUser3Line className="mr-2" />
                  <Link href={`/yazar/${author}`}>
                    <a className="hover:text-brand-300 hover:underline">{author}</a>
                  </Link>
                </span>
                <span className="flex items-center">
                  <span
                    onClick={() => setShowShareButtons(!showShareButtons)}
                    className={`${showShareButtons && "border-r dark:border-dark-400 pr-4 mr-4"}`}
                  >
                    <AiOutlineShareAlt />
                  </span>
                  {showShareButtons && (
                    <div className="flex items-center">
                      <a href={facebookShareLink} target="_blank" rel="noreferrer noopener" className="mr-4">
                        <AiOutlineFacebook />
                      </a>
                      <a href={twitterShareLink} target="_blank" rel="noreferrer noopener" className="mr-4">
                        <AiOutlineTwitter />
                      </a>
                      <a href={whatsappShareLink} target="_blank" rel="noreferrer noopener" className="mr-4">
                        <AiOutlineWhatsApp />
                      </a>
                    </div>
                  )}
                </span>
                {isEditable && isLoggedIn && (
                  <Link href={`/duzenle/${id}`}>
                    <a className="ml-4 cursor-pointer text-brand-500 hover:text-brand-400">
                      <FiEdit />
                    </a>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        {postError && <Alert bg="red" title={postError} />}
      </div>
    </Fragment>
  );
};
export default Post;
