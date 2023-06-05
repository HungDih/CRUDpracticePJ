import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { postCreateUser } from "../services/UserService";
import { toast } from "react-toastify";

function ModalAddNew(props) {
  const { show, handleClose, handleUpdate } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleAddUser = async () => {
    let respone = await postCreateUser(name, job);
    console.log("Check respone: ", respone);
    if (respone && respone.id) {
      handleClose();
      setName("");
      setJob("");
      toast.success("Add user successfully");
      handleUpdate({ first_name: name, id: respone.id });
    } else {
      toast.error("Add user failed");
    }
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-add new user">
            <form>
              <div className="mb-3">
                <label htmlFor="exampleInputName1" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputName1"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputJob1" className="form-label">
                  Job
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputJob1"
                  value={job}
                  onChange={(e) => {
                    setJob(e.target.value);
                  }}
                />
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalAddNew;
