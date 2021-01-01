const Title = ({ title, count }) => {
  return (
    <div className="text-xl text-brand-500 font-semibold mb-4">
      {title} {count && `(${count})`}
    </div>
  );
};

export default Title;
