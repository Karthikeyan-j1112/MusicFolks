
var styleElement = document.createElement("style");

function cursor_change()
{
	 var a =document.getElementById('mail').value;
     var b =document.getElementById('password1').value;
     var d =document.getElementById('password2').value;
     var c =document.getElementById('sign_up_button');
     var regEmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
     var regPhone=/^\d{10}$/;
     var f =!(b.match(/[a-z]/g) && b.match(/[A-Z]/g) && b.match(/[0-9]/g) && b.match(/[^a-zA-Z\d]/g) && b.length >= 8 );
     var e=document.getElementById("name").value;
     var y=document.getElementById("answer").value;
     var z=document.getElementById("dob").value;
     var g = document.getElementById("mail_miss");
     
	if(a==""||b==""||d==""||b!=d ||y==""|| z=="" ||!(regEmail.test(a)||regPhone.test(a))||f||e==""|| e.length<3 || e.length>20 ||g.innerHTML!="" )
     {
         c.disabled=true;
         c.style.cursor="default";   
     }
     else{
         c.disabled=false;   
         c.style.cursor="pointer"; 
        
     }
}

function dob_change(){
	var i=document.getElementById("dob").value;
    
    if(i == "")
    {        
		document.getElementById('dob_miss').innerHTML='<i class="fa-solid fa-circle-exclamation"></i> Please enter your Name ';
		
    }
    else{
        document.getElementById('dob_miss').innerHTML='';
    }
    
    cursor_change(); 
}

 function mail_check()
 {   
     var a =document.getElementById('mail').value;     
     var regEmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;     
     var g = document.getElementById("mail_miss");

	var xmlHttp = new XMLHttpRequest();
	var param = "email_id="+a+"&login=false";
	
	xmlHttp.open("POST", "./CheckMail?"+param, true);
	xmlHttp.send();
	xmlHttp.responseType="text";
	xmlHttp.onreadystatechange = function(){
	    if (xmlHttp.readyState==4 && xmlHttp.status ==200 ){
	        g.innerHTML = xmlHttp.responseText;
			if(a == "" || !regEmail.test(a))
	 		{
         		if(a == "" )
         		{ 
         			g.innerHTML='<i class="fa-solid fa-circle-exclamation"></i> Please enter your email id ';           
         		}
         		else 
         		{
             		if(!regEmail.test(a))
             		{
                		g.innerHTML='<i class="fa-solid fa-circle-exclamation"></i> Please a valid email id';
             		}
         		}
     		}  
		}
	};
     
     cursor_change();    	 
}

function name_check()
{   
    var e=document.getElementById("name").value;
   
    
    if(e == ""||e.length<3||e.length>20)
    {
        if(e=="")
        {
			document.getElementById('name_miss').innerHTML='<i class="fa-solid fa-circle-exclamation"></i> Please enter your Name ';
		}  
        else
        {
        	document.getElementById('name_miss').innerHTML='<i class="fa-solid fa-circle-exclamation"></i> Your Name should have 3 to 20 characters only';
        }  
    }
    else{
        document.getElementById('name_miss').innerHTML='';
    }
    
    cursor_change();    
       
}

function number_check()
{   
    var a =document.getElementById('mail').value;    
    var regPhone=/^\d{10}$/;        
	var g = document.getElementById("mail_miss");
	
	var xmlHttp = new XMLHttpRequest();
	
	var param = "email_id="+a+"&login=false";
	
	xmlHttp.open("POST", "./CheckMail?"+param, true);
	xmlHttp.send();
	xmlHttp.responseType="text";
	
	xmlHttp.onreadystatechange = function(){
	    if (xmlHttp.readyState==4 && xmlHttp.status ==200 ){
				g.innerHTML=xmlHttp.responseText;

				if(a == "" || !regPhone.test(a))
		 		{
	         		if(a == "" )
	         		{ 
	         			g.innerHTML='<i class="fa-solid fa-circle-exclamation"></i> Please enter your Phone No ';           
	         		}
	         		else 
	         		{
	             		if(!regPhone.test(a))
	             		{
	                		g.innerHTML='<i class="fa-solid fa-circle-exclamation"></i> Please a valid Phone No';
	             		}
	         		}
	     		}   
	     		   		
		}
	};
    cursor_change(); 
}

