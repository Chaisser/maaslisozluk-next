import slug from "speakingurl";
import Link from "next/link";
const PostSecret = ({ text }) => {
  return (
    <span className="outline-none">
      <Link href={`/konu/${slug(text.trim())}`}>
        <a className="text-brand-300 hover:text-brand-400" title={text}>
          *
        </a>
      </Link>
    </span>
  );
};

export default PostSecret;
