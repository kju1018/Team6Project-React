
const initState = {
    uid:"",
    autToken:""
}
const SET_UID = "auth/set_uid"
const SET_AuthToken = "auth/set_authtoken"
export const CreateSetUid =(uid) =>{
    return({
        type:SET_UID,
        uid
    })
}
export const CreateSetAuthToken =(authToken) =>{
    return({
        type:SET_AuthToken,
        authToken
    })
}
const authReducer=(state = initState,action)=> {
    switch(action.type){
        case SET_UID:
            return{
                ...state,
                uid:action.uid
            }
        case SET_AuthToken:
            return{
                ...state,
                authToken:action.authToken
            }
        default :
            return state
    }
}

export default authReducer;