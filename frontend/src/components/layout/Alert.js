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
    // if (error !== prevProps.error) {
    //   if (error.msg.username) {
    //     alert(`Username ${error.msg.username.join()}`);
    //   }
    //   if (error.msg.password) {
    //     alert(`Password ${error.msg.password.join()}`);
    //   }
    //   if (error.msg.email) {
    //     alert(`Email: ${error.msg.email.join()}`);
    //   }
    //   if (error.msg.non_field_errors) {
    //     alert(error.msg.non_field_errors.join());
    //   }
    // }
    if (error.msg && error.msg === "User already exists") {
      alert(error.msg);
    }

    if (error.msg && error.msg === "No user found") {
      alert(error.msg);
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
