import { CREATE_NEW_MESSAGE, GET_ALL_MESSAGE } from "./ActionTypeMess"; // Corrected ActionTypeMess to ActionTypeMessage

const initialState = {
   messages: [],
   newMessages: null
};

export const messageReducer = (state = initialState, { type, payload }) => {
   switch (type) {
      case CREATE_NEW_MESSAGE:
         return { ...state, newMessages: payload };
      case GET_ALL_MESSAGE:
         return { ...state, messages: payload }; // Corrected 'Messages' to 'messages'
      default:
         return state;
   }
};
