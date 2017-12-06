var timer;
var link;
var mods;
var allData=[];

$.ajax({
	url: url + '/ErXueSSM/findAllDiseaseSystem.action',
	type: 'GET',
	dataType: '',
	data: '',
	async: false ,
	success: function(data1) {
		var arr = [];
		var mod = [];
		timer = data1.length;
		console.log(data1);

		for (var i = 0; i < data1.length; i++) {
			arr.push(data1[i].systemName);
			mod.push(data1[i].systemId);
		}

		for (var i = 0; i < timer; i++) {
			$('.section1').append('<dl class="am-accordion-item"><dt class="am-accordion-title">' + arr[i] + '</dt><dd class="am-accordion-bd am-collapse"><div class="am-accordion-content"><div class="am-list-news-bd"><ul class="am-list am-list-'+i+'"></ul></div></div></dd></dl>')
			
		}//系统生成

		link=mod.length;
		// alert(timer);
		mods=mod;
	}
});
//alert(link);
var num=0;
var datamod=[];
for(var i=0;i<link;i++){

	$.ajax({
	    url: url+ '/ErXueSSM/findDiseaseCategoryBySystemId.action',
	    type: 'GET',
	    dataType: '',
	    async: false ,
	    data: {systemId: mods[i]},
	    success:function(data){
	      var mod=[];
	      //console.log(data);
	      var arr=[];
	      datamod.push(data);
	      
	      for(var i=0;i<data.length;i++){
	        mod.push(data[i].diseaseCategoryName);
	        arr.push(data[i].diseaseCategoryId);
	        $(".am-list").eq(num).append('<li class="am-g am-list-item-dated"><a onclick="abc(this);" data-num='+num+' data-i='+i+' href=./widget3.html?diseaseCategoryId='+arr[i]+' class="am-list-item-hd ">'+mod[i]+'</a></li>');
	      	
	      }
	      num++;
	     
	    }
	  });
	//console.log(datamod);
	allData=datamod;
}
	// var json = {};
	// for(var i=0;i<allData.length;i++)
	// {
	//     json[i]=allData[i];
	// }
	// JSON.stringify(json);
	//console.log(allData[0][1]);
function abc(dom){
	var id=dom.getAttribute('data-num');
	var aId=dom.getAttribute('data-i');
	//alert(allData[id][aId].diseaseDescription);
	localStorage.diseaseDescription=allData[id][aId].diseaseDescription;


}
