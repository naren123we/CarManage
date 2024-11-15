import { useState, useContext, useEffect } from "react";
import { login } from "../../utils/api";
import { createUser } from "../../utils/api";
import { useNavigate } from "react-router-dom";

import "./login.css";
import UserDetailContext from "../../context/UserDetailContext";
import { toast } from "react-toastify";
import ForgotPassword from "./ForgotPassword";

const Loginsigup = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const [toggle, settoggle] = useState(false);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const history = useNavigate();

  const { userDetails, setUserDetails } = useContext(UserDetailContext);

  async function signup(e) {
    try {
      if (name !== "" && password !== "" && email !== "") {
        const res = await createUser(email, name, password);

        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);

        toast.success(res.data.message, {
          position: "bottom-right",
        });

        setname("");
        setemail("");
        setpassword("");

        setUserDetails({
          email: JSON.parse(localStorage.getItem("user"))
            ? JSON.parse(localStorage.getItem("user")).email
            : "",
          token: localStorage.getItem("token")
            ? localStorage.getItem("token")
            : null,
          favourites: JSON.parse(localStorage.getItem("user"))
            ? JSON.parse(localStorage.getItem("user")).favResidenciesID
            : [],
        });
      } else {
        toast.error("Please fill required fields", {
          position: "top-right",
        });
      }
      setTimeout(() => {
        history("/");
      }, 3000);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message, {
        position: "top-right",
      });
    }
  }

  async function loginSubmit(e) {
    try {
      if (email !== "" && password !== "") {
        const res = await login(email, password);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);
        toast.success(res.data.message, {
          position: "bottom-right",
        });
        setname("");
        setemail("");
        setpassword("");
        setUserDetails({
          email: JSON.parse(localStorage.getItem("user"))
            ? JSON.parse(localStorage.getItem("user")).email
            : "",
          token: localStorage.getItem("token")
            ? localStorage.getItem("token")
            : null,
          favourites: JSON.parse(localStorage.getItem("user"))
            ? JSON.parse(localStorage.getItem("user")).favResidenciesID
            : [],
        });

        setTimeout(() => {
          history("/");
        }, 3000);
      } else {
        toast.error("Please fill required fields", {
          position: "top-right",
        });
      }
    } catch (err) {
      toast.error(err.response.data.message, {
        position: "top-right",
      });
    }
  }

  return (
    <div className="auth_body">
      <div className="auth_box">
        <div className="auth_container1">
          <ForgotPassword open={open} handleClose={handleClose} />
          <h1 className="auth_heading">{toggle ? "Sign up" : "Login"} Here</h1>
          <div>
            {toggle && (
              <input
                name="name"
                required
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setname(e.target.value);
                }}
                type="text"
                className="inp"
              ></input>
            )}

            <input
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
              type="email"
              required
              className="inp"
            ></input>

            <input
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              type="password"
              required
              className="inp"
            ></input>
          </div>

          <button
            className="btn"
            style={{ marginTop: "5px" }}
            onClick={toggle ? signup : loginSubmit}
          >
            {toggle ? "Signup" : "Login"}
          </button>

          {!toggle && (
            <p
              style={{ color: "#4066ff", cursor: "pointer", marginTop: "5px" }}
              onClick={handleOpen}
            >
              Forgot Password
            </p>
          )}

          <div className="screen_visiblity ">
            <p>{toggle ? "" : "Does'nt"} have an account ?</p>
            <p
              style={{
                color: "#4066ff",
                cursor: "pointer",
                padding: "0px 5px",
              }}
              onClick={() => {
                settoggle(!toggle);
              }}
            >
              {toggle ? "Login" : "Sign up"}
            </p>
          </div>
        </div>

        <div className="auth_container2">
          <h1 style={{ color: "#ffffff" }}>Hello, Friend !</h1>
          <p className="auth_paragraph_txt">
            {toggle
              ? "To keep connected with us please login with your personal info"
              : "  Enter Your personal details and start journey with us"}
          </p>

          <button
            className="btn"
            onClick={() => {
              settoggle(!toggle);
            }}
          >
            {toggle ? "Login" : "Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Loginsigup;
