import { useEffect } from "react";

const NewEntry = ({ description, setDescription }) => {
  useEffect(() => {
    return () => setDescription("");
  }, []);
  return (
    <div className="mb-4">
      <div className="flex justify-start mb-4 items-center">
        <div
          className="border border-gray-300 text-brand-500 text-sm p-1 mr-2 cursor-pointer hover:bg-gray-200"
          onClick={() => setDescription(description + "[bkz] \n\n [/bkz]")}
        >
          (bkz)
        </div>
        <div
          className="border border-gray-300 text-brand-500 text-sm p-1 mr-2 cursor-pointer hover:bg-gray-200"
          onClick={() => setDescription(description + "[gizli] \n\n [/gizli]")}
        >
          *
        </div>
        <div
          className="border border-gray-300 text-brand-500 text-sm p-1 mr-2 cursor-pointer hover:bg-gray-200"
          onClick={() => setDescription(description + "[spoiler] \n\n [/spoiler]")}
        >
          -spoiler-
        </div>
        <div
          className="border border-gray-300 text-brand-500 text-sm p-1 mr-2 cursor-pointer hover:bg-gray-200"
          onClick={() => setDescription(description + "[link] \n\n [/link]")}
        >
          link
        </div>
      </div>
      <textarea
        className="bg-gray-200 text-gray-800 py-2 px-3 rounded-md w-full outline-none"
        value={description}
        rows="5"
        onChange={(e) => setDescription(e.target.value.toLowerCase())}
        placeholder="eklemek istedikleriniz"
      />
    </div>
  );
};
export default NewEntry;
