import React from "react";

const AppContext = React.createContext({
    websocket:null
})

export function AppContextProvider(props){
    const websocket = null;
    const value = {
        websocket:websocket
    }
    
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    ) 
}

export default AppContext;