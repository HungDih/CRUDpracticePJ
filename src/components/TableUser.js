import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { fetchAllUser } from "../services/UserService";
import * as React from "react";
import { Pagination, Stack } from "@mui/material";
import ModalAddNew from "./ModalAddNew";
import ModalEditUser from "./ModalEditUser";
import ModalDeleteUser from "./ModalDeleteUser";
import _, { debounce } from "lodash";
import "./Table.scss";
import { CSVLink } from "react-csv";
import Papa from "papaparse";
import { toast } from "react-toastify";

function TableUser() {
  const [listUsers, setListUsers] = useState([]);
  const [totals, setTotals] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataUsers, setDataUsers] = useState({});

  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  // Sort
  const [sortBy, setSortBy] = useState("");
  const [sortFieldSortBy, setSortFieldSortBy] = useState("");

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

  const handleSort = (sortBy, sortFieldSortBy) => {
    setSortBy(sortBy);
    setSortFieldSortBy(sortFieldSortBy);
    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = _.orderBy(cloneListUsers, sortFieldSortBy, sortBy);
    setListUsers(cloneListUsers);
  };

  const handleSearchEmail = debounce((event) => {
    const keyword = event.target.value;
    if (keyword) {
      let cloneListUsers = _.cloneDeep(listUsers);
      cloneListUsers = cloneListUsers.filter((item) => {
        return item.email.includes(keyword);
      });
      setListUsers(cloneListUsers);
    } else {
      getUsers(currentPage);
    }
  });

  // Export Data
  const [dataExport, setDataExport] = useState("");

  const getExportData = (event, done) => {
    let result = [];
    if (listUsers && listUsers.length > 0) {
      result.push(["ID", "Email", "First Name", "Last Name"]);
      listUsers.map((item, index) => {
        let listData = [];
        listData[0] = item.id;
        listData[1] = item.email;
        listData[2] = item.first_name;
        listData[3] = item.last_name;
        result.push(listData);
      });
      setDataExport(result);
      done(true);
    }
  };

  // Import Data
  const handleImport = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      if (file.type !== "text/csv") {
        toast.error("Only CSV file...");
        return;
      }
      Papa.parse(file, {
        complete: function (results) {
          const rawCSV = results.data;
          if (rawCSV) {
            if (rawCSV[0] && rawCSV[0].length === 4) {
              console.log(rawCSV);
              if (
                rawCSV[0][0] !== "ID" ||
                rawCSV[0][1] !== "Email" ||
                rawCSV[0][2] !== "First Name" ||
                rawCSV[0][3] !== "Last Name"
              ) {
                toast.warning("Format wrong header...");
              } else {
                let responeData = [];
                rawCSV.map((item, index) => {
                  if (index > 0 && item.length === 4) {
                    let obj = {};
                    obj.id = item[0];
                    obj.email = item[1];
                    obj.first_name = item[2];
                    obj.last_name = item[3];
                    responeData.push(obj);
                  }
                });
                setListUsers(responeData);
              }
            } else {
              toast.warning("Format wrong CSV....");
            }
          } else {
            toast.warning("Not found data CSV....");
          }
        },
      });
    }
  };

  return (
    <>
      <div className="my-3 d-flex justify-content-between">
        <span>List User:</span>
        <div className="group-feat">
          <label htmlFor="import-data" className="btn btn-primary">
            <i className="fa-solid fa-file-import"></i> Import
          </label>
          {/* Feat: Import */}
          <input
            type="file"
            id="import-data"
            hidden
            onChange={(event) => handleImport(event)}
          />

          {/* Feat: Export */}
          <CSVLink
            data={dataExport}
            asyncOnClick={true}
            onClick={getExportData}
            filename={"file.csv"}
            className="btn btn-primary"
          >
            <i className="fa-solid fa-file-arrow-down"></i> Export
          </CSVLink>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setShowModalAdd(true)}
          >
            <i className="fa-solid fa-user-plus"></i> Add new
          </button>
        </div>
      </div>
      <div className="table-search my-3 col-4">
        <input
          type="text"
          placeholder="Search by email"
          className="form-control"
          onChange={(e) => {
            handleSearchEmail(e);
          }}
        />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="sort-header d-flex justify-content-between ">
              <span>ID</span>
              <span>
                <i
                  className="fa-solid fa-arrow-down-long margin-right: 5px "
                  onClick={() => handleSort("desc", "id")}
                ></i>
                <i
                  className="fa-solid fa-arrow-up-long"
                  onClick={() => handleSort("asc", "id")}
                ></i>
              </span>
            </th>
            <th>Email</th>
            <th className="sort-header d-flex justify-content-between ">
              <span>First name</span>
              <span>
                <i
                  className="fa-solid fa-arrow-down-long margin-right: 5px;"
                  onClick={() => handleSort("desc", "first_name")}
                ></i>
                <i
                  className="fa-solid fa-arrow-up-long"
                  onClick={() => handleSort("asc", "first_name")}
                ></i>
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
