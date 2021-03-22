import React, { Fragment } from 'react';
import { Link, Redirect } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Landing = ({ isAuthenticated }) => {
    if (isAuthenticated) {
        return <Redirect to="/home" />
    }
    return (
        <Fragment>
            <section id="intro-page">
                <div className="intro-box">
                    <h1 className="intro-heading">Organize what you want to learn...</h1>
                    <Link to="/register" className="get-started">Get Started</Link>
                </div>
            </section>
            <section id="cards-page">
                <div className="cards">
                    <div className="recommend">
                        <h2>View some of recommended topics.</h2>
                    </div>
                    <div className="recommend-cards">
                        <div className="card card-1">
                            <h1>Competitive programming</h1>
                        </div>
                        <div className="card card-2">
                            <h1>Dbms</h1>
                        </div>
                        <div className="card card-3">
                            <h1>OS</h1>
                        </div>
                        <div className="card card-2">
                            <h1>OS</h1>
                        </div>
                        <div className="card card-1">
                            <h1>OS</h1>
                        </div>
                        <div className="card card-2">
                            <h1>Dbms</h1>
                        </div>
                    </div>
                </div>
            </section>
            <section id="create-page">
                <div className="create-own">
                    <div className="create-headerdiv">
                        <h1 className="create-heading">Create your own topic store</h1>
                    </div>
                    <div className="stack-cards">
                        <div className="stack stack-1">
                            <h1>Topic 3</h1>
                        </div>
                        <div className="stack stack-2">
                            <h1>Topic 2</h1>
                        </div>
                        <div className="stack stack-3">
                            <h1>Topic 1</h1>
                        </div>

                    </div>
                </div>

            </section>
        </Fragment>
    )
}

Landing.propTypes = {
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing)
