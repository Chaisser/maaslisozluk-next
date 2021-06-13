import { Fragment } from "react";
import Post from "./../components/Post";
// import cookieParser from "cookie-parser";

export const renderPosts = (posts, user, topic, showTopic, link, topicSlug) => {
  if (posts.length === 0) {
    return <div className="mb-4 dark:text-gray-100">konu hakkında yazılan bir yazı yok.</div>;
  }

  return posts.map((post, i) => {
    return (
      <Fragment key={post.id}>
        {i === 3 && (
          <div className="my-4">
            <a target="_blank" rel="noopener noreferrer" className="text-center" href="https://freebitco.in/?r=4859108">
              <img src="https://static1.freebitco.in/banners/728x90-3.png" alt="free bitcoin" className="mx-auto" />
            </a>
          </div>
        )}
        <Post
          id={post.id}
          totalEarnings={post.totalEarnings}
          favorites={post.favorites}
          likesCount={post.likesCount}
          isLoggedIn={user}
          description={post.description}
          author={post.user ? post.user.username : null}
          topic={topic ? topic : post.topic ? post.topic.title : null}
          topicSlug={topicSlug ? topicSlug : post.topic ? post.topic.slug : null}
          showTopic={showTopic}
          isEditable={post.isEditable}
          createdAt={post.createdAt}
          updatedAt={post.updatedAt}
          link={link}
        />
      </Fragment>
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
