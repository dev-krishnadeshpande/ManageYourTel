import "./file-input.css";

const FileInput = ({ id }) => {
  return (
    <div className="file-input-container">
      <input type="file" id={id} className="file-input" />
    </div>
  );
};

export default FileInput;
