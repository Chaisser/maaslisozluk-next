import { useEffect } from "react";

const NewEntry = ({ description, setDescription }) => {
  useEffect(() => {
    return () => setDescription("");
  }, []);
  return (
    <div className="mb-4">
      <div className="flex items-center justify-start mb-4">
        <div
          className="p-1 mr-2 text-sm border border-gray-300 cursor-pointer text-brand-500 hover:bg-gray-200"
          onClick={() => setDescription(description + "[bkz] \n\n [/bkz]")}
        >
          (bkz)
        </div>
        <div
          className="p-1 mr-2 text-sm border border-gray-300 cursor-pointer text-brand-500 hover:bg-gray-200"
          onClick={() => setDescription(description + "[gizli] \n\n [/gizli]")}
        >
          *
        </div>
        <div
          className="p-1 mr-2 text-sm border border-gray-300 cursor-pointer text-brand-500 hover:bg-gray-200"
          onClick={() => setDescription(description + "[spoiler] \n\n [/spoiler]")}
        >
          -spoiler-
        </div>
        <div
          className="p-1 mr-2 text-sm border border-gray-300 cursor-pointer text-brand-500 hover:bg-gray-200"
          onClick={() => setDescription(description + "[link] \n\n [/link]")}
        >
          link
        </div>
      </div>
      <textarea
        style={{ minHeight: "120px" }}
        className="w-full px-3 py-2 text-gray-800 bg-gray-200 rounded-md outline-none"
        value={description}
        rows="5"
        onChange={(e) => setDescription(e.target.value.toLowerCase())}
        placeholder="eklemek istedikleriniz"
      />
    </div>
  );
};
export default NewEntry;
