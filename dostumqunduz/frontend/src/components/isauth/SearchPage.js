import React, { Component, useEffect, useState } from "react";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import NavBar from "./authpage/NavBar";
import { SearchMethod, SendFriendRequestFunc } from "./Functions";
import queryString from "query-string";
import { icons } from "./Icons";

export default function QueryParamsFunc({ CurrentUser }) {
  return <QueryParams CurrentUser={CurrentUser} />;
}

function UseQuery() {
  return useLocation().search;
}

function QueryParams({ CurrentUser }) {
  let quer = UseQuery();
  let [SResult, SetSResult] = useState({ res: null, Rendered: false });
  let [Rendered, SetRendered] = useState(false);
  let name = queryString.parse(quer).name;
  let last_name = queryString.parse(quer).last_name;

  useEffect(() => {
    let NLN = last_name != "undefined" ? [name, last_name] : [name];
    SearchMethod(...NLN).then((x) => {
      console.log(x);
      if (x.length > 0) {
        SetSResult({ res: x, Rendered: true });
      } else {
        SetSResult({ res: null, Rendered: true });
      }
    });
  }, [name, last_name]);

  const SendFriendRequestFuncT = (val) => {
    SendFriendRequestFunc(val).then((res) => {
      if (res) {
        let arr = [];
        for (let sres of SResult.res) {
          if (sres.user === val) {
            sres.sentreq = true;
          }
          arr.push(sres);
        }
        SetSResult({ res: arr, Rendered: SResult.Rendered });
      }
    });
  };

  if (SResult.Rendered) {
    return (
      <div>
        <NavBar />
        {SResult.res ? (
          SResult.res.map((res) => (
            <div className="searchProf" key={res.user}>
              <div className="postProfPic">
                {res.picture ? (
                  <img className="profImg" src={res.picture} />
                ) : res.gender ? (
                  icons.guy_prof
                ) : (
                  icons.girl_prof
                )}
              </div>
              <div className="searchName">
                <div>
                  <Link to={"timeline/" + res.user} className="no-decoration">
                    {res.name} {res.last_name}
                  </Link>
                </div>
                {res.isfriend ? (
                  <div>Is Friend</div>
                ) : res.sentreq ? (
                  <div>Friendship Request Sent</div>
                ) : res.recreq ? (
                  <div>Accept Friend Request</div>
                ) : res.user === CurrentUser.id ? (
                  <>Me</>
                ) : (
                  <div
                    className="c-p"
                    onClick={() => {
                      SendFriendRequestFuncT(res.user);
                    }}
                  >
                    Send Request
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <h3>No Result</h3>
        )}
      </div>
    );
  } else {
    return <NavBar />;
  }
}
