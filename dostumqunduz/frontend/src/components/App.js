import React, { Component, useEffect, useState } from "react";
import { render } from "react-dom";
import MainPage from "./MainPage";
import SearchPage from "./isauth/SearchPage";
import TimelinePage from "./isauth/TimelinePage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

export default function App() {
  const [profile, setProfile] = useState({
    name: null,
    last_name: null,
    picture: "",
    gender: null,
    id: null,
  });
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const is_authenticated =
      document.getElementById("is_authenticated").textContent;
    if (is_authenticated == "True") {
      setIsAuth(true);
      loadProfile();
    }
  }, []);

  const loadProfile = () => {
    const url = window.location.protocol + "//" + window.location.host;
    return fetch(url + "/api/get_current_profile/", {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response;
        }
      })
      .then((data) => {
        setProfile({
          name: data.name,
          last_name: data.last_name,
          picture: data.picture ? data.picture : null,
          gender: data.gender ? "male" : "female",
          id: data.user,
        });
      });
  };

  const ReApp = () => {
    setIsAuth(true);
    loadProfile();
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <MainPage ReApp={ReApp} CurrentUser={profile} />
        </Route>
        <Route path="/search">
          <SearchPage CurrentUser={profile} />
        </Route>
        <Route path="/timeline/:slug">
          <TimelinePage CurrentUser={profile} />
        </Route>
      </Switch>
    </Router>
  );
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
