import React, { Fragment,useState,useEffect,useRef } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { logout } from '../actions/auth';

const Navbar = ({ logout, auth: { isAuthenticated, loading } }) => {
    
    useEffect(()=>{
        document.body.addEventListener('click',(event)=>{
            if(ref.current.contains(event.target)){
                return;
            }
            setShowing(false);
         })
    },[]);
    const [isShowing,setShowing] = useState(false);
    const ref = useRef();
    


    const authLinks = (
        <ul className={`nav-ul ${isShowing ? 'show':''}`} onClick={()=>setShowing(!isShowing)}>
            <li ><Link to="/home">Home</Link></li>
            <li ><Link to="#!">Recommended</Link></li>
            <li ><Link to="/mylearning">My learnings</Link></li>
            <li ><Link onClick={logout} to="#!">Logout</Link></li>
        </ul>

    );
    const guestLinks = (
        <ul className={`nav-ul ${isShowing ? 'show':''}`} onClick={()=>setShowing(!isShowing)}>
            <li ><Link to="/recommended" >Recommended</Link></li>
            <li ><Link to="/login">Login</Link></li>
            <li ><Link to="/register" className="start">Get Started</Link></li>
        </ul>
    )

    return (
        <header>
            <nav className="navbar">
                <div className="logo">
                    <h1><Link to="/" style={{ fontSize: '1.5rem' }}>LearnStore</Link></h1>
                </div>
                {!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
            </nav>
            <div ref={ref} onClick={() => setShowing(!isShowing)} className={`lines ${isShowing ? 'close':''}`}>
                <div className="btn-line line-1"></div>
                <div className="btn-line line-2"></div>
                <div className="btn-line line-3"></div>
            </div>
        </header>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar);
