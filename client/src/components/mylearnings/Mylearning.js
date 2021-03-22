import React, { useEffect, useState, Fragment } from 'react'
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getClickedLearning, postLink, setsubtopic, addsubtopic, addnotes,deletesubtopic,deletelink } from '../../actions/mylearnings';
import Spinner from '../Spinner';
import Alert from '../Alert';

const Mylearning = ({ getClickedLearning, mylearning, loading, match, postLink, subtopic, setsubtopic, addsubtopic, addnotes,deletesubtopic,deletelink }) => {

    

    useEffect(() => {
        getClickedLearning(match.params.id, subtopic);
    }, [getClickedLearning, match.params.id, subtopic]);
    useEffect(() => {
        if (subtopic && subtopic.notes) {
            setNotes(subtopic.notes);
        }
        else {
            setNotes('');
        }
    }, [subtopic])
    const onFormSubmit = e => {
        e.preventDefault();
        postLink(mylearning._id, subtopic._id, text);
        setText('');
    }
    const [text, setText] = useState('');
    const [subtopicname, setSubText] = useState('');
    const [notes, setNotes] = useState('');
    const onNotesSubmit = (e) => {
        e.preventDefault();
        addnotes(mylearning._id, subtopic._id, notes);
    }

    const onSubTopicClick = (item) => {
        setsubtopic(item);
        setShowsubtopic(!showsubtopic);
    }
    const onSubTopicSubmit = e => {
        e.preventDefault();
        addsubtopic(match.params.id, subtopicname);
        setSubText('');
    }

    const onRemoveSubtopicClick = () =>{
        deletesubtopic(mylearning._id,subtopic._id);
    }
const [showsubtopic,setShowsubtopic] = useState(false);
    // const onSubtopicCliked = () =>{
    //     const leftdiv = document.querySelector('.leftdiv');
    //     const rightdiv = document.querySelector('.rightdiv');
    //     if (!showsubtopic) {
    //          leftdiv.classList.add('show-subtopics');
    //             rightdiv.classList.add('move-aside');
    //         showsubtopic = true;
    //     } else {
    //          leftdiv.classList.remove('show-subtopics');
    //         rightdiv.classList.remove('move-aside');

    //         showsubtopic = false;
    //      }
    // }
    
    return loading || mylearning === null ? <Spinner /> : (
        <Fragment>
            {mylearning !== null && (<div className="topic">
            <div style={{display:'flex'}} className="sticky-header">
            <div class="subtopics" onClick={() =>setShowsubtopic(!showsubtopic)}><h4>subtopics</h4></div>
            <div className="more"><h4>More</h4></div>
            </div>
                <div className={`leftdiv ${showsubtopic?'show-subtopics':''}`}>
                    <div className="leftdivinner">
                        <div className="topicheading">
                            <h4>{mylearning.topic}</h4>
                        </div>
                        {mylearning !== null && mylearning.subtopics.map(item => {
                            return <p onClick={() => onSubTopicClick(item) } key={item._id} className={`${subtopic&&subtopic._id===item._id?'subtopic-active':''}`} style={{cursor:'pointer'}}>{item.subtopicname}</p>
                        })}
                        
                    </div>
                </div>
                <div className={`rightdiv ${showsubtopic ? 'move-aside':''}`}>
                    <div className="links">

                        <div className="linksstored">
                            {subtopic !== null && subtopic.links.length !== 0 && subtopic.links.map((link) => <p key={link._id} >{link.text}{' '}<span onClick={()=>deletelink(mylearning._id,subtopic._id,link._id)}>(delete)</span></p>)}
                        </div>
                        {
                            subtopic === null && <h1 style={{textAlign: 'center'}}>What are you waiting for, Go on!</h1>
                        }

                        {subtopic !== null && <form className="input-links" onSubmit={(e) => onFormSubmit(e)}>
                            <input type="text" name="text" value={text} onChange={(e) => setText(e.target.value)} placeholder={`Save a link here for ${subtopic.subtopicname}`} />
                            <input type="submit" className="butn-register" value="ADD" style={{ border: 'none', backgroundColor: 'orange', margin: '1rem 0' }} />
                        </form>}

                    </div>
                    {subtopic !== null && <div className="notes">
                        <form className="notes-text" onSubmit={(e) => onNotesSubmit(e)}>
                            <label for="note">Notes for {subtopic.subtopicname}</label>
                            <textarea name="notes" id="" cols="30" rows="10" value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
                            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                            
                            <input type="submit" value="Save" style={{marginTop:'1rem', backgroundColor:'orange'}} /><span style={{marginTop:'1rem'}}><Alert/></span>
                       </div>
                       
                        </form>
                        {/* <button className="delete_butn" onClick={()=>onRemoveSubtopicClick()}>Remove this subtopic</button> */}
                       
                    </div>}
                    <div style={{width:'60%'}}>
                    <form className="input-links" style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',marginTop:'2rem', width:'100%'}} onSubmit={(e) => onSubTopicSubmit(e)}>
                            <input type="text" name="subtopicname" value={subtopicname} onChange={(e) => setSubText(e.target.value)} placeholder="Add a subtopic" style={{ backgroundColor: 'transparent',color:'#fff' }} />
                            <input type="submit" className="butn-register" value="ADD" style={{ border: 'none', backgroundColor: 'orange', margin: '1rem 0' }} />
                        </form>
                    </div>
                </div>
            </div>)}

        </Fragment>

    )
}

Mylearning.propTypes = {
    mylearning: PropTypes.object,
    getClickedLearning: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    postLink: PropTypes.func.isRequired,
    subtopic: PropTypes.object,
    setsubtopic: PropTypes.func.isRequired,
    addsubtopic: PropTypes.func.isRequired,
    addnotes: PropTypes.func.isRequired,
    deletesubtopic:PropTypes.func.isRequired,
    deletelink:PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
    mylearning: state.mylearnings.mylearning,
    loading: state.mylearnings.loading,
    subtopic: state.mylearnings.subtopic
});

export default connect(mapStateToProps, { getClickedLearning, postLink, setsubtopic, addsubtopic, addnotes,deletesubtopic,deletelink })(Mylearning);
