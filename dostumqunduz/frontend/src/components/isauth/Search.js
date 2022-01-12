import React, {
  Component,
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
} from "react";
import { SearchMethod } from "./Functions";
import qs from "query-string";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Route, withRouter } from "react-router-dom";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name_LName: "",
      queryParam: qs.parse(location.search),
      newQueryParam: {
        ...qs.parse(location.search),
        name: "admin",
        last_name: "something",
      },
    };
    this.ChangeHandler = this.ChangeHandler.bind(this);
    this.SubmitHandler = this.SubmitHandler.bind(this);
  }

  ChangeHandler = (event) => {
    this.setState({ Name_LName: event.target.value });
  };

  SubmitHandler = (val) => {
    val.preventDefault();

    const [name, last_name] = this.state.Name_LName.split(" ");
    this.props.history.push({
      pathname: "/search",
      search: `name=${name}&last_name=${last_name}`,
    });

    this.forceUpdate();
    console.log("haha");
  };
  render() {
    return (
      <>
        <form onSubmit={this.SubmitHandler}>
          <input
            placeholder="Search"
            onChange={this.ChangeHandler}
            value={this.state.Name_LName}
          />
        </form>
      </>
    );
  }
}

export default withRouter(Search);
