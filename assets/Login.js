
var userInput = {                   //储存用户输入的表单
    username: '',                   //用户名
    password: ''                    //密码
}

//获取用户名
var usernameInput = document.getElementById('usernameInput');
usernameInput.onblur = function (){
    userInput.username = usernameInput.value;
}

//获取密码
var passwordInput = document.getElementById('passwordInput');

passwordInput.onblur = function (){
    userInput.password = passwordInput.value;
}

//提交
var submit = document.getElementById('submit');
var url = 'http://192.168.0.110:8080/ErXueSSM'; 
var login;
submit.onclick = function (){
    if(!userInput.username){
        alert('请输入用户名！');
        return;
    }
    if(!userInput.password){
        alert('请输入密码！');
        return;
    }
    $.ajax({
        type: 'get',
        url: url + '/login.action',
        data: userInput,
        dataType: 'text',
        success: function (data){
            console.log(data);
            if(!Boolean(data)){
                document.getElementById('check-password').className = 'show';
                return;
            }          
            document.getElementById('check-password').className = 'hidden';            
        }
    })
}

