import Template from "./Template";
import Topic from "./../components/Topic";
import { useSelector } from "react-redux";
const Home = () => {
  const topics = useSelector((state) => state.categories.topics);

  const renderTopics = (topics) => {
    if (topics.length === 0) {
      return <div>konu bulunamadı.</div>;
    }

    return topics.map((topic) => {
      return (
        <Topic
          key={topic.id}
          title={topic.title}
          author={topic.user.username}
          counter={0}
          category={topic.category.title}
          createdAt={topic.createdAt}
        />
      );
    });
  };
  return (
    <Template>
      <div className="bg-gray-200 flex w-full h-full">
        <div className="container mx-auto">
          <div className="bg-gray-100 shadow border rounded border-gray-300 p-4 mt-2">
            <div className="grid grid-cols-12 py-3">
              <div className="col-span-3 flex flex-col">
                <div className="">
                  <input type="search" className="bg-gray-300 border-none py-2 px-4" placeholder="Arama Yapın" />
                  <div>Kategoriler - Tarih</div>
                </div>

                {topics.length > 0 && renderTopics(topics)}
              </div>
              <div className="col-span-6">post</div>
            </div>
          </div>
        </div>
      </div>
    </Template>
  );
};

export default Home;
