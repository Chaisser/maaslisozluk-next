import Post from "./../components/Post";

export const renderPosts = (posts, user, topic, showTopic) => {
  if (posts.length === 0) {
    return <div className="mb-4">konu hakkında yazılan bir yazı yok.</div>;
  }

  return posts.map((post) => {
    return (
      <Post
        id={post.id}
        key={post.id}
        totalEarnings={post.totalEarnings}
        favorites={post.favorites}
        likesCount={post.likesCount}
        isLoggedIn={user}
        description={post.description}
        author={post.user ? post.user.username : null}
        topic={topic ? topic : post.topic ? post.topic.title : null}
        showTopic={showTopic}
        isEditable={post.isEditable}
        createdAt={post.createdAt}
        updatedAt={post.updatedAt}
      />
    );
  });
};

export const getTokenFromCookie = (context) => {
  console.log(context.req, "CONTEXT FOR COOKIE DEBUG");
  const getCookies = context.req ? { cookie: context.req.headers.cookie } : undefined;
  const cookies = getCookies.cookie;
  let token = null;

  if (cookies) {
    const parseCookie = cookies.split(";");
    const findToken = parseCookie.find((p) => {
      if (p.slice(1, 6) === "token") {
        return p.replace();
      }
    });
    if (findToken) {
      token = findToken.replace(" token=", "");
    }
  }

  return token;
};
