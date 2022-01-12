import React, {
  Component,
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
} from "react";
import CommentYaz from "./CommentYaz";
import { DeleteComment, CommentMapper } from "./Functions";
import { icons } from "./Icons";
import { Link } from "react-router-dom";

export default class ButunKommentler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Comment_Count: props.post.comment_count,
      Current_Profile: props.profile,
      All_Comments: null,
      Post_Id: props.post.id,
      Show_More: false,
      Last_Page: null,
      First_Render: true,
      Render_Start: true,
    };
    this.DeleteComment = this.DeleteComment.bind(this);
    this.CommentFetcher = this.CommentFetcher.bind(this);
    this.SubmitComment = this.SubmitComment.bind(this);
    this.MoreComments = this.MoreComments.bind(this);
  }

  componentDidMount = () => {
    if (!this.state.All_Comments) {
      this.setState({ Render_Start: false });
    }
  };

  DeleteComment = (c_id) => {
    DeleteComment(c_id).then((response) => {
      if (response.status === 204) {
        this.setState({
          All_Comments: this.state.All_Comments.filter((v) => v.id !== c_id),
        });
      }
    });
  };

  CommentFetcher = (post_id, page_id) => {
    return this.props
      .CommentFetch(post_id + "/?page=" + page_id)
      .then((comm) => {
        if (this.state.First_Render) {
          let cc = this.state.Comment_Count;
          this.setState({
            Comment_Count: this.state.Comment_Count - comm.results.length,
            All_Comments: comm.results,
            First_Render: false,
          });
        } else {
          this.setState({
            Comment_Count: this.state.Comment_Count - comm.results.length,
            All_Comments: [...comm.results, ...this.state.All_Comments],
          });
        }
      });
  };

  SubmitComment = (resp) => {
    let r_comment = resp;
    r_comment.c_owner = this.state.Current_Profile;
    if (this.state.All_Comments) {
      this.setState({ All_Comments: [...this.state.All_Comments, r_comment] });
    } else {
      this.setState({ All_Comments: [r_comment] });
    }
  };
  MoreComments = () => {
    let p_num;
    if (!this.state.Last_Page) {
      p_num = Math.ceil(this.state.Comment_Count / 5);
      this.setState({ Last_Page: p_num });
    } else if (this.state.Last_Page > 1) {
      p_num = this.state.Last_Page - 1;
      this.setState({ Last_Page: this.state.Last_Page - 1 });
    }

    this.CommentFetcher(this.state.Post_Id, p_num);
    if (p_num === 1) {
      this.setState({ Show_More: true });
    }
  };

  render() {
    return (
      <div>
        <ul>
          {(() => {
            if (
              !this.state.Show_More &&
              this.state.Comment_Count > 2 &&
              this.props.FromHome
            ) {
              return (
                <div className="c-p" onClick={this.MoreComments}>
                  {this.state.Comment_Count - 2} more komment
                </div>
              );
            } else if (this.state.Comment_Count > 0 && !this.state.Show_More) {
              return (
                <div className="c-p" onClick={this.MoreComments}>
                  {this.state.Comment_Count} more komment
                </div>
              );
            }
          })()}

          {this.state.All_Comments
            ? this.state.All_Comments.map((c) => {
                return (
                  <div className="singleComment w400" key={c.id}>
                    <div className="singleCommentleft">
                      <div className="commentProfDiv">
                        {c.c_owner.picture ? (
                          <img className="profImg" src={c.c_owner.picture} />
                        ) : c.c_owner.gender ? (
                          icons.guy_prof
                        ) : (
                          icons.girl_prof
                        )}
                      </div>
                      <div className="commentProf">
                        <div className="profNameLN">
                          <Link
                            className="no-decoration"
                            to={"/timeline/" + c.c_owner.id}
                          >
                            <div className="divName">
                              {c.c_owner.name} {c.c_owner.last_name}
                            </div>
                          </Link>
                        </div>
                        <div>{c.comment}</div>
                      </div>
                    </div>
                    {c.c_owner.id === this.state.Current_Profile.id ? (
                      <button onClick={() => this.DeleteComment(c.id)}>
                        Delete
                      </button>
                    ) : null}
                  </div>
                );
              })
            : null}
          <CommentYaz
            SubmitComment={this.SubmitComment}
            profil={this.state.Current_Profile}
            postId={this.state.Post_Id}
          />
        </ul>
      </div>
    );
  }
}
