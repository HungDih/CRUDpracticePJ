import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { putUpdateUser } from "../services/UserService";

function ModalEditUser(props) {
  const { show, handleClose, data, handleGetIdUsers } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleEditUser = async () => {
    let respone = await putUpdateUser(name, job);
    if (respone && respone.updatedAt) {
      handleClose();
      handleGetIdUsers({
        first_name: name,
        id: data.id,
      });
      toast.success("Edit user successfully");
    } else {
      toast.error("Edit user failed");
    }
  };

  useEffect(() => {
    if (show) {
      setName(data.first_name);
    }
  }, [data]);

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard="false"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-edit user">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputName2" className="form-label">
                Job
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputName2"
                value={job}
                onChange={(e) => {
                  setJob(e.target.value);
                }}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditUser}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalEditUser;
