import { BASE_API_URL } from "../../../Components/config/api"
import { CREATE_CHAT, CREATE_GROUP, GET_USERS_CHATS } from "./ActionChatType";

export const createChat=(chatData)=>async(dispatch)=>{
     console.log(chatData ,"in chateCreate");
     try {
        const res=await fetch(`${BASE_API_URL}/api/chats/single`,{
             method:"POST",
           headers:{
                  "Content-Type":"application/json",
               Authorization:`bearer ${chatData.token}`
           },
           body:JSON.stringify(chatData.userId)
        })
        const data = await res.json();
        console.log("create Chat:,",data)
        dispatch({type:CREATE_CHAT,payload:data})
     } catch (error) {
        console.log("Error in CreateChat",error)
     }

}
   //CREATE gROUP cHAt
export const createGroupChat=(chatData)=>async(dispatch)=>{

     try {
        const res=await fetch(`${BASE_API_URL}/api/chats/group`,{
             method:"POST",
           headers:{
                  "Content-Type":"application/json",
               Authorization:`bearer ${chatData.token}`
           },
           body:JSON.stringify(chatData.group)
        })
        const data = await res.json();
        console.log("create GROUP,",data)
        dispatch({type:CREATE_GROUP,payload:data})
     } catch (error) {
        console.log("Error in CreateGroup",error)
     }

}
   //create UserChat
export const getUserChat=(chatData)=>async(dispatch)=>{

     try {
        const res=await fetch(`${BASE_API_URL}/api/chats/users`,{
             method:"GET",
           headers:{
                  "Content-Type":"application/json",
               Authorization:`bearer ${chatData.token}`
           },
           
        })
        const data = await res.json();
        console.log("create userChat,",data)
        dispatch({type:GET_USERS_CHATS,payload:data})
     } catch (error) {
        console.log("Error in User Chats",error)
     }

}