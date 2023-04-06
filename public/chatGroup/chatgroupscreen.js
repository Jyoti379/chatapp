var removeduser=[];
var upload_image="";
const image_input=document.querySelector('#image_input');

var upload_image="";
image_input.addEventListener('change',function(){
   // console.log(image_input.value.replace("C:\\fakepath\\",""));
    upload_image=image_input.value.replace("C:\\fakepath\\","")
})

async function userMessage(event) {
    try {

        event.preventDefault();
        const token = localStorage.getItem('token');
        const decodedToken = parseJwt(token);
        
       let paramsVal=[]
        //to access the query param
        const urlParams=new URLSearchParams(location.search)
        for(const [key,value] of urlParams){
           console.log(`${key}:${value}`)
           urlVal = `${value}`;
           paramsVal.push(urlVal)
            console.log(urlVal);
           
           
        }
        const msg = event.target.message.value;
        const Imagefile=upload_image;
        const username = decodedToken.name;
        const groupId=paramsVal[1];    
  
      const obj = {
        msg,
       Imagefile,
        username,
        groupId
      }
      
 await axios.post("http://localhost:3000/message/add-message", obj, { headers: { "Authorization": token } })
    .then((response) => {
      console.log(response);

    })

    .catch(err => console.log(err));
}
catch (err) {
  console.log(err);
}
}

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload);
  }




window.addEventListener('DOMContentLoaded',()=>{
 /*
//show no requirement of api calls;
  let edit=JSON.parse(localStorage.getItem('logoutusers'));
  console.log('EDit',edit);
  edit.push('gem');
  localStorage.setItem('logoutusers',JSON.stringify(edit));


  */
    let url=window.location.href;//it will give the url
    console.log(location.search)//give ?grouId=1
    //to access the query param
    let urlParams=new URLSearchParams(location.search)
     let groupname=[]
    for(const [key,value] of urlParams){
      console.log(`${key}:${value}`)
      groupId= `${value}`;
       groupname.push(groupId)
      console.log(groupId)
       
    }
  console.log(groupname[1])//26 becoz groupId:26
  console.log(groupname[0])//jack becoz in params username:jack
  let groupnme=groupname[1]
  const groupDet={
    groupnme
  }

 /* axios.post('http://localhost:3000/group/groupAdmin',groupDet).then(res=>{
   console.log(res)
})*///group admin feature



 // const token = localStorage.getItem('token')
 // const decodedToken = parseJwt(token);

 const usersloggedout= JSON.parse( localStorage.getItem('logoutusers')) 
 console.log(usersloggedout)
 usersloggedout.forEach(user=>{
   let logoutuser=document.getElementById('logoutuser')
    logoutuser.innerHTML +=`<ul style="list-style-type:none;"><li class="update"><br>${user} logged out</li></ul>`
   
  }) 

  


 axios.get("http://localhost:3000/message/getuser")
 .then(res=>{
   console.log(res);
 
  showChatBar(res.data.users);

 })

  axios.get(`http://localhost:3000/group/get-groupmessage?groupId=${groupname[1]}`)
  .then(response=>{
   console.log(response)
    const messageData = response.data.message;
    //console.log(messageData)
    showMessageOnScreen(messageData);
  })
  .catch(err => {

   console.log(err);
 

  })
})

