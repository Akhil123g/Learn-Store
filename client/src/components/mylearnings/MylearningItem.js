import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

const MylearningItem = ({ mylearnings: { mylearnings, loading }, givenClass }) => {
    return (
        mylearnings.length !== 0 &&
        mylearnings.map(mylearning => {
            return <Link to={`/mylearning/${mylearning._id}`} style={{ textDecoration: 'none', color: '#0b0c10' }}><div key={mylearning._id} className={givenClass + " card-1"}> <h2>{mylearning.topic}</h2></div></Link>
        })


    )
}

MylearningItem.propTypes = {
    mylearnings: PropTypes.object.isRequired,
    givenClass: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
    mylearnings: state.mylearnings
})

export default connect(mapStateToProps)(MylearningItem)
