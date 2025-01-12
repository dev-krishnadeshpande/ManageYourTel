import "./buttonIcon.css";

const ButtonIcon = ({ children, onClickHandler }) => {
  return (
    <button onClick={onClickHandler} className="icon-btn">
      {children}
    </button>
  );
};

export default ButtonIcon;
