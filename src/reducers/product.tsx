import Axios from "axios";

let initialState: any = {
   category: null
};

export default (prevState: any = initialState, action: any) => {
    switch(action.type){
        case "ADD_CATEGORY":
        return {
            title_uz: action.title_uz,
            title_ru: action.title_ru,
            title_en: action.title_en
        }

    }
    return prevState;
}
