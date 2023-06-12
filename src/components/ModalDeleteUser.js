import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { deleteUser } from "../services/UserService";
import { toast } from "react-toastify";

function ModalDeleteUser(props) {
  const { show, handleClose, data, handleDeleteIdUsers } = props;
  const [idDeleteUser, setIdDeleteUser] = useState("");

  const handleDeleteUser = async () => {
    let respone = await deleteUser(idDeleteUser);
    if (respone && +respone.statusCode === 204) {
      handleClose();
      handleDeleteIdUsers({
        id: data.id,
      });
      toast.success("Delete user successfully");
    } else {
      toast.error("Delete user failed");
    }
  };

  useEffect(() => {
    if (show) {
      setIdDeleteUser(data.id);
    }
  }, [data]);

  // console.log(data);

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
          <Modal.Title>Delete user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-delete user">
            Xác nhan xoa nguoi dung: <b>{data.first_name}?</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={() => handleDeleteUser()}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalDeleteUser;
