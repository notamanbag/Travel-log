const API_URL = 'http://localhost:3000';

export async function logEntry (){
    const respnse = await fetch(`${API_URL}/api/logs`);
    return  respnse.json() 


}
export async function createEntry (entry){
    const respnse = await fetch(`${API_URL}/api/logs`,{
        method :'POST',
        headers : {
            'content-type' :'application/json',
            
        },
        body:JSON.stringify(entry)
    });
    console.log(respnse);
    return  respnse.json() 


}