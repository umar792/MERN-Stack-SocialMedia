const userreducer = (state , action)=>{
    switch (action.type) {
        case "USER_LOGIN_LOAD":
            return{
                ...state,
                loading : true,
                isAuthanticated : false
            }
        case "USER_LOGIN_LOAD_FAIL":
            return{
                ...state,
                loading : false,
                isAuthanticated : false
            }
            case "USER_LOGIN_SUCCESS" : 
            return {
                ...state,
                loading : false,
                isAuthanticated : true
            }
            case "USER_LOGIN_ERROR" : 
            return {
                ...state,
                loading : false,
                isAuthanticated : false,
                Error : action.payload
            }
            
            // ------------- profile 
            case "MY_PROFILE_LOAD":
            return{
                ...state,
                loading : true,
                // isAuthanticated : false,
            }
            case "MY_PROFILE_LOAD_FALI":
            return{
                ...state,
                loading : false,
                // isAuthanticated : false,
            }
            case "MY_PROFILE_SUCCESS" : 
            return {
                ...state,
                loading : false,
                user : action.payload,
                // isAuthanticated : true,
            }
            case "MY_PROFILE_ERROR" : 
            return {
                ...state,
                loading : false,
                // isAuthanticated : false,
                Error : action.payload
            }

            // ------------- alluser 

            case "ALL_USER_DATA_LOAD":
            return{
                ...state,
                loading : true
            }
            case "ALL_USER_DATA_LOAD_FAIL":
            return{
                ...state,
                loading : false
            }
            case "ALL_USER_DATA_SUCCESS" : 
            return {
                ...state,
                loading : false,
                Alluser : action.payload,
            }
            case "ALL_USER_DATA_ERROR" : 
            return {
                ...state,
                loading : false,
                Error : action.payload
            }
            // -------------  

            case "FOLLOWING_USER_POST_DATA_LOAD":
            return{
                ...state,
                // loading : true
            }
            case "FOLLOWING_USER_POST_DATA_LOAD_FAIL":
            return{
                ...state,
                // loading : false
            }
            case "FOLLOWING_USER_POST_DATA_SUCCESS" : 
            return {
                ...state,
                // loading : false,
                posts : action.payload,
            }
            case "FOLLOWING_USER_POST_DATA_ERROR" : 
            return {
                ...state,
                // loading : false,
                Error : action.payload
            }

            //  -------------  LIKE_DISLIKE_LOAD

             case "LIKE_DISLIKE_LOAD":
                return{
                    ...state,
                    // loading : true
                }
                case "LIKE_DISLIKE_LOAD_FAIL":
                return{
                    ...state,
                    // loading : false
                }
                case "LIKE_DISLIKE_SUCCESS" : 
                return {
                    ...state,
                    // loading : false,
                }
                case "LIKE_DISLIKE_FAIL" : 
                return {
                    ...state,
                    // loading : false,
                    Error : action.payload
                }
            //  -------------  COMMENT_POST_LOAD

             case "COMMENT_POST_LOAD":
                return{
                    ...state,
                    // loading : true
                }
                case "COMMENT_POST_LOAD_FAIL":
                return{
                    ...state,
                    // loading : false
                }
                case "COMMENT_POST_SUCCESS" : 
                return {
                    ...state,
                    // loading : false,
                }
                case "COMMENT_POST_FAIL" : 
                return {
                    ...state,
                    // loading : false,
                    Error : action.payload
                }
            //  -------------  MY_POST_LOAD

             case "MY_POST_LOAD":
                return{
                    ...state,
                    // loading : true
                }
                case "MY_POST_LOAD_FAIL":
                return{
                    ...state,
                    // loading : false
                }
                case "MY_POST_SUCCESS" : 
                return {
                    ...state,
                    // loading : false,
                    mypostsdata : action.payload
                }
                case "MY_POST_FAIL" : 
                return {
                    ...state,
                    // loading : false,
                    Error : action.payload
                }
    
        default: 
        return state
    }
}

export default userreducer;