function password_check()
{       
    var b =document.getElementById('password1').value;
    var d =document.getElementById('password2').value;       
    var f =!(b.match(/[a-z]/g) && b.match(/[A-Z]/g) && b.match(/[0-9]/g) && b.match(/[^a-zA-Z\d]/g) && b.length >= 8 );
	
    if( b==""|| f)
    {
        if(b=="")
            document.getElementById('password_miss').innerHTML='<i class="fa-solid fa-circle-exclamation"></i> Please enter your password';
        else
            document.getElementById('password_miss').innerHTML='<i class="fa-solid fa-circle-exclamation"></i> A password is correct if it contains:<ul><li>At least 1 uppercase character.</li><li>At least 1 lowercase character.</li><li>At least 1 digit.</li><li>At least 1 special character.</li><li>Minimum 8 characters.</li></ul>';
    }
    else{
        document.getElementById('password_miss').innerHTML='';
    }

    if(b!=d || d=="")
    {
        if(d=="")
        { 
          document.getElementById('password_mismatch').innerHTML='<i class="fa-solid fa-circle-exclamation"></i> Enter the password again ';  
        }
        else if(b!=d)
        {
            document.getElementById('password_mismatch').innerHTML='<i class="fa-solid fa-circle-exclamation"></i> Password mismatch with above entry';
        }
    }
    else{
        document.getElementById('password_mismatch').innerHTML='';
    }

    cursor_change();
 }

function myFunction() {
    var rhtSrl = document.getElementById("right");
    var rhtHead = document.getElementById("head");
    var x =(rhtSrl.scrollTop)/100;
    var a = "rgba(0,0,0,"+x+")";
    rhtHead.style.backgroundColor=a;
    styleElement.appendChild(document.createTextNode(".split-right::-webkit-scrollbar-track{ background:  linear-gradient( to bottom, "+a+" 0%, "+a+" 11vh, transparent 11vh,  transparent 100% );;}"));
    document.getElementsByTagName("head")[0].appendChild(styleElement);
}

function log_in(){
    window.location.href="./Login.html";
}

function change_number(){
    var a= 'Phone Number<br><input type="text" class="input" id="mail" placeholder="Enter Phone no" required onkeyup="number_check()"> <div id="mail_miss"></div> <div id="changer" onclick="change_mail()">Use email id instead</div> ';
    document.getElementById("mail_or_number").innerHTML=a;
}

function change_mail(){
    var a= 'Email Id<br><input type="text" id="mail" class="input" placeholder="Enter email id" required onkeyup="mail_check()"><div id="mail_miss"></div> <div id="changer" onclick="change_number()">Use phone number instead</div>';
    document.getElementById("mail_or_number").innerHTML=a;
}

function showPassword1(x)
{
    if(x.className==="fa-solid fa-eye")
    {
        document.getElementById('password1').type='text';
        document.getElementById('icn1').innerHTML='<i class="fa-solid fa-eye-slash"  onclick="showPassword1(this)"></i>';
        
    }
    else if( x.className==="fa-solid fa-eye-slash"){
        document.getElementById('password1').type='password';
        document.getElementById('icn1').innerHTML='<i class="fa-solid fa-eye"  onclick="showPassword1(this)"></i>';
    }
}

function showPassword2(x)
{
    if(x.className==="fa-solid fa-eye")
    {
        document.getElementById('password2').type='text';
        document.getElementById('icn2').innerHTML='<i class="fa-solid fa-eye-slash"  onclick="showPassword2(this)"></i>';
        
    }
    else if( x.className==="fa-solid fa-eye-slash"){
        document.getElementById('password2').type='password';
        document.getElementById('icn2').innerHTML='<i class="fa-solid fa-eye"  onclick="showPassword2(this)"></i>';
    }
}
function answer_change()
{
	if(document.getElementById("answer").value=="")
	{
		document.getElementById('ans_miss').innerHTML='<i class="fa-solid fa-circle-exclamation"></i> Enter the Answer for the above Question ';
	}
	else{
		document.getElementById('ans_miss').innerHTML='';
	}
	cursor_change();
}
function submit1()
{
	var a =document.getElementById('mail').value;
    var b =document.getElementById('password1').value;
    var e=document.getElementById("name").value;
    var y=document.getElementById("answer").value;
    var z=document.getElementById("dob").value;
    var w = document.getElementById("ques").value;
	var xmlHttp1 = new XMLHttpRequest();
	var param1 = "email_id_or_phone_no="+a+"&password="+b+"&full_name="+e+"&dob="+z+"&ques="+w+"&answer="+y;
	
	xmlHttp1.open("POST", "./register?"+param1, true);
	xmlHttp1.send();
	console.log(xmlHttp1.readyState);
	console.log(xmlHttp1.status);
	xmlHttp1.onreadystatechange = function(){
	    if (xmlHttp1.readyState==4 && xmlHttp1.status ==200 ){
			console.log(xmlHttp1.readyState);
			console.log(xmlHttp1.status);
			
			alert(xmlHttp1.responseText);
      		window.location.href="./Login.html";
      		
		}
	};
	
}
