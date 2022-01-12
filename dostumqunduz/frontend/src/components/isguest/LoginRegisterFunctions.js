import React, {
  Component,
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
} from "react";

const LoginFunc = (email, password) => {
  const csrftoken = document.querySelector("[name=csrfmiddlewaretoken]").value;
  const cdata = {
    email: email,
    password: password,
  };
  const url = window.location.protocol + "//" + window.location.host;

  return fetch(url + "/api/auth/login/", {
    method: "POST",
    mode: "same-origin",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
    },
    body: JSON.stringify(cdata),
  }).then((response) => {
    if (response.ok) {
      console.log("ok");
      return response.json();
    } else if (response.status === 403) {
      return "403";
    } else {
      console.log(response.status);
      return false;
    }
  });
};

const RegisterFunc = (formData, ftypem) => {
  const csrftoken = document.querySelector("[name=csrfmiddlewaretoken]").value;

  let header;

  let bodys;
  if (ftypem) {
    header = {
      headers: {
        "X-CSRFToken": csrftoken,
      },
    };

    bodys = {
      body: formData,
    };
  } else {
    let object = {};
    formData.forEach(function (value, key) {
      key !== "picture" ? (object[key] = value) : null;
    });
    let json = JSON.stringify(object);

    bodys = {
      body: json,
    };
    header = {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
    };
  }
  console.log("-------");

  console.log(header);
  console.log("-------");
  console.log(bodys);

  const url = window.location.protocol + "//" + window.location.host;

  return fetch(url + "/api/register/", {
    method: "POST",

    ...header,
    ...bodys,
  }).then((response) => {
    if (response.ok) {
      console.log(response);

      return response.json();
    } else {
      return false;
    }
  });
};

export { LoginFunc, RegisterFunc };
