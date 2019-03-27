function check() {
	 var re;
	 var tele=document.getElementById('telephone');
	 var ss = document.getElementById('telephone').value;
	 var show=document.getElementById('show');
	 var input_code=document.getElementById('vcode').value;
     /*var code=document.getElementById('code').value;*/	 
	 var success=document.getElementById('success');
	 var name=document.getElementById('name').value;
	 na= /^([\u4e00-\u9fa5]){2,5}$/;
     re = /^(1[358][0-9]{9})$/;
     if (re.test(ss)==false) {
		 show.innerHTML="请输入正确的手机号";
         return false; 
         }
	 else if(na.test(name)==false){
		 show.innerHTML="请输入正确的姓名(只能输入中文)";
		 return false;
	 }
		 
	 else if(input_code.toLowerCase()!=code.toLowerCase()){
		 show.innerHTML="请输入正确的验证码";
		 return false
	 }
	 else{
		 alert("预约成功!");
		 return true; 		 
	 }
	 
	           
}
