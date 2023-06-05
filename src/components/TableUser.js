import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { fetchAllUser } from "../services/UserService";
import * as React from "react";
import { Pagination, Stack } from "@mui/material";
import ModalAddNew from "./ModalAddNew";

function TableUser() {
  const [listUsers, setListUsers] = useState([]);
  const [totals, setTotals] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const handleAddClick = () => {
    setShowModal(false);
  };

  useEffect(() => {
    getUsers(currentPage);
  }, [currentPage]);

  const getUsers = async (page) => {
    let respone = await fetchAllUser(page);
    if (respone && respone.data) {
      setTotals(respone.total);
      setTotalPages(respone.total_pages);
      setListUsers(respone.data);
    }
  };

  const handleChange = (event, value) => {
    console.log(value);
    setCurrentPage(value);
  };

  const handleUpdate = (user) => {
    setListUsers([user, ...listUsers]);
  };
  return (
    <>
      <div className="my-3 d-flex justify-content-between">
        <span>List User:</span>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          Add new user
        </button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First name</th>
            <th>Last name</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`users-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <Stack spacing={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handleChange}
          disabled={currentPage === 1 && currentPage == totalPages}
        />
      </Stack>
      <ModalAddNew
        show={showModal}
        handleClose={handleAddClick}
        handleUpdate={handleUpdate}
      />
    </>
  );
}

export default TableUser;
