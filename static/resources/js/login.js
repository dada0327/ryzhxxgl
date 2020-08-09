function login(){
    var username=document.getElementById("username");
    var password=document.getElementById("pwd");
    if(username.value==""){
        alert("用户名没有填写");
        return false;
    }if(password.value==""){
        alert("密码没有填写");
        return false;
    }
    return true;
}