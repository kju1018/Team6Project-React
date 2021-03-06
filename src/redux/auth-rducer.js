
const initState = {
    userid:"",
    role_authority:"",
    authToken:"",
    codenumber:"",
    username:""
}
const SET_USERID = "auth/set_userid"
const SET_AuthToken = "auth/set_authtoken"
const SET_CodeNumber = "auth/set_codenumber"
const SET_Authority = "auth/set_role_authority"
const SET_UserName = "auth/set_username"

export const createSetUseridAction = (userid) => {
    return { type:SET_USERID, userid}
}
export const createSetAuthTokenAction = (authToken) => {
    return {type:SET_AuthToken, authToken}
}

export const createSetCodeNumberAction = (codenumber) => {
    return {type:SET_CodeNumber, codenumber}
}

export const createSetRoleAuthority = (authority) => {
    return {type:SET_Authority, authority}
}

export const createSetUserName = (userName) => {
    return {type:SET_UserName, userName}
}

const authReducer=(state = initState,action)=> {
    switch(action.type){
        case SET_USERID:
            return {
                ...state,
                userid:action.userid
            }
        case SET_AuthToken:
            return {
                ...state,
                authToken:action.authToken
            }
        case SET_CodeNumber:
            return {
                ...state,
                codenumber:action.codenumber
            }
        case SET_Authority:
            return {
                ...state,
                role_authority:action.authority
            }
        case SET_UserName:
            return {
                ...state,
                username:action.userName
            }
        default :
            return state
    }
}

export default authReducer;