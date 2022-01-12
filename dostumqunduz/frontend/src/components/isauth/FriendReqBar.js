import React, { Component, useEffect, useState, useRef } from "react";
import { icons } from "./Icons";
import { GetFriends } from "./Functions";
import { AcceptRequestFunc } from "./Functions";

class FriendReqBar extends Component {
  constructor(props) {
    super(props);
    this.state = { fr_req: null, Fetched: false };
    this.AcceptFriend = this.AcceptFriend.bind(this);
    this.FriendsFetcher = this.FriendsFetcher.bind(this);
  }
  AcceptFriend = (current) => {
    AcceptRequestFunc(current).then((req) => {
      this.FriendsFetcher();
      this.props.loadFriendsPosts();
    });
  };
  FriendsFetcher = () => {
    GetFriends().then((req) => {
      if (req.length === 0) {
        this.setState({ fr_req: null, Fetched: true });
      } else {
        this.setState({ fr_req: req, Fetched: true });
      }
    });
  };

  componentDidMount = () => {
    this.FriendsFetcher();
  };

  render() {
    if (this.state.Fetched) {
      if (this.state.fr_req) {
        return (
          <div className="RightBar">
            {this.state.fr_req.map((friend) => {
              return (
                <div className="FrReqBar" key={friend.current}>
                  <div className="postProfPic w60 h60">
                    {friend.info[0].picture ? (
                      <img className="profImg" src={friend.info[0].picture} />
                    ) : friend.info[0].gender ? (
                      icons.guy_prof
                    ) : (
                      icons.girl_prof
                    )}
                  </div>
                  <div className="frReqInf">
                    <div>
                      {friend.info[0].name} {friend.info[0].last_name}
                    </div>
                    <button onClick={() => this.AcceptFriend(friend.current)}>
                      Accept Friend Request
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        );
      } else {
        return <div>No Friend Request</div>;
      }
    } else {
      return <></>;
    }
  }
}

export { FriendReqBar };
