import {  createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducer/UserReducer";
import {toast} from "react-toastify"


const UserContext = createContext();


const initialValur = {
    loading : false,
    Erroe : {},
    user : {},
    Alluser:[],
    posts : [],
    isAuthanticated : false,
    mypostsdata : []

}

const UserContextProvider = ({children}) =>{
    
    const [state , dispatch] = useReducer(reducer , initialValur);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          state.isAuthanticated=true;
        }
      }, []);

    const UserLogin = async(email , password,navigate)=>{
        try {
            dispatch({type:"USER_LOGIN_LOAD"});

        const res = await fetch("http://localhost:4000/login",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                email , password
            })
        });
        dispatch({type:"USER_LOGIN_LOAD_FAIL"});
        const data = await res.json();
       
        if(res.status === 400 || !data){
            return toast.error(data.message)
        }else{
            toast.success(data.message)
            localStorage.setItem("token" , data.Token)
            navigate("/")
        }
        dispatch({type : "USER_LOGIN_SUCCESS"})
        } catch (error) {
            dispatch({type : "USER_LOGIN_ERROR" , payload : error.message })
        }
        
    };

    // ------------ profile 

    const myprofile = async()=>{
        try {
            dispatch({type:"MY_PROFILE_LOAD"});

        const res = await fetch("http://localhost:4000/me",{
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                token : localStorage.getItem("token")
            },
        });
        dispatch({type:"MY_PROFILE_LOAD_FALI"});
        const data = await res.json();
        if(res.status === 400 || !data){
            return   console.log ("error")
        }else{
            // console.log("success");
        }
        dispatch({type : "MY_PROFILE_SUCCESS", payload:data.user})
        } catch (error) {
            dispatch({type : "MY_PROFILE_ERROR" , payload : error.message })
        }
        
    };
    // ------------ allusers 

    const allusersdata = async()=>{
        try {
            dispatch({type:"ALL_USER_DATA_LOAD"});

        const res = await fetch("http://localhost:4000/allusers",{
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
            },
        });
        dispatch({type:"ALL_USER_DATA_LOAD_FAIL"});
        const data = await res.json();
        if(res.status === 400 || !data){
            return   console.log ("error")
        }else{
            // console.log("success");
        }
        dispatch({type : "ALL_USER_DATA_SUCCESS", payload:data.users})
        } catch (error) {
            dispatch({type : "ALL_USER_DATA_ERROR" , payload : error.message })
        }
        
    };


    // ------------ followingpost 

    const followingpost = async()=>{
        try {
            dispatch({type:"FOLLOWING_USER_POST_DATA_LOAD"});

        const res = await fetch("http://localhost:4000/followingpost",{
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                token : localStorage.getItem("token")
            },
        });
        dispatch({type:"FOLLOWING_USER_POST_DATA_LOAD_FAIL"});
        const data = await res.json();
        if(res.status === 400 || !data){
            return   console.log (data.error)
        }else{
            // console.log("success");
        }
        dispatch({type : "FOLLOWING_USER_POST_DATA_SUCCESS", payload:data.posts})
        } catch (error) {
            dispatch({type : "FOLLOWING_USER_POST_DATA_ERROR" , payload : error.message })
        }
        
    };

    // ------------ likepost

    const likeDISLIKEpost = async(id)=>{
        try {
            dispatch({type:"LIKE_DISLIKE_LOAD"});

        const res = await fetch(`http://localhost:4000/likedislike/${id}`,{
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                token : localStorage.getItem("token")
            },
        });
        dispatch({type:"LIKE_DISLIKE_LOAD_FAIL"});
        const data = await res.json();
        if(res.status === 400 || !data){
            return   console.log (data.error)
        }else{
            toast.success(data.message)
        }
        dispatch({type : "LIKE_DISLIKE_SUCCESS"})
        } catch (error) {
            dispatch({type : "LIKE_DISLIKE_FAIL" , payload : error.message })
        }
        
    };
    // ------------ comment

    const commentonpost = async(comment,id)=>{
        try {
            dispatch({type:"COMMENT_POST_LOAD"});

        const res = await fetch(`http://localhost:4000/addcomment/${id}`,{
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                token : localStorage.getItem("token")
            },
            body : JSON.stringify({comment})
        });
        dispatch({type:"COMMENT_POST_LOAD_FAIL"});
        const data = await res.json();
        if(res.status === 400 || !data){
            return   console.log (data.error)
        }else{
            toast.success(data.message)
        }
        dispatch({type : "COMMENT_POST_SUCCESS"})
        } catch (error) {
            dispatch({type : "COMMENT_POST_FAIL" , payload : error.message })
        }
        
    };

    // --------------- deletecomment
    const deletecomment = async(commentid,id)=>{
        try {
            dispatch({type:"deletecomment_LOAD"});

        const res = await fetch(`http://localhost:4000/deletecomment/${id}`,{
            method : "delete",
            headers : {
                "Content-Type" : "application/json",
                token : localStorage.getItem("token")
            },
            body : JSON.stringify({commentid})
        });
        dispatch({type:"deletecomment_LOAD_FAIL"});
        const data = await res.json();
        if(res.status === 400 || !data){
            return  toast.error(data.message)
        }else{
            toast.success(data.message)
        }
        dispatch({type : "deletecomment_SUCCESS"})
        } catch (error) {
            dispatch({type : "deletecomment_FAIL" , payload : error.message })
        }
        
    };
    // --------------- Myposts
    const Myposts = async()=>{
        try {
            dispatch({type:"MY_POST_LOAD"});

        const res = await fetch(`http://localhost:4000/mypost`,{
            method : "get",
            headers : {
                "Content-Type" : "application/json",
                token : localStorage.getItem("token")
            },
        });
        dispatch({type:"MY_POST_LOAD_FAIL"});
        const data = await res.json();
        if(res.status === 400 || !data){
            return  console.log(data)
        }else{
            console.log(data)
        }
        dispatch({type : "MY_POST_SUCCESS" , payload : data.posts})
        } catch (error) {
            dispatch({type : "MY_POST_FAIL" , payload : error.message })
        }
        
    };




    return <UserContext.Provider value={{...state,UserLogin,myprofile,Myposts,deletecomment,allusersdata,followingpost,likeDISLIKEpost,commentonpost}}>{children}</UserContext.Provider>
}


const useUserContextApi = ()=>{
  return useContext(UserContext)
}

export {UserContext, UserContextProvider, useUserContextApi}