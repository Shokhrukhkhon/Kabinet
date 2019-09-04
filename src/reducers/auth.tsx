import Axios from "axios";

let initialState:any = {
    is_auth: false,
    token: null,
    user: null
}

export default (prevState: any = initialState, action: any) => {
    
    switch(action.type){
        case "CHANGE_AUTH":
        Axios.defaults.headers.common["Authorization"] = "Bearer "  + action.token;
            return {    
                is_auth: action.is_auth,
                token: action.token,
                user: action.user
            };
        case "LOGOUT": {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            return initialState;
        }
          
    }
    return prevState;
}