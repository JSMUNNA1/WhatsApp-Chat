import { BASE_API_URL } from "../../../Components/config/api";
import { CREATE_NEW_MESSAGE, GET_ALL_MESSAGE } from "./ActionTypeMess";

  //CREATE gROUP
  export const createmessage=(messData)=>async(dispatch)=>{
      console.log("createMessage:",messData)
    try {
       const res=await fetch(`${BASE_API_URL}/api/messages/create`,{
            method:"POST",
          headers:{
                 "Content-Type":"application/json",
              Authorization:`bearer ${messData.token}`
          },
          body:JSON.stringify(messData.data)
       })
       const data = await res.json();
       console.log("create message data,",data)
       dispatch({type:CREATE_NEW_MESSAGE,payload:data})
    } catch (error) {
       console.log("Error in messageCreate:",error)
    }

}

  //get messages
  export const getAllmessage=(reqData)=>async(dispatch)=>{
   console.log("Get All message,",reqData)
    try {
       const res=await fetch(`${BASE_API_URL}/api/messages/chat/${reqData.chatId}`,{
            method:"GET",
          headers:{
                 "Content-Type":"application/json",
              Authorization:`bearer ${reqData.token}`
          },
          
       })
       const data = await res.json();
       console.log("Get All message,",data)
       dispatch({type:GET_ALL_MESSAGE,payload:data})
    } catch (error) {
       console.log("Error in messageCreate:",error)
    }

}