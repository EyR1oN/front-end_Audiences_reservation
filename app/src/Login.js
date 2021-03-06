import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sendRequest } from "./SendRequest.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [userLog, setUserLog] = useState(
    JSON.parse(window.localStorage.getItem("userData")) || ""
  );
  let navigate = useNavigate();
  const handleSubmit = (reg) => {
    reg.preventDefault();
    const requestURL = "http://localhost:5000/login";

    sendRequest("POST", requestURL, null, null, userLog)
      .then((data) => {
        window.localStorage.setItem("userData", JSON.stringify(data));
        alert("Success login.");
        navigate("/service");
      })
      .catch((err) => {
        alert(err["error"]);
      });
  };

  return (
    <div className="log">
      <div className="login">
        <h1 className="margin-150">Login</h1>
      </div>
      <form className="box-log">
        <input
          data-testid="username"
          type="text"
          name="Username"
          placeholder="Username"
          required
          onChange={(e) =>
            setUserLog((prev) => ({ ...prev, username: e.target.value }))
          }
        />
        <input
          data-testid="password"
          type="password"
          name="Password"
          placeholder="Password"
          required
          onChange={(e) =>
            setUserLog((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <input
          data-testid="submit-login"
          type="submit"
          name="Submit"
          value="Submit"
          onClick={handleSubmit}
        />
        <Link to="/register">Sign up</Link>
      </form>
    </div>
  );
}
