function check()
{
    var a =document.getElementById('mail');        
    
    var h = "reset";
   
    
	if(a.value=="")
    {
        document.getElementById('mail_miss').innerHTML='<i class="fa-solid fa-circle-exclamation"></i> Please enter your email address or phone no.';
    }
    else
	{	
		var xmlHttp = new XMLHttpRequest();   
	    var param = "email_id="+a.value+"&login="+h;
	    xmlHttp.open("POST", "./CheckMail?"+param, true);
		xmlHttp.send();
		xmlHttp.responseType="text";
		xmlHttp.onreadystatechange = function()
		{
			if (xmlHttp.readyState==4 && xmlHttp.status ==200 )
			{
				var obj = JSON.parse(xmlHttp.responseText);
				if(obj.exist=="yes")
				{
					document.getElementById('mail_miss').innerHTML="";
					a.disabled=true;
					var f =  'Email your Date of Birth<br> <input type="date"  class="input" id="dob" placeholder="Enter Your Dob" required > <br><div id="dob_miss"></div>  <br>'
							 +obj.ques+'<br> <input type="text"  class="input" id="ans" placeholder="Enter Your Answer that you give while you register" required > <br><div id="ans_miss"></div> <br> '
                       		 +'Email your New Password<br> '                       		 
        					 +'<div class="input-icons"><div id="icn1"> <i class="fa-solid fa-eye"  onclick="showPassword1(this)"></i> </div><input id="password1" class="input" type="password" placeholder="Enter Password" name="password" required onkeyup="password_check()"><div id="password_miss"></div></div>'
							 +'Confirm Password <br><div class="input-icons"><div id="icn2"> <i class="fa-solid fa-eye"  onclick="showPassword2(this)"></i> </div><input id="password2" class="input" type="password" placeholder="Enter Password" required onkeyup="password_check()"><div id="password_mismatch"></div></div>'
                       		 +'<div class="sign_up" ><button id="log_in_button" onclick="reset()">Reset</button></div>';
                    document.getElementById('change').innerHTML=f;
				
				}    
				else if(obj.exist=="no")
				{
					document.getElementById('mail_miss').innerHTML='<i class="fa-solid fa-circle-exclamation"></i> This email id or phone number not registered. Try Creating an Account by clicking the sign up button down there.';
				}
			    		 		
			}
		};
    } 
}


function password_check()
{       
    var b =document.getElementById('password1').value;
    var d =document.getElementById('password2').value;       
    var f =!(b.match(/[a-z]/g) && b.match(/[A-Z]/g) && b.match(/[0-9]/g) && b.match(/[^a-zA-Z\d]/g) && b.length >= 8 );
	var c =document.getElementById('log_in_button');
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

    if(b==""|| f||b!=d || d=="")
    {
		c.disabled=true;
        c.style.cursor="default"; 
	}
	else{
		c.disabled=false;   
        c.style.cursor="pointer"; 
	}
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


function sign_up(){
    window.location.href="./register.html";
}

function log_in(){
    window.location.href="./Login.html";
}


function reset()
{
	var a=document.getElementById("mail").value;
	var b=document.getElementById("dob").value;
	var c=document.getElementById("ans").value;
	var d=document.getElementById("password1").value;
	
	if(b=="")
	{
		document.getElementById('dob_miss').innerHTML='<i class="fa-solid fa-circle-exclamation"></i> Please enter your Date of Birth';
	}
	else if(c=="")
	{
		document.getElementById('dob_miss').innerHTML="";
		document.getElementById('ans_miss').innerHTML='<i class="fa-solid fa-circle-exclamation"></i> Please enter your Answer';
	}
	else if(d=="")
	{
		document.getElementById('ans_miss').innerHTML="";
		document.getElementById('password_miss').innerHTML='<i class="fa-solid fa-circle-exclamation"></i> Please enter your password';
	}
	else{
		document.getElementById('password_miss').innerHTML="";
	    var xmlHttp = new XMLHttpRequest();   
	    var param = "email_id="+a+"&dob="+b+"&answer="+c+"&password="+d;
	    xmlHttp.open("POST", "./reset?"+param, true);
		xmlHttp.send();
		xmlHttp.responseType="text";
		xmlHttp.onreadystatechange = function(){
		    if (xmlHttp.readyState==4 && xmlHttp.status ==200 ){
				var obj = JSON.parse(xmlHttp.responseText);
				if(obj.result=="pass")
				{
					document.getElementsByClassName("log_form")[0].innerHTML ='<div align="center" style="font-size: 20px; padding:10px;" > PassWord Reseted Successfully. Continue to <br> <br> <button id="log_in_button" onclick="log_in()" >LOG IN</button>  </div>';
				}
				else if(obj.result=="fail")
				{
					if(obj.message=="dob")
					{
						document.getElementById('dob_miss').innerHTML='<i class="fa-solid fa-circle-exclamation"></i>Date of Birth you entered doesn\'t match our Records;';
					}
					if(obj.message=="ans")
					{
						document.getElementById('ans_miss').innerHTML='<i class="fa-solid fa-circle-exclamation"></i>Answer you entered doesn\'t match our Records;';
					}
				}
			}
		}
	}
}
	