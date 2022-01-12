import React, { Component, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Link,
  useLocation,
  useParams,
} from "react-router-dom";
import NavBar from "./authpage/NavBar";
import { SearchMethod } from "./Functions";
import queryString from "query-string";
import {
  TimelinePostsFetch,
  TimelineProfileFetch,
  CommentFetch,
  SendFriendRequestFunc,
  AcceptRequestFunc,
} from "./Functions";
import { icons } from "./Icons";
import { PostFunc } from "./PostFunc";
import ButunKommentler from "./ButunKommentler";
import ButunLikeler from "./ButunLikeler";

export default function TimelinePage({ CurrentUser }) {
  let st = useParams();

  let [userPosts, setUserPosts] = useState({ res: null, Rendered: false });
  let [userProfile, setUserProfile] = useState({ info: null, Rendered: false });
  let [currentUserProfile, setCurrentUserProfile] = useState(null);

  let [Rendered, SetRendered] = useState(false);
  let [next, setNext] = useState(null);

  useEffect(() => {
    setCurrentUserProfile(CurrentUser);
    console.log("CurrentUser");

    console.log(CurrentUser);
    console.log(currentUserProfile);
    console.log("CurrentUser");
  }, [CurrentUser]);

  useEffect(() => {
    TimelineProfileFetch(st.slug).then((pr_info) => {
      setUserProfile({ info: pr_info, Rendered: true });
    });

    TimelinePostsFetch(st.slug, null).then((curr) => {
      setUserPosts({ res: curr.results, Rendered: true });
      setNext(curr.next);
    });
  }, [st]);

  const showMore = () => {
    TimelinePostsFetch(null, next).then((curr) => {
      setUserPosts({
        res: [...userPosts.res, ...curr.results],
        Rendered: true,
      });
      setNext(curr.next);
    });
  };

  useEffect(() => {
    console.log("Current: ", currentUserProfile);
    console.log("Timeline: ", userProfile);
  }, [userProfile, currentUserProfile]);

  const SendFriendRequestFuncT = (val) => {
    console.log(val);
    SendFriendRequestFunc(val).then((res) => {
      if (res) {
        setUserProfile({
          ...userProfile,
          info: { ...userProfile.info, sentreq: true },
        });
      }
    });
  };
  const AcceptRequestFuncT = (val) => {
    console.log(val);
    AcceptRequestFunc(val).then((res) => {
      if (res) {
        setUserProfile({
          ...userProfile,
          info: { ...userProfile.info, isfriend: true },
        });
      }
    });
  };

  if (userPosts.Rendered && userProfile.Rendered) {
    return (
      <div>
        <NavBar />
        <figure className="m-auto w100">
          <div className="c-out">
            {userProfile.info.picture ? (
              <img className="c-in" src={userProfile.info.picture} />
            ) : (
              <div className="c-in">{icons.guy_prof}</div>
            )}
          </div>

          <figcaption className="w300 flex">
            {userProfile.info.last_name} {userProfile.info.name}
          </figcaption>
          <div className="mt10">
            {CurrentUser.id === userProfile.info.id ? (
              <div className="flex align-items-center">{icons.men}Me</div>
            ) : userProfile.info.isfriend ? (
              <div className="flex align-items-center">
                {icons.is_friend}Is Friend
              </div>
            ) : userProfile.info.sentreq ? (
              <div className="flex align-items-center">
                {icons.request_sent}Friendship Request Sent
              </div>
            ) : userProfile.info.recreq ? (
              <div
                className="c-p flex align-items-center"
                onClick={() => {
                  AcceptRequestFuncT(userProfile.info.user);
                }}
              >
                {icons.accept_request}Accept Friendship Request
              </div>
            ) : currentUserProfile ? (
              currentUserProfile.id === userProfile.info.user ? (
                <div className="flex align-items-center">{icons.men}Me</div>
              ) : (
                <div
                  className="c-p flex align-items-center"
                  onClick={() => {
                    SendFriendRequestFuncT(userProfile.info.user);
                  }}
                >
                  {icons.send_request}Send Friendship Request
                </div>
              )
            ) : null}
          </div>
        </figure>

        {userPosts.res.length > 0 ? (
          userPosts.res.map((post) => {
            post.userprof = userProfile.info;

            return (
              <div key={post.id} className="ml10">
                <div className="m-auto w400">
                  <PostFunc post={post}>
                    <ButunLikeler
                      Like_Count={post.like_count}
                      Liked={post.liked}
                      post_id={post.id}
                      w_glass_r={icons.w_glass_r}
                      w_glass_b={icons.w_glass_b}
                    />
                    <ButunKommentler
                      FromHome={false}
                      CommentFetch={CommentFetch}
                      profile={currentUserProfile}
                      post={post}
                    />
                  </PostFunc>
                </div>
              </div>
            );
          })
        ) : (
          <div className="m-auto w100 mt40-i">There Is No Post</div>
        )}

        {next ? (
          <div className="m-auto w100 c-p" onClick={showMore}>
            Show More
          </div>
        ) : null}
      </div>
    );
  } else {
    return <NavBar />;
  }
}
