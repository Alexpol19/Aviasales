import { ticketsAPI } from "../api/api"

const inintialState = {
    initialized: false,
    searchId: null,
    tickets: [],
    filters: {
        noTransfers: false,
        transfer: false,
        twoTransfers: false,
        threeTransfers: false
    },
    sortBy: 'cost', // or speed
}

const tickets = (state = inintialState, action) => {
    switch(action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true,
            }
        case SET_SORT:
            return {
                ...state,
                sortBy: action.text,
            }
        case SET_FILTERS:
            return {
                ...state,
                filters: {...action.filters},
            }
        case SET_SEARCHID:
            return {
                ...state,
                searchId: action.id,
            }
        case SET_TICKETS:
            return {
                ...state,
                tickets: [...state.tickets, ...action.tickets],
            }
        default:
            return state;
    }
}

// types
const SET_INITIALIZED = "SET_INITIALIZED";
const SET_SORT = "SET_SORT";
const SET_FILTERS = "SET_FILTERS";
const SET_SEARCHID = "SET_SEARCHID";
const SET_TICKETS = "SET_TICKETS";

// actionCreators
const setInitialized = () => {
    return{
        type: SET_INITIALIZED
    }
}
export const setSort = (text) => {
    return{
        type: SET_SORT,
        text
    }
}
export const setFilters = (filters) => {
    return{
        type: SET_FILTERS,
        filters
    }
}
const setSearchId = (id) => {
    return{
        type: SET_SEARCHID,
        id
    }
}
const setTickets = (tickets) => {
    return{
        type: SET_TICKETS,
        tickets
    }
}
// async
const getTickets = async (dispatch, searchId) =>{
    try{
        let res = await ticketsAPI.getTickets(searchId);
        dispatch(setTickets(res.data.tickets));
        if(!res.data.stop){ getTickets(dispatch, searchId)}
        else{ dispatch(setInitialized()); }
    }
    catch(error){
        getTickets(dispatch, searchId)
    }
}
export const initializeApp = () => async (dispatch) => {
    let data = await ticketsAPI.getSearchId();
    dispatch(setSearchId(data.searchId));
    getTickets(dispatch, data.searchId);  
}

export default tickets;