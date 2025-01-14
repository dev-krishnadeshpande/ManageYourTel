import DataUploader from "./DataUploader";
import "./uploadData.css";

const UploadData = () => {
  return (
    <div className="upload-data-container">
      <div className="upload-data-title">
        <h4>Want to play with dummy data?</h4>
      </div>
      <div className="data-uploader">
        <DataUploader />
      </div>
    </div>
  );
};

export default UploadData;
