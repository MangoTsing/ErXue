var url='http://192.168.0.110:8080';
//设置Ajax请求的全局默认options
$.ajaxSetup({
  type:'post',
     // 请求完成后的回调函数,无论成功与否。textStatus为一个描述请求类型的字符串，
      //  它可以有以下值success，notmodified，error，timeout，abort，parsererror 
   complete:function(xhr, ts){ //XMLHttpRequest, textStatus
      var sessionStatus = xhr.getResponseHeader('sessionstatus');
      if(sessionStatus == 'timeout') {
          alert('页面过期，请重新登录!');
          window.top.location.href = 'Login.html';
      }
  }
});