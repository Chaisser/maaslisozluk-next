import moment from "moment";

const Topic = ({ category, createdAt, title, counter, author }) => {
  return (
    <div className="flex flex-col my-4">
      <div className="flex justify-between text-sm">
        <div>{category}</div>
        <div>{moment(createdAt).format("DD.MM.YYYY")}</div>
      </div>
      <div className="flex justify-between">
        <div className="text-lg">{title}</div>
        <div>{counter}</div>
      </div>
      <div className="text-xs text-gray-600">{author}</div>
    </div>
  );
};

export default Topic;
