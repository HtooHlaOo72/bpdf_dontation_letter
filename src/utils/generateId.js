export default function convertId(id){
    id=id+'';
    let len=(id.length<5)?5:10;
    while(id.length<len){
        id="0"+id;
    }
    return id;
}

