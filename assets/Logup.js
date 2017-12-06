//储存用户信息
var user = {
    username: '',           //用户名（手机号）
    password: '',           //密码
    verifyCode: '',         //验证码
}
var url = 'http://192.168.0.110:8080/ErXueSSM';

//验证用户名
var username = document.getElementById('username');
username.onchange = function(){    
    if(!/^[a-zA-Z\d]+$/i.test(username.value)){
        document.getElementById('check-username').className = 'show';
        return;
    }
    document.getElementById('check-username').className = 'hidden';
    user.username = username.value;
    $.ajax({
        type: 'post',
        url: url + '/checkUsername.action',
        data: {username:user.username},    
        success: function (data){            
            if(!data){
                alert('该用户名已注册！'); 
                return;
            }
            user.username=username.value;
        }
    });
    
}

//验证密码（第一次）
var passwdfirst = document.getElementById("passwdfirst");
var passwd;
passwdfirst.onblur = function(){
    if(!passwdfirst.value){
        document.getElementById('check-passwdfirst').className = 'show';
        return;
    }
    if(!/^[0-9a-zA-Z]{6,16}$/i.test(passwdfirst.value)){
        alert("请输入6位数字或字母");
    }
    document.getElementById('check-passwdfirst').className = 'hidden';
    passwd = passwdfirst.value;
}
//验证密码（第二次）
var passwdsecond = document.getElementById("passwdsecond");

passwdsecond.onblur = function(){
    if(passwdsecond.value !== passwd){
        document.getElementById('check-passwdsecond').className = 'show';
        return;
    }
    document.getElementById('check-passwdsecond').className = 'hidden';
    user.password = passwd;
}

//获取验证码
var VerificationCode;
var getVerificationCode = document.getElementById('getVerificationCode');

getVerificationCode.onclick = function(){
    console.log(username.value);
    $.ajax({
        type:"post",
        url: url+"/sendMessageVerifyCode.action",
        data: {username:username.value},
        dataType:"",
        //添加跨域
        async: false,  
        xhrFields: {  
            withCredentials: true  
        },  
        crossDomain: true,  
        //添加跨域
        success: function (data) {
            data==0?alert('成功'):alert('失败');
           user.username=username.value;
        }
    });
}
//验证码表单是否填写
var VerificationCodeInput = document.getElementById('VerificationCodeInput');
VerificationCodeInput.onblur = function(){
    $.ajax({
        url: url+'/checkout.action',
        type: 'GET',
        dataType: '',
        data: {verifyCode: VerificationCodeInput.value},
        //添加跨域
        /* 
默认为true，即请求为异步请求，这也是ajax存在的意义。
 但同时也可以将这个参数设置为false，实现同步请求。
（同步请求会锁定浏览器，直到这个请求结束后才可以执行其他操作）
         * */
        async: false,  
        xhrFields: {  
            withCredentials: true  
        },  
        crossDomain: true,  
        success:function(data){
            console.log(data);
        }
    });
 
    
    if(!VerificationCodeInput.value){
        document.getElementById('check-VerificationCodeInput').className = 'show';
        document.getElementById('check-VerificationCodeInputError').className = 'hidden';
        return
    }
    document.getElementById('check-VerificationCodeInput').className = 'hidden';    
    user.verifyCode = VerificationCodeInput.value;
}

//提交
var submit = document.getElementById('submit');
submit.onclick = function(){
   //alert(username.value);
alert(username.value+user.password);

    if(!VerificationCodeInput.value){
        document.getElementById('check-VerificationCodeInput').className = 'show';
        return;
    }

    document.getElementById('check-VerificationCodeInputError').className = 'hidden';
    if(!(username.value&&user.password&&user.verifyCode)){
        alert("请补全必填项");
        return;
    }
    if(!/^[0-9a-zA-Z]{6,16}$/i.test(user.password)){
        alert('请输入6位数字或字母作为密码');
        return;
        
    }
    if(passwdfirst.value!==passwdsecond.value){
        alert('请保证两次密码一致');
        return;        
    }
    console.log(user);
    //JSON.stringify(user)
    $.ajax({
        type: 'post',
        url: url+"/regist.action",
        data: {username:username.value,password:user.password},
        dataType:"",
        // contentType: "application/json",
        success: function (data) {
            console.log(data);
        }
    })
}
