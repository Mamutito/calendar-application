import { useEffect } from "react";
import useAuthStore from "../../hooks/useAuthStore";
import { useForm } from "../../hooks/useForm";
import "./LoginPage.css";
import Swal from "sweetalert2";

const loginFormFields = {
  loginEmail: "",
  loginPassword: "",
};

const registerFormFields = {
  registerName: "",
  registerEmail: "",
  registerPassword: "",
  registerConfirmPassword: "",
};

const LoginPage = () => {
  const { startLogin, errorMessage, startRegister } = useAuthStore();
  const {
    onInputChange: onLoginInputChange,
    loginEmail,
    loginPassword,
  } = useForm(loginFormFields);

  const {
    onInputChange: onRegisterInputChange,
    registerName,
    registerConfirmPassword,
    registerEmail,
    registerPassword,
  } = useForm(registerFormFields);

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    startLogin({ email: loginEmail, password: loginPassword });
  };

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    if (registerPassword !== registerConfirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords must match",
      });
      return;
    }
    startRegister({
      name: registerName,
      email: registerEmail,
      password: registerPassword,
    });
  };

  useEffect(() => {
    if (errorMessage) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });
    }
  }, [errorMessage]);

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Login</h3>
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                name="loginEmail"
                value={loginEmail}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="form-group mb-4">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="loginPassword"
                value={loginPassword}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="form-group mb-4">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Register</h3>
          <form onSubmit={handleRegisterSubmit}>
            <div className="form-group mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="registerName"
                value={registerName}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-4">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="registerEmail"
                value={registerEmail}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-4">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="registerPassword"
                value={registerPassword}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-4">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                name="registerConfirmPassword"
                value={registerConfirmPassword}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-4">
              <input type="submit" className="btnSubmit" value="New account" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
