import React from "react";
import { withRouter } from "react-router-dom";
import "./login.css";
import GLOBE from "vanta/dist/vanta.globe.min";
import NavBar from "../nav/navbar_container";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {},
    };


    this.demo = {
      email: 'cryptopunk@gmail.com',
      password: 'cryptopunk',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
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
      password: this.state.password,
    };

    this.props.login(user);
  }

  demoUser(e){
    e.preventDefault()
    this.props.login(this.demo);
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
        <div className="form-contianer">
          <form className="form" onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.email}
              onChange={this.update("email")}
              placeholder="Email"
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
            <input type="submit" value="Submit" className="login-button" />
            <br />
            <input type="submit" value="Demo User" className="login-button" onClick={(e)=>this.demoUser(e)} />
            {this.renderErrors()}
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginForm);
