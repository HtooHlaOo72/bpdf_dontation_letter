export async function authenticate(){
    let isAuth=false;
    let timeout=setTimeout(()=>{
        isAuth=true;
    },3000);
    return isAuth;
}