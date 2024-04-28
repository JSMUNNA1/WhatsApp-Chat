import { BASE_API_URL } from "../../Components/config/api"; 
import {LOGIN, LOGOUT, REGISTER, REQ_USER, SEARCH_USER, UPDATE_USER} from "../Auth/Actiontype"
     
//register the User
export const register=(data)=> async (dispatch)=>{
        try{
          const res=await fetch(`${BASE_API_URL}/auth/signup`,{
             method:"POST",
             headers:{
              'content-type':"application/json",
             },
             body:JSON.stringify(data)
          })
          const resData=await res.json();
          console.log(resData ,"json Data")
          dispatch({type:REGISTER,payload:resData})
          if(resData.jwt)localStorage.setItem("token",resData.jwt);
          
        }catch(e){
                 console.log("Error in Register",e);
        }


}
   //signin the User
export const signin=(data)=> async (dispatch)=>{
        try{
          const res=await fetch(`${BASE_API_URL}/auth/signin`,{
             method:"POST",
             headers:{
              'content-type':"application/json",
             },
             body:JSON.stringify(data)
          })
          const resData=await res.json();
          console.log(resData ,"json Data")

           dispatch({type:LOGIN,payload:resData})
           if(resData.jwt)localStorage.setItem("token",resData.jwt);
        }catch(e){
                 console.log("Error in signin",e);
        }


}
   ///current User 
export const currUser=(token)=> async (dispatch)=>{
       console.log("currentUser",token)
        try{
          const res=await fetch(`${BASE_API_URL}/api/users/profile`,{
             method:"GET",
             headers:{
              'content-type':"application/json",
                Authorization: `Bearer ${token}`

             },
             
          })
          const resData=await res.json();
          console.log(resData ,"json current Data")

           dispatch({type:REQ_USER,payload:resData})
        }catch(e){
                 console.log("Error in REQ_user",e);
        }


}
    //search User
export const searchUser=(data)=> async (dispatch)=>{
     console.log("in searchUser",data);
        try{
         const res=await fetch(`${BASE_API_URL}/api/users/${data.keyword}`,{
         //  const res=await fetch(`http://localhost:5050/api/users/i`,{
             method:"GET",
             headers:{
              'content-type':"application/json",
               //  Authorization: `Bearer ${data.token}`

             },
             
          })
          const resData=await res.json();
          console.log(resData ,"json in search Data")

           dispatch({type:SEARCH_USER,payload:resData})
        }catch(e){
                 console.log("Error in Serch_user",e);
        }


}
    //updateUser
    export const updateUser = (data) => async (dispatch) => {
      console.log("in updateUser",data);
  
      try {
        const res = await fetch(`${BASE_API_URL}/api/users/update`, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data.token}`
          },
          body:JSON.stringify(data.data)
        });
          const resData=await res.json();
          console.log(resData ,"json Data")

           dispatch({type:UPDATE_USER,payload:resData})
        }catch(e){
                 console.log("Error in REQ_user",e);
        }


}
   //LogOut 

   export const LogOutAction=()=>async(dispatch)=>{
            localStorage.removeItem("token");
            dispatch({type:REQ_USER,payload:null})
             dispatch({type:LOGOUT,payload:null})
            

   }