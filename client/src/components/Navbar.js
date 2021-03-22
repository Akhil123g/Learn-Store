import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
    let isShowing = false;
    const clickme = () => {
        const menuBtn = document.querySelector('.lines');
        const navUl = document.querySelector('.nav-ul');

        if (!isShowing) {
            menuBtn.classList.add('close');
            navUl.classList.add('show');
            isShowing = true;
        }
        else {
            menuBtn.classList.remove('close');
            navUl.classList.remove('show');
            isShowing = false;
        }


    }
    return (
        <header>
            <nav className="navbar">
                <div className="logo">
                    <h1>LearnStore</h1>
                </div>
                <ul className="nav-ul">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/recommended">Recommended</Link></li>
                    <li><Link to="/mylearning">My learnings</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register" className="start">Get Started</Link></li>
                </ul>
            </nav>
            <div onClick={() => clickme()} className="lines">
                <div className="btn-line line-1"></div>
                <div className="btn-line line-2"></div>
                <div className="btn-line line-3"></div>
            </div>
        </header>
    )
}

export default Navbar
