const Alert = ({ title, bg }) => {
  return (
    <div className={`w-full md:w-1/4  outline-none text-center bg-${bg}-500 text-white py-3 px-4 mb-4 mx-auto`}>
      {title}
    </div>
  );
};

export default Alert;
