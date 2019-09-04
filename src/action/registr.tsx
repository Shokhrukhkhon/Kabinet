import Axios from "axios";

export function SignUp(username: string, password: string, first_name: string, last_name:string, email:string){
    return(dispatch: any) => {
        return Axios.post("http://joylar.uz/api/user/signup", {
            username,
            password, 
            first: first_name, 
            last: last_name,
            email
        });
    }
}