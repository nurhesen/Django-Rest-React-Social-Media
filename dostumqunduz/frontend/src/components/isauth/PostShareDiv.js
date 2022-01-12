import React, { Component, useEffect, useState, useRef } from "react";
import { icons } from "./Icons";
import { PostShare } from "./Functions";
import axios from "axios";
import { useHistory } from "react-router-dom";

function PostShareDiv({ CurrentUserId }) {
  const [state, setState] = useState({ body: "", image: "" });
  const [value, setValue] = useState("");
  const [picture, setPicture] = useState(null);
  const [SuccessError, SetSuccessError] = useState({
    success: false,
    error: false,
  });
  const hiddenFileInput = useRef(null);
  const history = useHistory();
  const handleOnClick = () => history.push("/timeline/" + CurrentUserId);

  const ShareNow = () => {
    const formData = new FormData();

    formData.append("body", value);
    formData.append("image", picture);

    return PostShare(formData, picture);
  };

  const handleChange = (event) => {
    if (event.target["name"] === "body") {
      setValue(event.target.value);
    } else if (event.target["name"] === "image") {
      setPicture(event.target.files[0]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    ShareNow()
      .then((x) => {
        setValue("");
        setPicture("");
        SetSuccessError({ success: true, error: false });
        handleOnClick();
      })
      .catch((err) => {
        SetSuccessError({ success: false, error: true });
      });
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  return (
    <form className="w400" onSubmit={handleSubmit}>
      <div className="mflex w400">
        <textarea
          className="w100p m10 mh-90"
          name="body"
          value={value}
          onChange={handleChange}
        />
        <input
          className="w400"
          style={{ display: "none" }}
          ref={hiddenFileInput}
          name="image"
          type="file"
          value={state.image}
          onChange={handleChange}
        />
        <div className="m10 c-p" onClick={handleClick}>
          {icons.upload_icon}
        </div>
      </div>
      <input className="w400 c-p" type="submit" value="Share" />
      {SuccessError.success ? (
        <div style={{ color: "green" }}>Successfully Shared</div>
      ) : SuccessError.error ? (
        <div style={{ color: "red" }}>There Is An Error With Network</div>
      ) : null}
    </form>
  );
}

export { PostShareDiv };
