import { useState,useEffect } from "react";
import Container from "react-bootstrap/Container";
import { toast } from "react-toastify";
import { loginApi } from "../services/UserService";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [loadingApi, setloadingApi] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Chưa nhập trường Email/Password");
      return;
    }
    setloadingApi(true);
    let respone = await loginApi(email, password);
    if (respone && respone.token) {
      localStorage.setItem("token", respone.token);
      navigate("/");
    } else {
      if (respone.status === 400 && respone) {
        toast.error(respone.data.error);
      }
    }
    setloadingApi(false);
  };


  return (
    <Container>
      <div className="login-container d-flex flex-column col-12 col-sm-8 col-lg-6 m-auto ">
        <div className="title text-center mt-3">
          <h2>Login</h2>
        </div>
        <div className="description">
          <span>Email or username(eve.holt@reqres.in  cityslicka)</span>
        </div>
        <input
          type="text"
          placeholder="Email or username"
          className="mt-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="form-input">
          <input
            type={isShow ? "text" : "password"}
            placeholder="Password"
            className="my-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <i
            className={isShow ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
            onClick={() => setIsShow(!isShow)}
          ></i>
        </div>
        <button
          className={email && password ? "active" : ""}
          disabled={!email && !password}
          onClick={handleLogin}
        >

          {loadingApi && <i className="fa-solid fa-spinner fa-spin-pulse"></i>}
          &nbsp;Login
        </button>


        <div className="return">
          <i className="fa-solid fa-chevron-left"></i>
          <span>Goback</span>
        </div>
      </div>
    </Container>
  );
}

export default Login;
