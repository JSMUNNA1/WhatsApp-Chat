import { CHECK_OTP, EMAIL_TYPE } from "./OtpActionType";

 const initialValue={
           email:null,
           otp:null
 }
export const otpReducer=(store=initialValue,{type,payload})=>{
  switch (type) {
    case EMAIL_TYPE:
        return {  email: payload };
    case CHECK_OTP:
        return {  otp: payload };
    
    default:
        return store;
}

}