import Link from "next/link";
const Topic = ({ category, createdAt, title, counter, author, slug }) => {
  return (
    <Link href={`/konu/${slug}`}>
      <a className="flex flex-col py-2 pl-4 pr-2 mb-1 bg-default-300 text-default-200 dark:bg-dark-300 dark:text-dark-200">
        <div className="flex items-baseline justify-between break-all">
          <div className="mr-2 text-sm">{title}</div>
          <span className="items-center justify-center">
            <span className="p-1 text-xs text-white bg-default-400 dark:bg-dark-600 dark:text-dark-400">{counter}</span>
          </span>
        </div>
      </a>
    </Link>
  );
};

export default Topic;
