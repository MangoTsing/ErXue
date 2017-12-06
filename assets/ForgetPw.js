//储存用户信息
var user = {
    username: '',           //用户名（邮箱）
    password: '',           //密码
    gender: '',             //性别
    age: '',                //年龄
    mobilePhone: '',        //电话
    upload_pic: '',         //头像
    realName: '',           //真实姓名
    verifyCode: '',         //验证码
    description: ''         //描述
}


//验证用户名
var username = document.getElementById('username');
username.onchange = function(){    
    if(!/^[a-zA-Z\d]+$/i.test(username.value)){
        document.getElementById('check-username').className = 'show';
        return;
    }
    document.getElementById('check-username').className = 'hidden';
    user.username = username.value;
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

//验证电话号码格式
var phoneNumber = document.getElementById('phoneNumber');
var phone;
phoneNumber.onblur = function(){
    if(!/(\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/i.test(phoneNumber.value)){
        document.getElementById('check-phoneNumber').className = 'show';
        return;
    }
    document.getElementById('check-phoneNumber').className = 'hidden';
    phone = phoneNumber.value;
    // console.log(phone);
    user.mobilePhone = phone;
}

//获取验证码
var VerificationCode;
var getVerificationCode = document.getElementById('getVerificationCode');
var url = 'http://111.230.141.147:8080/ErXueSSM'
getVerificationCode.onclick = function(){
    if(!phone){
        document.getElementById('check-phoneNumber').className = 'show';
        return;
    }
    $.ajax({
        type: 'post',
        url: url + '/checkUsername.action',
        data: user.username,
        dataType: 'text',
        success: function (data){
            if(!data){
               alert('该用户名已注册！'); 
            }
            $.ajax({
                type:"post",
                url: url+"/sendMessageVerifyCode.action",
                data: phone,
                dataType:"text",
                success: function (data) {
                    console.log(data);
                    VerificationCode = data;
                }
            });
        }
    });
}
//验证码表单是否填写
var VerificationCodeInput = document.getElementById('VerificationCodeInput');
VerificationCodeInput.onblur = function(){
    if(!VerificationCodeInput.value){
        document.getElementById('check-VerificationCodeInput').className = 'show';
        document.getElementById('check-VerificationCodeInputError').className = 'hidden';
        return
    }
    document.getElementById('check-VerificationCodeInput').className = 'hidden';    
    user.verifyCode = VerificationCodeInput.value;
}

var submit = document.getElementById('submit');
submit.onclick = function(){
    var url = 'http://111.230.141.147:8080/ErXueSSM'

    if(!VerificationCodeInput.value){
        document.getElementById('check-VerificationCodeInput').className = 'show';
        return;
    }else if(VerificationCodeInput.value !== VerificationCode){
        document.getElementById('check-VerificationCodeInputError').className = 'show';
        return;
    }
    document.getElementById('check-VerificationCodeInputError').className = 'hidden';
    if(!(user.username&&user.password&&user.mobilePhone&&user.verifyCode)){
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

}