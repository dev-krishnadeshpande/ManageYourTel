import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateEditCabinForm from "./CreateEditCabinForm";

const AddCabin = () => {
  return (
    <>
      <Modal>
        <Modal.Open opens="new-cabin-form">
          <Button>Add Cabin</Button>
        </Modal.Open>
        <Modal.Window name="new-cabin-form">
          <CreateEditCabinForm />
        </Modal.Window>
      </Modal>
    </>
  );
};

export default AddCabin;
