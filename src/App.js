import "./App.scss";
import Header from "./components/Header";
import Home from "./components/Home";
import TableUser from "./components/TableUser";
import Container from "react-bootstrap/Container";
import { ToastContainer } from "react-toastify";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";

function App() {
  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <Routes>
            <Route path="/users" element={<TableUser />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
