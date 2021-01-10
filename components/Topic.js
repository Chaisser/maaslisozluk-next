import Link from "next/link";
const Topic = ({ category, createdAt, title, counter, author, slug }) => {
  return (
    <Link href={`/konu/${slug}`}>
      <a className="flex flex-col py-2 border-b px-1">
        <div className="flex justify-between items-baseline break-all">
          <div className="text-sm mr-2">{title}</div>
          <span className="justify-center items-center">
            <span className="bg-gray-100 text-xs p-1">{counter}</span>
          </span>
        </div>
      </a>
    </Link>
  );
};

export default Topic;
