
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

import Alert from '../Alert';

const Register = ({ setAlert, register }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });
    const { name, email, password, password2 } = formData;
    const onSubmit = e => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
        }
        else {
            register({ name, email, password });
        }
    }
    return (
        <section id="register">
            <div className="register-card">
                <Alert />
                <div className="heading">
                    <h3>Sign Up</h3>
                </div>
                <form className="form" onSubmit={e => onSubmit(e)}>
                    <div className="input">
                        <input type="text" placeholder="Name" name="name" value={name} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
                    </div>
                    <div className="input">
                        <input type="email" placeholder="Email" name="email" value={email} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
                    </div>
                    <div className="input">
                        <input type="password" placeholder="Password" name="password" value={password} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
                    </div>
                    <div className="input">
                        <input type="password" placeholder="Confirm password" name="password2" value={password2} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
                    </div>
                    <div className="input butn-register">
                        <input type="submit" value="Register" />
                    </div>
                </form>
                <p>Already have an account? <Link to="/login">Sign In</Link></p>

            </div>
        </section>
    )
}

Register.protoTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
}

export default connect(null, { setAlert, register })(Register)
