import getClient from "./../../apollo/apollo";
import Template from "./../Template";
import Title from "./../../ui/Title";
import { renderPosts } from "./../../utils/functions";
import { GETAUTHOR } from "./../../gql/user/query";
const Author = (props) => {
  if (props.authorError) {
    return (
      <Template>
        <div className="col-span-9">
          <div className="mt-4">{props.author.username} diye biri yok</div>
        </div>
      </Template>
    );
  }
  return (
    <Template>
      <div className="col-span-9">
        <Title title={props.author.username} />
        <div className="text-brand-400 text-sm">
          {props.author.topicsCount} konu <span className="text-brand-300">|</span> yazı {props.author.postsCount} yazı
        </div>
        {renderPosts(props.author.posts)}
      </div>
    </Template>
  );
};

export async function getServerSideProps(context) {
  const result = await getClient().query({
    query: GETAUTHOR,
    variables: {
      username: context.params.slug,
    },
  });

  if (result.data.author) {
    return {
      props: {
        authorError: null,
        author: result.data.author,
      },
    };
  }

  return {
    props: {
      authorError: "not",
      author: {
        username: context.params.slug,
        author: {},
      },
    },
  };
}

export default Author;
