import { useState } from "react";

const Spoiler = ({ text }) => {
  const [showSpoiler, setShowSpoiler] = useState(false);
  return (
    <div className="outline-none">
      <button className="my-2 focus:outline-none border-gray-500 pb-1" onClick={() => setShowSpoiler(!showSpoiler)}>
        {showSpoiler ? "---spoiler gizle---" : "---spoiler göster---"}
      </button>
      <div className={showSpoiler ? "block py-3 mb-4 bg-brand-200 p-2 rounded-lg" : "hidden"}>
        {text.replace("\n", "")}
      </div>
      {showSpoiler ? "---spoiler bitti---" : ""}
    </div>
  );
};

export default Spoiler;
