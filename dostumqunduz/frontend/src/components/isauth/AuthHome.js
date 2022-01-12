import React, { Component, useEffect, useState, useRef } from "react";
import NavBar from "./authpage/NavBar";
import ButunKommentler from "./ButunKommentler";
import ButunLikeler from "./ButunLikeler";
import { icons } from "./Icons";
import { SideBar } from "./SideBar";
import { PostFunc } from "./PostFunc";
import { FriendReqBar } from "./FriendReqBar";
import { PostShareDiv } from "./PostShareDiv";
import { CommentFetch } from "./Functions";

export default function AuthHome(props) {
  const [frp, set_frp] = useState(null);
  const [num, setNum] = useState(2);
  const [mcomm, setMcomm] = useState(null);
  useEffect(() => {
    set_frp(props);
  });

  return (
    <div
      style={{
        maxWidth: "1300px",
        marginLeft: "auto",
        marginRight: "auto",
        width: "80%",
      }}
      className="root"
    >
      <NavBar />
      <div className="homeContainer">
        <SideBar props={props} />
        <div className="middleBar">
          {(() => {
            if (frp) {
              return (
                <>
                  <div>
                    <PostShareDiv CurrentUserId={props.CurrentUserId} />
                  </div>
                  {frp.fr_posts
                    ? frp.fr_posts.map((post) => {
                        return (
                          <div key={post.id}>
                            {mcomm ? mcomm : null}
                            <PostFunc post={post}>
                              <ButunLikeler
                                Like_Count={post.like_count}
                                Liked={post.liked}
                                post_id={post.id}
                                w_glass_r={icons.w_glass_r}
                                w_glass_b={icons.w_glass_b}
                                r_like_icon={icons.heart_r}
                                b_like_icon={icons.heart_b}
                                curr_user={props.profile.id}
                              />
                              <ButunKommentler
                                FromHome={false}
                                CommentFetch={CommentFetch}
                                profile={props.profile}
                                post={post}
                              />
                            </PostFunc>
                          </div>
                        );
                      })
                    : null}
                  <div className="w400 flex">
                    <div
                      onClick={() => {
                        props.loadMoreFriendsPosts(props.next);
                      }}
                      className="morePost"
                      style={{ marginLeft: "auto", marginRight: "auto" }}
                    >
                      {props.next ? <div className="c-p">Daha çox</div> : null}
                    </div>
                  </div>
                </>
              );
            } else {
              return <div></div>;
            }
          })()}
        </div>
        <div className="rightBar ml45">
          <FriendReqBar loadFriendsPosts={props.loadFriendsPosts} />
        </div>
      </div>
    </div>
  );
}
