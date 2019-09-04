let str = "qwertyuiopasdfghjklzxcvbnm";

function is_unque(str){
    let topildi = true;
    for(let i = 0; i < str.length; i++){
        
            for(let j = i+1; j < str.length; j++){
                if(str[i] == str[j]){
                    topildi = false;
                }
            }
    }
    return topildi;
}

let a = is_unque(str);
console.log(a);