import axios from 'axios';

import { setAlert } from './alert';

import {
    ADD_LEARNING,
    ADD_LEARNING_ERROR,
    GET_LEARNING,
    GET_LEARNINGS,
    LEARNINGS_ERROR,
    LEARNING_ERROR,
    ADD_LINK,
    LINK_ERROR,
    SET_SUBTOPIC,
    ADD_SUBTOPIC,
    ADD_SUBTOPIC_ERROR,
    ADD_NOTES,
    NOTES_ERROR,
    DELETE_SUBTOPIC,
    DELETE_SUBTOPIC_ERROR,
    DELETE_LINK,
    DELETE_LINK_ERROR
} from './types';


export const getCurrentLearnings = () => async dispatch => {
    try {
        const res = await axios.get('/api/mylearnings');
        dispatch({
            type: GET_LEARNINGS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: LEARNINGS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const postMylearning = (topic) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ topic });
    try {
        const res = await axios.post('/api/mylearnings', body, config);
        dispatch({ type: ADD_LEARNING, payload: res.data });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: ADD_LEARNING_ERROR
        })
    }
}

export const getClickedLearning = (id, subtopic) => async dispatch => {
    try {
        const res = await axios.get(`/api/mylearnings/${id}`);
        dispatch({ type: GET_LEARNING, payload: { learning: res.data, subtopic: subtopic } });
    } catch (err) {
        dispatch({ type: LEARNING_ERROR })
    }
}

export const postLink = (learningId, subtopicId, text) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ text });
    try {
        const res = await axios.post(`/api/mylearnings/links/${learningId}/${subtopicId}`, body, config);
        dispatch({ type: ADD_LINK, payload: { id: subtopicId, links: res.data } });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'success')))
        }
        dispatch({ type: LINK_ERROR });

    }
};

export const setsubtopic = (item) => async dispatch => {
    dispatch({ type: SET_SUBTOPIC, payload: { id: item._id, subtopic: item } });
}

export const addsubtopic = (id, subtopicname) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ subtopicname });

    try {
        const res = await axios.post(`/api/mylearnings/subtopic/${id}`, body, config);
        dispatch({ type: ADD_SUBTOPIC, payload: { id: res.data.id, subtopicsArray: res.data.subtopicsArray } });
    } catch (err) {
        dispatch({ type: ADD_SUBTOPIC_ERROR });
    }
};

export const addnotes = (learningId, subtopicId, notes) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ notes });
    try {
        const res = await axios.put(`/api/mylearnings/notes/${learningId}/${subtopicId}`, body, config);
        dispatch({ type: ADD_NOTES, payload: res.data });
        dispatch(setAlert('✅','',300));
    } catch (err) {
        dispatch({ type: NOTES_ERROR });
    }
}
export const deletesubtopic = (learningId,subtopicId) => async dispatch =>{
    try {
        const res = await axios.delete(`/api/mylearnings/subtopic/${learningId}/${subtopicId}`);
        dispatch({type:DELETE_SUBTOPIC,payload:res.data});
    } catch (err) {
        dispatch({type:DELETE_SUBTOPIC_ERROR});
    }
}

export const deletelink = (learningId,subtopicId,linkId) => async dispatch =>{
    try {
        const res = await axios.delete(`/api/mylearnings/links/${learningId}/${subtopicId}/${linkId}`);
        dispatch({type:DELETE_LINK,payload:res.data})
    } catch (err) {
        dispatch({type:DELETE_LINK_ERROR})
    }
}