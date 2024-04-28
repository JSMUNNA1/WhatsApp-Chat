import { BASE_API_URL } from "../../Components/config/api";
import { CHECK_OTP, EMAIL_TYPE } from "./OtpActionType";

export const otpGenerated=(data1)=>async(dispatch)=>{

  try {
    const res=await fetch(`${BASE_API_URL}/auth/email`,{
         method:"POST",
         headers:{
          "Content-Type":"application/json",
       
   },
       body:JSON.stringify(data1.email)
    })
    const data = await res.json();
    console.log("email enter:,",data)
    dispatch({type:EMAIL_TYPE,payload:data})
 } catch (error) {
    console.log("Error in OtpGenerated",error)
 }
}


export const checkOtp=(data1)=> async(dispatch)=>{
     try{
      const res =await fetch(`${BASE_API_URL}/auth/otp`,{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
         
     },
          body:JSON.stringify(data1.otp)
      })
      const data=await res.json();
      console.log("OtpChecker=",data)
      dispatch({type:CHECK_OTP,payload:data});
     }catch(error){
      console.log("Error in checkOtp",error)
     }
}