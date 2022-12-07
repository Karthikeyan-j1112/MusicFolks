let x = 0;
var styleElement = document.createElement("style");


function submit(){
	var a =document.getElementById('mail').value;
    var b =document.getElementById('password').value;    
    if(b=="")
    {
        document.getElementById('password_miss').innerHTML='<br><i class="fa-solid fa-circle-exclamation"></i> Please enter your password';
    }
    else{
        document.getElementById('password_miss').innerHTML='';
        var xmlHttp1 = new XMLHttpRequest();
		var param1 = "mail="+a+"&password="+b;
		
		xmlHttp1.open("POST", "./login?"+param1, true);
		xmlHttp1.send();
		xmlHttp1.responseType="text";
		xmlHttp1.onreadystatechange = function(){
		    if (xmlHttp1.readyState==4 && xmlHttp1.status ==200 ){
				var obj = JSON.parse(xmlHttp1.responseText);
				console.log(obj.miss_match+obj.message);
				if(obj.miss_match=="true")
				{
					if(obj.message=="email")
					{
						document.getElementById('mail_miss').innerHTML='<br><i class="fa-solid fa-circle-exclamation"></i> Please enter your registered email address or phone no.';
					}
					else if(obj.message=="password")
					{
						document.getElementById('mail_miss').innerHTML='';
						document.getElementById('error_login').innerHTML='<br><i class="fa-solid fa-circle-exclamation"></i> The Password you entered did not match your email in our Records. Please Enter Correctly';						
					}
					      			
	      		}
	      		else if(obj.miss_match=="false"){
					window.location.replace("./index.html");
				}      		
			}
		};
    }
    
    
}

function showPassword(x)
{
    if(x.className==="fa-solid fa-eye")
    {
        document.getElementById('password').type='text';
        document.getElementById('icn').innerHTML='<i class="fa-solid fa-eye-slash"  onclick="showPassword(this)"></i>';
        
    }
    else if( x.className==="fa-solid fa-eye-slash"){
        document.getElementById('password').type='password';
        document.getElementById('icn').innerHTML='<i class="fa-solid fa-eye"  onclick="showPassword(this)"></i>';
    }
}


function sign_up(){
    window.location.href="./register.html";
}

function onld(){
	
	var xmlHttp1 = new XMLHttpRequest();
	
	xmlHttp1.open("POST", "./CheckLogin?", true);
	xmlHttp1.send();
	xmlHttp1.responseType="text";
	xmlHttp1.onreadystatechange = function(){
	    if (xmlHttp1.readyState==4 && xmlHttp1.status ==200 ){
			var obj = JSON.parse(xmlHttp1.responseText);
			
			if(obj.login=="true")
			{				
				window.location.replace("./index.html");									
      		}
      		
		}
	};	    
}
