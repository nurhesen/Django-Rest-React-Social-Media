import React, { Component, useEffect, useState, useRef } from "react";
import { LoginFunc, RegisterFunc } from "./LoginRegisterFunctions";

export default function GuestHome(props) {
  const [state, setState] = useState({ picture: "" });
  const [Form, SetForm] = useState("log_in");
  const [Email, SetEmail] = useState("");
  const [Password, SetPassword] = useState("");
  const [RePassword, SetRePassword] = useState("");
  const [PassDontMatch, SetPassDontMatch] = useState(false);
  const [ErrorInfo, SetErrorInfo] = useState(false);
  const [RegError, SetRegError] = useState(false);
  const [ErrorNetwork, SetErrorNetwork] = useState(false);
  const [Name, SetName] = useState("");
  const [LastName, SetLastName] = useState("");
  const [Gender, SetGender] = useState("");
  const [Picture, SetPicture] = useState(null);

  const toggle = {
    log_in: "register",
    register: "log_in",
  };

  const OnLogin = (e) => {
    e.preventDefault();

    LoginFunc(Email, Password)
      .then((x) => {
        if (x === "403") {
          props.RedirectAuth();
        } else if (!x) {
          SetErrorInfo(true);
          SetErrorNetwork(false);
        } else {
          SetErrorInfo(false);
          SetErrorNetwork(false);

          props.RedirectAuth();
        }
      })
      .catch((err) => {
        SetErrorInfo(false);
        SetErrorNetwork(true);
      });
  };
  const OnRegister = (e) => {
    e.preventDefault();

    if (Password === RePassword) {
      let cgender;
      Gender === "male" ? (cgender = true) : (cgender = false);
      const formData = new FormData();

      formData.append("email", Email);
      formData.append("password", Password);
      formData.append("name", Name);
      formData.append("last_name", LastName);
      formData.append("gender", cgender);
      formData.append("picture", Picture);

      RegisterFunc(formData, Picture)
        .then((x) => {
          if (!x) {
            SetErrorInfo(false);
            SetErrorNetwork(false);
            SetPassDontMatch(false);
            SetRegError(true);
            console.log(x.status);
          } else {
            SetErrorInfo(false);
            SetErrorNetwork(false);
            SetRegError(false);
            SetPassDontMatch(false);

            props.RedirectAuth();
          }
        })
        .catch((err) => {
          SetRegError(false);
          SetErrorInfo(false);
          SetPassDontMatch(false);
          SetErrorNetwork(true);
        });
    } else {
      SetPassDontMatch(true);
    }
  };

  const handleChange = (event) => {
    const tname = event.target["name"];
    const tvalue = event.target.value;

    if (tname === "uname") {
      SetName(tvalue);
    } else if (tname === "last_name") {
      SetLastName(tvalue);
    } else if (tname === "gender") {
      SetGender(tvalue);
    } else if (tname === "picture") {
      SetPicture(event.target.files[0]);
    } else if (tname === "email") {
      SetEmail(tvalue);
    } else if (tname === "password") {
      SetPassword(tvalue);
    } else if (tname === "repassword") {
      SetRePassword(tvalue);
    }
  };

  return (
    <div className={"form-container " + Form}>
      <div
        style={{
          transform: `translate(${Form === "log_in" ? 0 : 290}px, 0px)`,
        }}
        className="form-form-div"
      >
        <form onSubmit={Form === "log_in" ? OnLogin : OnRegister}>
          {Form === "register" ? (
            <>
              <input
                name="uname"
                placeholder="Name"
                value={Name}
                onChange={handleChange}
                required
              />
              <input
                name="last_name"
                placeholder="Last Name"
                value={LastName}
                onChange={handleChange}
                required
              />

              <select
                className="ml5"
                name="gender"
                value={Gender}
                onChange={handleChange}
                required
              >
                <option value="" defaultChecked>
                  Choose Sex
                </option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
              <label
                className="w400 flex align-items-center ml10"
                htmlFor="picture"
              >
                <div className="up-label">
                  Select a Profile Picture (optional):
                </div>

                <input
                  className="w100p"
                  name="picture"
                  type="file"
                  value={state.picture}
                  onChange={handleChange}
                />
              </label>
            </>
          ) : null}
          <input
            name="email"
            placeholder="Email"
            type="email"
            value={Email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            value={Password}
            onChange={handleChange}
            required
          />
          {Form === "log_in" ? (
            <>
              <button className="form-button-primary">Log In</button>
              {ErrorInfo ? (
                <div className="red ml5">Email Or Password Is Wrong</div>
              ) : ErrorNetwork ? (
                <div className="red">
                  There Is An Error With Your Internet COnnection
                </div>
              ) : (
                ""
              )}
            </>
          ) : (
            <>
              <input
                name="repassword"
                placeholder="Repeat Password"
                type="password"
                value={RePassword}
                onChange={handleChange}
                required
              />
              {PassDontMatch ? (
                <div className="red ml10">Passwords Don't Match</div>
              ) : RegError ? (
                <div className="red ml10">This Email Is Already Registered</div>
              ) : ErrorNetwork ? (
                <div className="red ml10">
                  Please Check Your Internet Connection
                </div>
              ) : null}
              <button className="form-button-primary">Register</button>
            </>
          )}
        </form>
      </div>
      <div
        style={{
          transform: `translate(${Form === "log_in" ? 0 : -650}px, 0px)`,
        }}
        className="form-button-div"
      >
        <p>
          {Form === "log_in" ? "Don't have an account?" : "Already a member?"}
        </p>
        <button
          onClick={() => {
            SetForm(toggle[Form]);
          }}
        >
          {toggle[Form]}
        </button>
      </div>
    </div>
  );
}
