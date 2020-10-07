import tickets from "./tickets";
import thunkMiddleware from 'redux-thunk';

const { createStore, combineReducers, applyMiddleware, compose} = require("redux");

let reducers = combineReducers({
    tickets,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunkMiddleware)
));

export default store;