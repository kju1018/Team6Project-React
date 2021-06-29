
const initState = {
    websocket:null,
}
const SET_WEBSOCKET = "websocket/set_websocket"
export const CreateSetWebSocket =(websocket) =>{
    return({
        type:SET_WEBSOCKET,
        websocket
    })
}
const websocketReducer=(state = initState,action)=> {
    switch(action.type){
        case SET_WEBSOCKET:
            return{
                ...state,
                websocket:action.websocket
            }
        default :
            return state
    }
}

export default websocketReducer;