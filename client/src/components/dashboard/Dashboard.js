import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentLearnings } from '../../actions/mylearnings';
import Spinner from '../Spinner';
import { postMylearning } from '../../actions/mylearnings';
import Alert from '../Alert';
import MylearningItem from '../mylearnings/MylearningItem'

const Dashboard = ({ getCurrentLearnings, auth: { user }, mylearnings: { mylearnings, loading }, postMylearning }) => {

    useEffect(() => {
        getCurrentLearnings();
    }, [getCurrentLearnings])

    const [topic, setTopic] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        postMylearning(topic);
    }

    const inputItem = (
        <div className="mylearning-input">
            <h1>You don't have any learnings. Add one</h1>
            <Alert />
            <form onSubmit={(e) => onSubmit(e)}>
                <div className="input">
                    <input style={{ color: '#c2c2c2', borderBottom: '1px solid #c2c2c2' }} type="text" name="topic" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Create a learning" />
                </div>
                <div className="input butn-register">
                    <input type="submit" value="Create" />
                </div>

            </form>
        </div>
    )


    return loading && mylearnings.length === 0 ? <Spinner /> :

        <section id="home">
            <div class="home-intro">
                <div class="heading-box">
                    <h1>Organize your things here</h1>
                    <p>Have clarity in learning and managing things</p>
                </div>
            </div>
            <div class="home-mylearnings">
                <h3>Welcome {user && user.name} My learnings</h3>
                <div class="mylearning-cards" style={mylearnings.length === 0 ? { justifyContent: 'center' } : {}}>
                    {mylearnings.length === 0 && inputItem}
                    <MylearningItem givenClass="mycard" />
                </div>
            </div>
        </section>

}

Dashboard.propTypes = {
    getCurrentLearnings: PropTypes.func.isRequired,
    postMylearning: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    mylearnings: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    mylearnings: state.mylearnings,
    auth: state.auth,

})

export default connect(mapStateToProps, { getCurrentLearnings, postMylearning })(Dashboard);
