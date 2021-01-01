import slug from "speakingurl";
import Link from "next/link";
const PostRefer = ({ text }) => {
  return (
    <span className="outline-none">
      bkz:{" "}
      <Link href={`/konu/${slug(text.trim())}`}>
        <a className="text-brand-300 hover:text-brand-400">{text.trim()}</a>
      </Link>
    </span>
  );
};

export default PostRefer;
