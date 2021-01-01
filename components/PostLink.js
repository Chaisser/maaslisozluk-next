const PostLink = ({ text }) => {
  return (
    <span className="outline-none">
      <a className="text-brand-300 hover:text-brand-400" href={text}>
        {text}
      </a>
    </span>
  );
};

export default PostLink;
