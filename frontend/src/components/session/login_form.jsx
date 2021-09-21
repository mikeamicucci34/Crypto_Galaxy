
import React from 'react';
import { withRouter } from 'react-router-dom';
import './login.css'

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errors: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
    }

  
    componentWillReceiveProps(nextProps) {
        this.setState({ errors: nextProps.errors })
    }

   
    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }


    handleSubmit(e) {
        e.preventDefault();

        let user = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.login(user)
    }
    

    renderErrors() {
        return (
            <ul className="errors">
                {Object.keys(this.state.errors).map((error, i) => (
                    <li key={`error-${i}`}>
                        {this.state.errors[error]}
                    </li>
                ))}
            </ul>
        );
    }

    render() {
        return (
            <div className="form-contianer">
                <form className="form" onSubmit={this.handleSubmit}>
                    
                        <input type="text"
                            value={this.state.email}
                            onChange={this.update('email')}
                            placeholder="Email"
                            className="login-input"
                        />
                        <br />
                        <input type="password"
                            value={this.state.password}
                            onChange={this.update('password')}
                            placeholder="Password"
                            className="login-input"
                        />
                        <br />
                        <input type="submit" value="Submit" className="login-button"/>
                        {this.renderErrors()}

                </form>
                <div className="footer"></div>
            </div>
        );
    }
}

export default withRouter(LoginForm);