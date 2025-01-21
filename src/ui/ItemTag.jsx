import "./itemTag.css";

const ItemTag = ({ type, children }) => {
  const style = {
    color: `var(--color-${type}-700)`,
    backgroundColor: `var(--color-${type}-100)`,
  };

  return (
    <span style={style} className="item-tag">
      {children}
    </span>
  );
};

export default ItemTag;
