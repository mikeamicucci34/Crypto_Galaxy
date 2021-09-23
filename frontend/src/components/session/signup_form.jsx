import React from "react";
import { withRouter } from "react-router-dom";
import "./signup.css";
import GLOBE from "vanta/dist/vanta.globe.min";
import NavBar from "../nav/navbar_container";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      handle: "",
      password: "",
      password2: "",
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
    this.vantaRef = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ errors: nextProps.errors });
  }

  componentDidMount() {
    this.vantaEffect = GLOBE({
      el: this.vantaRef.current,
    });
  }

  componentWillUnmount() {
    if (this.vantaEffect) this.vantaEffect.destroy();
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      handle: this.state.handle,
      password: this.state.password,
      password2: this.state.password2,
    };
    this.props.signup(user).then((res) => {
      if (res.type !== "RECEIVE_SESSION_ERRORS") {
        this.props.login({
          email: this.state.email,
          password: this.state.password,
        });
      }
    });
  }

  renderErrors() {
    return (
      <ul className="errors">
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>{this.state.errors[error]}</li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="animation" ref={this.vantaRef}>
        <NavBar />
        <div className="signup-form-container">
          <form className="form" onSubmit={this.handleSubmit}>
            <br />
            <input
              type="text"
              value={this.state.email}
              onChange={this.update("email")}
              placeholder="Email"
              className="login-input"
            />
            <br />
            <input
              type="text"
              value={this.state.handle}
              onChange={this.update("handle")}
              placeholder="Handle"
              className="login-input"
            />
            <br />
            <input
              type="password"
              value={this.state.password}
              onChange={this.update("password")}
              placeholder="Password"
              className="login-input"
            />
            <br />
            <input
              type="password"
              value={this.state.password2}
              onChange={this.update("password2")}
              placeholder="Confirm Password"
              className="login-input"
            />
            <br />
            <input type="submit" value="Submit" className="login-button" />
            {this.renderErrors()}
          </form>
          {/* <div className="footer"></div> */}
        </div>
      </div>
    );
  }
}

export default withRouter(SignupForm);
