import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import Alert from '../Alert';
import { getCurrentLearnings, postMylearning } from '../../actions/mylearnings';
import { connect } from 'react-redux';
import MylearningItem from './MylearningItem';
import Spinner from '../Spinner'

const Mylearnings = ({ mylearnings: { mylearnings, loading }, getCurrentLearnings, postMylearning }) => {

    useEffect(() => {
        getCurrentLearnings();
    }, [getCurrentLearnings,mylearnings]);

    const [topic, setTopic] = useState('');
    const onSubmit = (e) => {
        e.preventDefault();
        postMylearning(topic);
        setTopic('');
    }
    const inputItem = (
        <div className="mylearning-input" style={{ justifySelf: 'start' }}>
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

    return (

      loading || mylearnings===null? <Spinner />: <section id="intro-recommend">
            <div className="addNew">
                {inputItem}
            </div>
            <div className="cards-recommend">
                <div className="recommend-card">

                    {loading ? <Spinner />:<MylearningItem givenClass="l-card" />}

                </div>
            </div>
        </section>
    )
}

Mylearnings.propTypes = {
    postMylearning: PropTypes.func.isRequired,
    mylearnings: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    mylearnings: state.mylearnings
})

export default connect(mapStateToProps, { getCurrentLearnings, postMylearning })(Mylearnings)
