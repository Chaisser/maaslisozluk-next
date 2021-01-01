const Button = ({ title, type }) => {
  return (
    <button className="bg-brand-500 text-brand-300 rounded-md px-3 py-2" type={type}>
      {title}
    </button>
  );
};

export default Button;
