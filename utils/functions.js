import Post from "./../components/Post";
import cookieParser from "cookie-parser";

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
  const getCookies = context.req ? { cookie: context.req.headers["cookie"] } : undefined;
  const cookies = getCookies.cookie;
  let token = null;

  if (cookies) {
    const cookieRegex = /(^|(?<=; )) *token=[^;]+;? */gm;
    const foundCookie = cookies.match(cookieRegex);
    if (!foundCookie) {
      return null;
    }
    if (foundCookie.length === 1) {
      return foundCookie[0].replace("token=", "").replace(";", "");
    }
  }

  return token;
};
