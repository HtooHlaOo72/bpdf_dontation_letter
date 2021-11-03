export default function convertId(id){
    
    let len=(id<5)?5:10;
    while(id.length<len){
        id="0"+id;
    }
    return id;
}

