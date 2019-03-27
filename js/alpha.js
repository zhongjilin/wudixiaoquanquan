var xmlhttp;
if(window.XMLHttpRequest){
	console.log("支持的");
	xmlhttp=new XMLHttpRequest();
}else{
	xmlhttp=new ActiveXobject("Microsoft.XMLHTTP");
	console.log("不支持的");
}