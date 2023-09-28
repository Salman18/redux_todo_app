import { createStore, combineReducers, applyMiddleware } from "redux";
import todosReducer from "../reducers/index";
import logger from "redux-logger";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  todos: todosReducer,
});

export const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(logger, thunk));
};

// const store = createStore(combineReducers({
//     todos: todosReducer
// }));
