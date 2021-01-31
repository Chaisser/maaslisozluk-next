import { useState } from "react";

const Spoiler = ({ text }) => {
  const [showSpoiler, setShowSpoiler] = useState(false);
  return (
    <div className="outline-none">
      <button className="pb-1 my-2 border-gray-500 focus:outline-none" onClick={() => setShowSpoiler(!showSpoiler)}>
        {showSpoiler ? (
          <span className="font-semibold">---spoiler gizle---</span>
        ) : (
          <span className="font-semibold">---spoiler göster---</span>
        )}
      </button>
      <div className={showSpoiler ? "block py-3 mb-4 bg-brand-200 p-2 rounded-lg" : "hidden"}>
        {text.toLowerCase().replace("\n", "")}
      </div>
      {showSpoiler ? "---spoiler bitti---" : ""}
    </div>
  );
};

export default Spoiler;
