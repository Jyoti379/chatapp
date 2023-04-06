function addUserToGroup(event){
    event.preventDefault();
    const username=event.target.username.value;
    const groupname=event.target.groupname.value
    
    const obj={
        username,
        groupname
    }


    const token = localStorage.getItem('token');
    axios.post("http://localhost:3000/group/add-group",obj,{ headers: { "Authorization": token } })
    .then(res=>{
        console.log(res)
        
        alert(`Group:${res.data.group.groupname} created`)
        let username= res.data.user[0].name;
        //console.log(username)
       let groupId=res.data.group.id
       window.location.href=`../Grouplogin/groupLogin.html?username=${username}&&groupId=${groupId}`
    })
}