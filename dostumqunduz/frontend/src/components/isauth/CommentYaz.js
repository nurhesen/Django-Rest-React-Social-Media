import React, { Component, useEffect, useState } from "react";

import { icons } from "./Icons";

export default function CommentYaz({ SubmitComment, profil, postId }) {
  const [Value, setValue] = useState("");

  useEffect(() => {});
  function handleChange(event) {
    setValue(event.target.value);
  }

  function CommSubmit(event) {
    event.preventDefault();

    const csrftoken = document.querySelector(
      "[name=csrfmiddlewaretoken]"
    ).value;
    const cdata = {
      post: postId,
      comment: Value[0].toUpperCase() + Value.slice(1),
    };
    const url = window.location.protocol + "//" + window.location.host;

    fetch(url + "/api/comment/", {
      method: "POST",
      mode: "same-origin",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify(cdata),
    })
      .then((response) => {
        if (response.status === 201) {
          console.log(response);

          return response.json();
        }
      })
      .then((resp) => {
        console.log(resp);
        SubmitComment(resp);
        setValue("");
      });
  }

  return (
    <div className="kommentYaz">
      <div className="profDiv">
        {profil.picture ? (
          <img className="profImg" src={profil.picture} />
        ) : profil.gender ? (
          icons.guy_prof
        ) : (
          icons.girl_prof
        )}
      </div>
      <form className="CommentForm" onSubmit={CommSubmit}>
        <input
          className="writeComment"
          type="text"
          value={Value}
          onChange={handleChange}
        />
      </form>
    </div>
  );
}
