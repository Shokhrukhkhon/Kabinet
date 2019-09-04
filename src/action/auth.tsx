import Axios from "axios";

export function changeAuth(is_auth: boolean, user:any, token:string){
    return {
        type: "CHANGE_AUTH",
        is_auth,
        user,
        token
    };
}

export function login(username: string, password: string){
    return (dispatch:any) => {
        return Axios.post("http://joylar.uz/api/user/login", {
            username,
            password
        }).then(function(response){
            if(response.data.status == "ok"){
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));

                dispatch(changeAuth(true, response.data.user, response.data.token));
            }

            return response; 
        })
    }
}