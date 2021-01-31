const PostLink = ({ text }) => {
  return (
    <span className="outline-none">
      <a rel="noreferrer" target="_blank" className="text-brand-300 hover:text-brand-400" href={text}>
        {text.toLowerCase()}
      </a>
    </span>
  );
};

export default PostLink;
