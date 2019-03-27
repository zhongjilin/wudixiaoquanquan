window.onload=function(){
	var img1=document.getElementById('imgg1'); 
    var img2=document.getElementById('imgg2');
    var img3=document.getElementById('imgg3');
    var img4=document.getElementById('imgg4');	
	img1.onmouseover=function(){
      start(img1,{width:110,height:132});
	}
	img1.onmouseout=function(){
      start(img1,{width:96,height:116});
	}
	img2.onmouseover=function(){
      start(img2,{width:130,height:120});
	}
	img2.onmouseout=function(){
      start(img2,{width:117,height:108});
	}
	img3.onmouseover=function(){
      start(img3,{width:130,height:115});
	}
	img3.onmouseout=function(){
      start(img3,{width:114,height:99});
	}
	img4.onmouseover=function(){
      start(img4,{width:115,height:122});
	}
	img4.onmouseout=function(){
      start(img4,{width:101,height:108});
	}    
}
//var timer=null;
var alpha=30;
function start(obj,json,fn){
	var flag=true;//假设所有运动到达终点
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		for(var attr in json){
		var dd=0;
		if(attr=='opacity'){
			var dd=Math.round(parseFloat(getStyle(obj,attr))*100);
		}
		else{
		var dd=parseInt(getStyle(obj,attr));
		}
		var speed=(json[attr]-dd)/5;
		speed=speed>0?Math.ceil(speed):Math.floor(speed);
		if(json[attr]!=dd){
	         flag=false;
		}
			if(attr=='opacity'){
				alpha+=speed;
				obj.style.filter='alpha(opacity:+alpha+)';
				obj.style.opacity=alpha/100;
			}
			else{
			obj.style[attr]=dd+speed+'px';
			}
		}
		if(flag){
			clearInterval(obj.timer);
			if(fn){
				fn();
				}
			}
	}
	
		,30)	
}
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}
	else{
		return getComputedStyle(obj,false)[attr];
	}
}
