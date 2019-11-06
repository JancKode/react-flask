import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alert extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, message } = this.props;
    console.log(`error`, error);
    console.log("prevProps", prevProps);
    if (
      error.msg &&
      (error.msg === "User already exists" ||
        error.msg === "Invalid username or password" ||
        error.msg === "No user found" ||
        error.msg === "Email already used, please register a new one")
    ) {
      alert(error.msg);
      return false;
    }

    if (message !== prevProps.error.msg) {
      if (message.passwordNotMatch) {
        alert(message.passwordNotMatch);
      }
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = state => ({
  error: state.errors,
  message: state.messages
});

export default connect(mapStateToProps)(Alert);
