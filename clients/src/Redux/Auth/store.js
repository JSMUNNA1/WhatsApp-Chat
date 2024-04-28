import { applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {thunk} from 'redux-thunk'; // Assuming `thunk` is the default export from 'redux-thunk'
import {authReducer} from './Reducer';
import { chatReducer } from './Chat/ReducerChat';
import { messageReducer } from './message/ReducerMess';
import { otpReducer } from '../Otp/OtpReducer';


// Define your reducers here
const rootReducer = combineReducers({
      auth:authReducer,
      chat:chatReducer,
      message:messageReducer,
      otp:otpReducer
});

// Create your Redux store
export  const store = legacy_createStore(rootReducer, applyMiddleware(thunk));



