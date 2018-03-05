export function urlParse(){
    if(window.location.search){
        let url1=window.location.search;
    let reg=/[?&]\w+=\w+/g;
    let arr=url1.match(reg)
    let obj={}
     // ['?id=123454','&a=b']
   arr.forEach((ee)=>{
       let arr1= ee.substring(1).split("=")
       let key=arr1[0]
       let val=arr1[1]
       obj[key]=val
   })
   return obj
    }
    
   return {id:12345}
}