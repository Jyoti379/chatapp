let groupid;
let usergroup=[];


const btn=document.getElementById('btn');
btn.addEventListener('onclick',()=>{
    window.location.href=`./chatscreen/chatscreen.html?groupId=${groupid}`
})

function userintogrp(event){
    event.preventDefault();
    const username=event.target.username.value;
    const groupId=event.target.groupId.value;
    console.log(username) ;
    
   
 const obj={
        username,groupId
    }
   /* const users=JSON.parse(localStorage.getItem('userlogin'));
    console.log(users) ;

    const token = localStorage.getItem('token')
    const decodedToken = parseJwt(token);

    const currentuser=decodedToken.name
    for(var i=0;i<users.length;i++){
        if(currentuser==users[i]){
         console.log('same')
         localStorage.removeItem(users[i])
        }
    }*/
   // localStorage.removeItem('userlogin')
 
    
 axios.post(`http://localhost:3000/group/addUser`,obj)
    .then(res=>{
       
        console.log(res)
       console.log(res.data.users)
      const userdata=res.data.users
      console.log(userdata)
          
    localStorage.setItem(`groupId-${groupId}`,JSON.stringify(userdata))
   window.location.href=`../chatGroup/chatgroup.html?username=${username}&&groupId=${groupid}`  
      
    })
  //
   
}



window.addEventListener('DOMContentLoaded',()=>{
    const urlParams=new URLSearchParams(location.search)
    for(const [key,value] of urlParams){
       console.log(`${key}:${value}`)
        groupid= `${value}`;
        console.log(groupid)
      
       
       
    }  


    const input=document.getElementById('groupId') 
    input.value=groupid;
  
   
})

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload);
  }



