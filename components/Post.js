import parse from "html-react-parser";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";

const Post = ({ description, createdAt, updatedAt }) => {
  return (
    <div className="flex px-4">
      <div className="flex flex-col  justify-center pr-2">
        <div className="mb-1">
          <BsChevronUp />
        </div>
        <div className="mt-1">
          <BsChevronDown />
        </div>
      </div>
      <div className="text-lg text-gray-900 my-4 border-b border-gray-300 pb-4">
        {description && parse(description)}
      </div>
    </div>
  );
};
export default Post;
