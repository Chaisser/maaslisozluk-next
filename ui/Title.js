import Link from "next/link";
import getSlug from 'speakingurl'

const Title = ({ title, count, link }) => {
  return (
    <div className="mb-4 text-xl font-semibold text-default-100 dark:text-dark-200">
      {link ? (
        <Link href={`/konu/${getSlug(title, { lang: "tr" })}`}>
          <a>{title}</a>
        </Link>
      ) : (
        title
      )}{" "}
      {count && `(${count})`}
    </div>
  );
};

export default Title;
