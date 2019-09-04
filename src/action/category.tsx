import Axios from "axios";

export function getCategoryList(){
    return (dispatch: any) => {
        return Axios.get("http://joylar.uz/api/category").then((response) => {
           return response.data; 
        });
    }
}

export function LogOut(){
    return {
        type: "LOGOUT"
    }
}

export function LogOutList(){
    return (dispatch: any) => {
        dispatch(LogOut());
    }
}

export function postCategoryList(title_uz: string, title_ru: string, title_en: string){
    return(dispatch: any) => {
         Axios.post("http://joylar.uz/api/category/create", {
            title_uz,
            title_ru,
            title_en
        }).then((response) => {

        });
    }
}