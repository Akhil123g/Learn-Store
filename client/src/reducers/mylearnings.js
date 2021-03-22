import {
    ADD_LEARNING,
    ADD_LINK,
    ADD_LEARNING_ERROR,
    CLEAR_PROFILE,
    GET_LEARNING,
    GET_LEARNINGS,
    LEARNINGS_ERROR,
    LEARNING_ERROR,
    LINK_ERROR,
    SET_SUBTOPIC,
    LOGOUT,
    ADD_SUBTOPIC,
    ADD_SUBTOPIC_ERROR,
    ADD_NOTES,
    NOTES_ERROR,
    DELETE_SUBTOPIC,
    DELETE_SUBTOPIC_ERROR,
    DELETE_LINK,
    DELETE_LINK_ERROR,
    LEARNING_DELETE
} from '../actions/types'
const initialState = {
    subtopic: null,
    mylearning: null,
    mylearnings: [],
    loading: true,
    error: null
}
// eslint-disable-next-line
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_LEARNINGS:
            return {
                ...state,
                subtopic:null,
                mylearnings: payload,
                loading: false,
            };
        case LEARNING_DELETE:
            return {
                ...state,
                subtopic:null,
                loading:false,
            };
        case LEARNINGS_ERROR:
            return {
                ...state,
                loading: false,
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                mylearnings: [],
                loading: false
            }
        case ADD_LEARNING:
            return {
                ...state,
                mylearnings: [payload, ...state.mylearnings],
                loading: false
            };
        case ADD_LEARNING_ERROR:
            return {
                ...state,
                loading: false
            };
        case GET_LEARNING:
            return {
                ...state,
                mylearning: payload.learning,
                subtopic: payload.subtopic,
                loading: false
            };
        case LEARNING_ERROR:
            return {
                ...state,
                error: payload.msg,
                loading: false
            };
        case ADD_LINK:
            return {
                ...state,
                subtopic: { ...state.subtopic, links: payload.links },
                loading: false
            };
        case LINK_ERROR:
            return {
                ...state,
                loading: false
            };
        case SET_SUBTOPIC:
            return {
                ...state,
                subtopic: payload.subtopic,
                mylearning: {
                    ...state.mylearning,
                    subtopics: state.mylearning.subtopics.map((item) => item._id === payload.id ? payload.subtopic : item)
                },
                loading: false
            }
        case LOGOUT:
            return {
                subtopic: null,
                mylearning: null,
                mylearnings: [],
                loading: false,
                error: null
            }
        case ADD_SUBTOPIC:
            return {
                ...state,
                subtopic: payload.subtopicsArray.find(item => item._id === payload.id),
                mylearning: {
                    ...state.mylearning,
                    subtopics: payload.subtopicsArray
                },
                loading: false
            }
        case NOTES_ERROR:
        case ADD_SUBTOPIC_ERROR:
            return {
                ...state,
                loading: false
            }
        case ADD_NOTES:
            return {
                ...state,
                subtopic: { ...state.subtopic, notes: payload },
                loading: false
            };
        case DELETE_SUBTOPIC:
            return{
                ...state,
                subtopic:null,
                mylearning:{...state.mylearning,subtopics:payload},
                loading:false
            }
        case DELETE_SUBTOPIC_ERROR:
        case DELETE_LINK_ERROR:
            return{
                ...state,
                loading:false
            }
        case DELETE_LINK:
            return{
                ...state,
                subtopic:{...state.subtopic,links:payload}
            }
        
        default:
            return state;
    }
}