import { createStore , applyMiddleware ,combineReducers } from "redux";
import thunk from "redux-thunk";
import userReducer from './reducers/userReducer'
import flowersReducer from './reducers/flowersReducer'

const rootReducer = combineReducers({
  user: userReducer,
  flowers:flowersReducer
});


const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
};

export default configureStore;

