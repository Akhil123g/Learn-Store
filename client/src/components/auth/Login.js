import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom'
import Alert from '../Alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ isAuthenticated, login }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const { email, password } = formData;
    const onSubmit = e => {
        e.preventDefault();
        login(email, password);
    };

    // Redirect
    if (isAuthenticated) {
        return <Redirect to="/home" />
    }

    return (
        <section id="register">
            <div className="register-card">
                <Alert />
                <div className="heading">
                    <h3>Sign In</h3>
                </div>
                <form className="form" onSubmit={e => onSubmit(e)}>

                    <div className="input">
                        <input type="email" placeholder="Email" name="email" value={email} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
                    </div>
                    <div className="input">
                        <input type="password" placeholder="Password" name="password" value={password} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
                    </div>

                    <div className="input butn-register">
                        <input type="submit" value="Login" />
                    </div>
                </form>
                <p>Don't have an account? <Link to="/register">Sign Up</Link></p>

            </div>
        </section>
    )
};

Login.propTypes = {
    isAuthenticated: PropTypes.bool,
    login: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login)
