
var styleElement = document.createElement("style");
function myFunction() {
    var rhtSrl = document.getElementById("right");
    var rhtHead = document.getElementById("head");
    var x =(rhtSrl.scrollTop)/100;
    var a = "rgba(0,0,0,"+x+")";
    rhtHead.style.backgroundColor=a;
    styleElement.appendChild(document.createTextNode(".split-right::-webkit-scrollbar-track{ background:  linear-gradient( to bottom, "+a+" 0%, "+a+" 11vh, transparent 11vh,  transparent 100% );;}"));
    document.getElementsByTagName("head")[0].appendChild(styleElement);
}
function sign_up(){
    window.location.href="./register.html";
}
function log_in(){
    window.location.href="./Login.html";
}

function logout(){
	var xmlHttp2 = new XMLHttpRequest();
	
	xmlHttp2.open("POST", "./logout?", true);
	xmlHttp2.send();
	xmlHttp2.responseType="text";
	xmlHttp2.onreadystatechange = function()
	{
	    if (xmlHttp2.readyState==4 && xmlHttp2.status ==200 )
	    {
			window.location.replace("./index.html")
		}
	}
}
function goAcc(){
    window.location.href="./Account.html";
}

function onld(){
	
	var xmlHttp1 = new XMLHttpRequest();
	
	xmlHttp1.open("POST", "./CheckLogin?", true);
	xmlHttp1.send();
	xmlHttp1.responseType="text";
	xmlHttp1.onreadystatechange = function(){
	    if (xmlHttp1.readyState==4 && xmlHttp1.status ==200 ){
			var obj = JSON.parse(xmlHttp1.responseText);
			console.log(obj.login);	
			var l ;
			if(obj.name.split(' ')[0].length>12)
			{
				l=obj.name.slice(0, 10)+"...";
			}
			else
			{
				l=obj.name.split(' ')[0];	
			}
			if(obj.login=="true")
			{				
				document.getElementById('head').innerHTML='<div class="sign_up"> <button class="sign_up_button" onclick="goAcc()">'+l+'&nbsp;<i class="fa-solid fa-up-right-from-square"></i></button></div><div class="log_in"><button class="log_button" onclick="logout()">Logout'
													    +'&nbsp; <i class="fa-solid fa-right-from-bracket"></i>'
  														+'</button>';
  														
      		}       		
		}
	};	    
}