function showMessageOnScreen(messageData) {
    const token = localStorage.getItem('token')
    const decodedToken = parseJwt(token)
    const userName = decodedToken.name;
    //console.log(userName)
    let urlParams=new URLSearchParams(location.search)
     let a=[]
    for(const [key,value] of urlParams){
      console.log(`${key}:${value}`)
      groupId= `${value}`;
       a.push(groupId)
      console.log(groupId)
       
    }
  console.log(a[1])//26 becoz groupId:26
  console.log(a[0])//jack becoz in params username:jack

 // get from localstorage the current user
 const useringroup=JSON.parse(localStorage.getItem(`groupId-${a[1]}`))
 console.log(useringroup)
 for(var i=0;i<useringroup.length;i++){
  const NewUser=document.getElementById('newUser')
  NewUser.innerHTML +=`<li style="font-style:italic;text-align: center;"><br>${useringroup[i]} logged in at ---> ${new Date()}</br><li>`;
  }

   const parent = document.getElementById('messagePop');
    parent.innerHTML = ``;
 const myMessage=document.getElementById('my-message');
 myMessage.innerHTML=``;
  
    console.log(messageData)

  
    messageData.forEach(message => {

      if(message.groupId==a[1]){
     if(message.username== userName){
      console.log("you logged in");

      mymessagechildnode=`<ul style="list-style-type:none;margin-left:800px;">
        
      <li ><p class="name"> You:</p><p class="text">${message.msg}</p>
      
      </li>
      
       </ul>`;
       myMessage.innerHTML +=  mymessagechildnode;
     }
     else{
      childNode =
      `<ul style="list-style-type:none;margin-left:231px;">
      
    <li> <p class="name">${message.username}:</p><p class="text">${message.msg}</p></li>
    
     </ul>`;
    parent.innerHTML =parent.innerHTML+ childNode;
     }
  
      }
    })
  
  }
 
  function showChatBar(userdata){
  
    const token = localStorage.getItem('token')
  const decodedToken = parseJwt(token);
  const username=decodedToken.name
  const isAdmin=decodedToken.isPremium;
  
  let urlParams=new URLSearchParams(location.search)
    let a=[]
   for(const [key,value] of urlParams){
     console.log(`${key}:${value}`)
     groupId= `${value}`;
      a.push(groupId);
     console.log(groupId);
      
   }
    let userloggedin=JSON.parse(localStorage.getItem(`groupId-${a[1]}`));
    //console.log(userloggedin)
    const userbar=document.getElementById('userbar'); 
      userbar.innerHTML=` <button id="logout" onclick="logout()">logout</button><button id="adduseringroup" onclick="addusertogroup()" style="visibility:hidden">Add user</button>`;
 
/*
     if(isAdmin ){
        const adduseringroup=document.getElementById('adduseringroup');
        adduseringroup.style.visibility='visible';
       

        const userList =`<li  class="chatbar">  ${userloggedin[i]} <button  onclick="removelist()" id="remove" style="background:red;color:white;border:none;visibility:block;">Remove</button> </li>  `;
     
        userbar.innerHTML +=userList;
      }
      else{
      const userList =`<li  class="chatbar"> ${userloggedin[i]}  </li> `;
         
      userbar.innerHTML +=userList;
      }*/
      for(var i=0;i<userloggedin.length;i++){
        userdata.forEach(user=>{

        if(userloggedin[i]== user.name){
          if(isAdmin ){
            const adduseringroup=document.getElementById('adduseringroup');
            adduseringroup.style.visibility='visible';
            const userList =`<li  class="chatbar">  ${user.name} <button  onclick="removelist()" id="remove" style="background:red;color:white;border:none;visibility:block;">Remove</button> </li>  `;
         
            userbar.innerHTML +=userList;
          }
        else {
       const userList =`<li  class="chatbar">  ${user.name}  </li> `;
         
        userbar.innerHTML +=userList;
        }

        }
       
        
      
      })
    }
  }


function addusertogroup(){
  let urlParams=new URLSearchParams(location.search)
  let a=[]
 for(const [key,value] of urlParams){
   console.log(`${key}:${value}`)
   groupId= `${value}`;
    a.push(groupId);
   console.log(groupId);
    
 }
  window.location.href=`../Grouplogin/groupLogin.html?username=${a[0]}&&groupId=${a[1]}`
}



   function logout(){
    console.log('clicked')
    const token = localStorage.getItem('token');
    const decodedToken = parseJwt(token);
    const user=decodedToken.name
    alert(`${user} logged out`)
   //window.location.href='logout.html'
     //localStorage.removeItem('token');
    // localStorage.setItem('token','')
     let urlParams=new URLSearchParams(location.search)
    let a=[]
   for(const [key,value] of urlParams){
     console.log(`${key}:${value}`)
     groupId= `${value}`;
      a.push(groupId);
     console.log(groupId);
      
   }
    let loggeduser=JSON.parse(localStorage.getItem(`groupId-${a[1]}`));

    loggeduser.forEach(userlog=>{
      if(userlog==user){
        console.log(userlog)
    
        const userl={
          userlog
        }
   axios.post(`http://localhost:3000/group/logoutuser`,userl)
   .then(res=>{
    console.log(res)
    let logoutuser=res.data.logout;
    console.log(logoutuser)
    localStorage.setItem(`logoutusers`, JSON.stringify(logoutuser))
   }).catch(err=>{
    console.log(err);
   })
  
    
    
      }

    })
  
   }

   function removelist(){
    console.log('removelist');
    //groupid from url
    let urlParams=new URLSearchParams(location.search)
   let a=[]
  for(const [key,value] of urlParams){
    console.log(`${key}:${value}`)
    groupId= `${value}`;
     a.push(groupId);
    console.log(groupId);
     
  }
   let userRemoved=JSON.parse(localStorage.getItem(`groupId-${a[1]}`));
    console.log(userRemoved[0])
    userRemoved.shift()
    console.log(userRemoved)
    localStorage.setItem(`groupId-${a[1]}`,JSON.stringify(userRemoved))



   }