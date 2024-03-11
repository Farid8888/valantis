export  const objTrue =(itms)=>{
    for(let key in itms){
        if(!itms[key]) return false
        return true
    }
} 