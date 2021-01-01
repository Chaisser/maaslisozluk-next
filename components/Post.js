import { useState } from "react";
import Link from "next/link";
import reactStringReplace from "react-string-replace";

import parse from "html-react-parser";
import moment from "moment";

import { BsBookmark } from "react-icons/bs";
import { FaChevronDown, FaChevronUp, FaFacebookF, FaTwitter } from "react-icons/fa";
import { GrApps } from "react-icons/gr";
import { BiBitcoin } from "react-icons/bi";

import Spoiler from "./../components/Spoiler";
import PostLink from "./../components/PostLink";
import PostRefer from "./../components/PostRefer";
import PostSecret from "./../components/PostSecret";

const Post = ({ description, author, createdAt, updatedAt, isLoggedIn, likes, favorites }) => {
  const [readMore, setReadMore] = useState(false);

  let wordCount = description.split(" ").length;
  const spoilerRegex = /\[spoiler\](.|\n)[^(\[]*\[\/spoiler\]/gm;
  const spoilerExec = spoilerRegex.exec(description);

  const linkRegex = /\[link\](.|\n)[^(\[]*\[\/link\]/gm;
  const linkExec = linkRegex.exec(description);

  const referRegex = /\[bkz\](.|\n)[^(\[]*\[\/bkz\]/gm;
  const referExec = referRegex.exec(description);

  const secretRegex = /\[gizli\](.|\n)[^(\[]*\[\/gizli\]/gm;
  const secretExec = secretRegex.exec(description);

  let z = description;

  if (spoilerExec && spoilerExec.length > 0) {
    z = reactStringReplace(z, spoilerExec[0], (match, i) => (
      <Spoiler key={i + Math.random()} text={spoilerExec[0].replace("[spoiler] \n", "").replace("\n [/spoiler]", "")} />
    ));
  }

  if (linkExec && linkExec.length > 0) {
    z = reactStringReplace(z, linkExec[0], (match, i) => (
      <PostLink key={i + Math.random()} text={linkExec[0].replace("[link] \n", "").replace("\n [/link]", "")} />
    ));
  }

  if (referExec && referExec.length > 0) {
    z = reactStringReplace(z, referExec[0], (match, i) => (
      <PostRefer key={i + Math.random()} text={referExec[0].replace("[bkz] \n", "").replace("\n [/bkz]", "")} />
    ));
  }

  if (secretExec && secretExec.length > 0) {
    z = reactStringReplace(z, secretExec[0], (match, i) => (
      <PostSecret key={i + Math.random()} text={secretExec[0].replace("[gizli] \n", "").replace("\n [/gizli]", "")} />
    ));
  }

  return (
    <div className="flex w-full">
      <div className=" text-gray-900 my-4 flex-grow border-b border-gray-300 pb-4 whitespace-pre-line text-base	">
        {description && wordCount < 150 ? (
          <div>{z}</div>
        ) : (
          <div>
            {parse(
              z
                .split(" ")
                .slice(0, !readMore ? 50 : wordCount)
                .join(" ")
            )}
            <br />
            <div className="cursor-pointer mt-4 underline" onClick={() => setReadMore(!readMore)}>
              {!readMore ? "devamını oku" : "kısalt"}
            </div>
          </div>
        )}

        <div className="meta flex justify-between mt-4">
          <div className="flex items-center">
            <div className="share flex mr-6">
              <span className="mr-2">
                <FaFacebookF className="text-brand-400 hover:text-brand-300 cursor-pointer" />
              </span>
              <span>
                <FaTwitter className="text-brand-400 hover:text-brand-300 cursor-pointer" />
              </span>
            </div>

            <div className="like flex mr-6">
              <span className="mr-2">
                <FaChevronUp className="text-brand-400 hover:text-brand-300 cursor-pointer" />
              </span>
              <span>
                <FaChevronDown className="text-brand-400 hover:text-brand-300 cursor-pointer" />
              </span>
            </div>
            {isLoggedIn && (
              <div className="like flex mr-6 items-center">
                <span className="mr-2">
                  <BsBookmark className="text-brand-400 hover:text-brand-300 cursor-pointer" />
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
                : `${moment(createdAt).format("DD.MM.YYYY HH:mm")} (düzenlendi)`}
            </span>
            <span className="mr-4">
              <Link href={`/yazar/${author}`}>
                <a className="hover:text-brand-300 hover:underline">{author}</a>
              </Link>{" "}
            </span>
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
