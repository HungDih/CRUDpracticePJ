import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { fetchAllUser } from "../services/UserService";
import * as React from "react";
import { Pagination, Stack } from "@mui/material";
import ModalAddNew from "./ModalAddNew";
import ModalEditUser from "./ModalEditUser";
import ModalDeleteUser from "./ModalDeleteUser";
import _ from "lodash";

function TableUser() {
  const [listUsers, setListUsers] = useState([]);
  const [totals, setTotals] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataUsers, setDataUsers] = useState({});

  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const handleCloseClick = () => {
    setShowModalAdd(false);
    setShowModalEdit(false);
    setShowModalDelete(false);
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
    setCurrentPage(value);
  };

  const handleUpdate = (user) => {
    setListUsers([user, ...listUsers]);
  };

  const handleEditUser = (user) => {
    setShowModalEdit(true);
    setDataUsers(user);
  };

  const handleDeleteUser = (user) => {
    // console.log(user);
    setShowModalDelete(true);
    setDataUsers(user);
  };

  const handleGetIdUsers = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    let indexListUsers = listUsers.findIndex((item) => item.id === user.id);
    cloneListUsers[indexListUsers].first_name = user.first_name;
    setListUsers(cloneListUsers);
  };

  const handleDeleteIdUsers = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    // C1:
    let indexListUsers = listUsers.findIndex((item) => item.id === user.id);
    cloneListUsers.splice([indexListUsers], 1);
    // C2:
    // cloneListUsers = cloneListUsers.filter((item) => item.id !== user.id);
    // End:
    setListUsers(cloneListUsers);
  };

  return (
    <>
      <div className="my-3 d-flex justify-content-between">
        <span>List User:</span>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setShowModalAdd(true)}
        >
          Add new user
        </button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="sort-header d-flex justify-content-between ">
              <span>ID</span>
              <span>
                <i className="fa-solid fa-sort-down"></i>
                <i className="fa-solid fa-sort-up"></i>
              </span>
            </th>
            <th>Email</th>
            <th className="sort-header d-flex justify-content-between ">
              <span>First name</span>
              <span>
                <i className="fa-solid fa-sort-down"></i>
                <i className="fa-solid fa-sort-up"></i>
              </span>
            </th>
            <th>Last name</th>
            <th>Actions</th>
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
                  <td>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => handleEditUser(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteUser(item)}
                    >
                      Delete
                    </button>
                  </td>
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
        show={showModalAdd}
        handleClose={handleCloseClick}
        handleUpdate={handleUpdate}
      />
      <ModalEditUser
        show={showModalEdit}
        handleClose={handleCloseClick}
        data={dataUsers}
        handleEdit={handleEditUser}
        handleGetIdUsers={handleGetIdUsers}
      />

      <ModalDeleteUser
        show={showModalDelete}
        handleClose={handleCloseClick}
        data={dataUsers}
        handleDelete={handleDeleteUser}
        handleDeleteIdUsers={handleDeleteIdUsers}
      />
    </>
  );
}

export default TableUser;
