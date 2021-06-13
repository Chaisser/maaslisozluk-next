const stripTags = (text) => {
  return text.toString().replace(/(<([^>]+)>)/gi, "");
};

export default stripTags;
