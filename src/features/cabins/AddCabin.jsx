import Modal from "../../ui/Modal";
import CreateEditCabinForm from "./CreateEditCabinForm";
import "./add-cabin.css";
import Button from "../../ui/Button";

const AddCabin = () => {
  return (
    <>
      <Modal>
        <Modal.Open opens="new-cabin-form">
          <div className="add-cabin-btn-container">
            <Button>Add Cabin</Button>
          </div>
        </Modal.Open>
        <Modal.Window name="new-cabin-form">
          <CreateEditCabinForm />
        </Modal.Window>
      </Modal>
    </>
  );
};

export default AddCabin;
