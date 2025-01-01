import "./button.css"; // Import the CSS file for styles

const Button = ({
  size = "medium",
  variation = "primary",
  children,
  ...props
}) => {
  // Construct the className dynamically based on the size and variation props
  const buttonClass = `btn ${size} ${variation}`;

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};

export default Button;
