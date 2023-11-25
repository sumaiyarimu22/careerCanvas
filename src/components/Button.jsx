const Button = ({ onClickHandler, value, title }) => {
  return (
    <button
      onClick={onClickHandler}
      value={value}
      className={`px-4 py-1 hover:bg-blue hover:text-white border`}
    >
      {title}
    </button>
  );
};

export default Button;
