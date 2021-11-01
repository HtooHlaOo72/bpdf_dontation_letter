export default function generateId(dataArray){
    dataArray=dataArray.map((data)=>{
        data.serialNo=Number(data.serialNo);
        return data;
    });
    let greatest=dataArray.reduce((primary,next)=>{return (primary.serialNo>next.serialNo)?primary:next;},{serialNo:0})
    let id=((greatest.serialNo+1)+"");
    let len=(id.length<5)?5:10;
    while(id.length<len){
        id="0"+id;
    }
    return id;
}

