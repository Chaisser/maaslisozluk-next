const Author = () => {
  return <div>yazar alanı</div>;
};

export async function getServerSideProps(context) {
  const result = await getClient().query({
    query: GETTOPIC,
    variables: {
      slug: context.params.slug,
    },
  });
  if (result.data.topic) {
    return {
      props: {
        postError: null,
        topic: result.data.topic,
      },
    };
  }

  return {
    props: {
      postError: "not",
      topic: {
        title: context.params.slug,
        posts: [],
      },
    },
  };
}

export default Author;
