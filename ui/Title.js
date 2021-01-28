const Title = ({ title, count }) => {
  return (
    <div className="mb-4 text-xl font-semibold text-default-100 dark:text-dark-500">
      {title} {count && `(${count})`}
    </div>
  );
};

export default Title;
