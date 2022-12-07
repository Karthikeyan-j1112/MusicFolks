let x="",y="",z="";

function onld(a)
{	
	var xmlHttp2 = new XMLHttpRequest();
	xmlHttp2.open("POST", "./account?", true);
	xmlHttp2.send();
	xmlHttp2.responseType="text";
	xmlHttp2.onreadystatechange = function()
	{
	    if (xmlHttp2.readyState==4 && xmlHttp2.status ==200 )
	    {
			var obj2 = JSON.parse(xmlHttp2.responseText);
			console.log(obj2.login);						
			if(obj2.login=="true")
			{	
				document.getElementById('head').innerHTML='<div class="sign_up"> </div><div class="log_in"><button class="log_button" onclick="logout()">Logout'
													    +'&nbsp; <i class="fa-solid fa-right-from-bracket"></i>'
  														+'</button>';
  						
				x=obj2.email_id;
				y=obj2.name;
				z=obj2.DOB;
				var l ='<div class="centered-right" >'
						+'Email Id or Phone Number :<br> <div class="input-icons"> <div id="icn1"> <i class="fa-solid fa-pen-to-square"  onclick="edit1(this)"></i> </div><input id="mail" type"text" class="input" placeholder="Enter Email id or Phone Number" required Value="'+x+'" disabled ><div id="mail_miss"></div></div>'
						+'<br>Full Name :<br> <div class="input-icons"> <div id="icn2"> <i class="fa-solid fa-pen-to-square"  onclick="edit2(this)"></i> </div><input id="name" type"text" placeholder="Enter Your Full name" required Value="'+y+'" disabled > <div id="name_miss"></div> </div>'
						+'<br>Date of Birth :<br> <div class="input-icons"> <div id="icn3"> <i class="fa-solid fa-pen-to-square"  onclick="edit3(this)"></i> </div><input id="dob"  type="date" placeholder="Enter Your Date of Birth" required Value="'+z+'" disabled >  <div id="dob_miss"></div></div>'
						+'<br><div id="save"></div> <div id="edit"></div> </div>';
				document.getElementById('content').innerHTML=l;
				document.getElementsByClassName("centered-right")[0].style.paddingTop="70px";
				if(a=="edit")
				{
					document.getElementById("edit").innerHTML='<div>Changes updated <br>successfully in the Records</div>';
					document.getElementById("edit").style.display = 'block';					
					document.getElementById("save").innerHTML = '';
					document.getElementsByClassName("centered-right")[0].style.paddingTop="40px";
					setTimeout(() => {
						if(document.getElementById("save").innerHTML == '')
						{
					  		document.getElementsByClassName("centered-right")[0].style.paddingTop="70px";
					  	}
						document.getElementById("edit").style.display = 'none';
						document.getElementById("edit").innerHTML = '';
					}, 2500);
				}
  														
      		}
      		else{
				window.location.replace("./index.html");
			}  
		}
	};		
	
	document.getElementsByClassName("Left_password")[0].innerHTML='<span class="material-symbols-rounded" id="password">key</span> <div>Change Password</div>';
	document.getElementsByClassName("Left_acc")[0].innerHTML='<span class="material-symbols-rounded" id="account">account_circle</span> <div>Account Details</div>';
	document.getElementsByClassName("Left_acc")[0].style.color="white";
	document.getElementsByClassName("Left_password")[0].style.color="grey";
	
}





function save()
{	
	var a =document.getElementById('mail').value;
	var l=document.getElementById("dob").value;
	var e=document.getElementById("name").value;
	
	var regEmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;     
	var g = document.getElementById("mail_miss");
	var regPhone=/^\d{10}$/;     
	
	if((a == "" || !(regEmail.test(a)||regPhone.test(a)) ||a==x)&&document.getElementById("mail").disabled==false)
	{
 		if(a == "" )
 		{ 
 			g.innerHTML='<i class="fa-solid fa-circle-exclamation"></i> Please enter your email id or Phone Number ';           
 		}
 		else 
 		{
     		if(!(regEmail.test(a)||regPhone.test(a)))
     		{
        		g.innerHTML='<i class="fa-solid fa-circle-exclamation"></i> Please a valid email id or Phone number';
     		}
     		else if(a==x){
				g.innerHTML='<i class="fa-solid fa-circle-exclamation"></i> You have entered your pervious email Id or Phone Number';
			}
 		}
	}  	
	else if(l=="")	
	{
		g.innerHTML='';
		document.getElementById('dob_miss').innerHTML='<i class="fa-solid fa-circle-exclamation"></i> Please enter your DOB ';
	}	
	else if(l==z&&document.getElementById("dob").disabled==false)
	{
		g.innerHTML='';
		document.getElementById('dob_miss').innerHTML='<i class="fa-solid fa-circle-exclamation"></i> You have entered your Previous DOB in the records';
	}
	else if((e == ""||e.length<3||e.length>20||e==y)&&document.getElementById("name").disabled==false)
    {
		g.innerHTML='';
		document.getElementById('dob_miss').innerHTML='';
        if(e=="")
        {
			document.getElementById('name_miss').innerHTML='<i class="fa-solid fa-circle-exclamation"></i> Please enter your Name ';
		}  
		else if(e==y)
		{
			document.getElementById('name_miss').innerHTML='<i class="fa-solid fa-circle-exclamation"></i> You have entered your Previous Name in the records';
		}
        else
        {
        	document.getElementById('name_miss').innerHTML='<i class="fa-solid fa-circle-exclamation"></i> Your Name should have 3 to 20 characters only';
        }  
    }
    else{
		g.innerHTML='';
		document.getElementById('dob_miss').innerHTML='';
        document.getElementById('name_miss').innerHTML='';
        var xmlHttp2= new XMLHttpRequest();
		var param = "full_name="+e+"&email_id_or_phone_no="+a+"&dob="+l;
		xmlHttp2.open("POST","./ChangeDetails?"+param,true);
		xmlHttp2.send();
		xmlHttp2.onreadystatechange = function()
		{	
		    if (xmlHttp2.readyState==4 && xmlHttp2.status ==200 )
		    {
				var obj3 = JSON.parse(xmlHttp2.responseText);
				if(obj3.change=="success")
				{
					onld("edit");											
				}
				else if(obj3.change=="fail"&&obj3.reason=="mail")
				{
					g.innerHTML='<i class=\"fa-solid fa-circle-exclamation\"></i> This email id or phone number Already registered';
				}
			}
		}
    }	
}


function pass_change()
{			
	var l =  '<div class="centered-right" onsubmit="changePass()" >'
			+'Old Password :<br> <div class="input-icons"><div id="icn1"> <i class="fa-solid fa-eye"  onclick="showPassword1(this)"></i> </div> <input id="oldPass" type="password" class="input" placeholder="Enter your old Password" required Value=""  ><div id="old_miss"></div></div>'
			+'<br>New Password :<br> <div class="input-icons"> <div id="icn2"> <i class="fa-solid fa-eye"  onclick="showPassword2(this)"></i> </div><input id="newPass" type="password" class="input" placeholder="Enter Your new password" required Value=""  > <div id="new_miss"></div> </div>'
			+'<br>Confrim New Password :<br> <div class="input-icons"><div id="icn3"> <i class="fa-solid fa-eye"  onclick="showPassword3(this)"></i> </div> <input id="conformPass"  type="password" class="input" placeholder="Enter Your new password again" required Value="" >  <div id="pass_mismatch"></div></div>'
			+'<br><div id="save"><input type="submit" id="change" onclick="changePass()" value="CHANGE PASSWORD" ></div> <div id="edit"></div> </div>';
	
	document.getElementById('content').innerHTML=l;
	document.getElementsByClassName("centered-right")[0].style.paddingTop="40px";
	document.getElementsByClassName("Left_password")[0].innerHTML='<span class="material-symbols-rounded" id="password1">key</span> <div>Change Password</div>';
	document.getElementsByClassName("Left_acc")[0].innerHTML='<span class="material-symbols-rounded" id="account1">account_circle</span> <div>Account Details</div>';
	document.getElementsByClassName("Left_acc")[0].style.color="grey";
	document.getElementsByClassName("Left_password")[0].style.color="white";
	document.getElementById("change").style.width='300px';
}

function changePass()
{
	var a = document.getElementById('oldPass').value;
	var b = document.getElementById('newPass').value;
	var c = document.getElementById('conformPass').value;
	
	var f =!(b.match(/[a-z]/g) && b.match(/[A-Z]/g) && b.match(/[0-9]/g) && b.match(/[^a-zA-Z\d]/g) && b.length >= 8 );
	
	if(a=="")
	{
		document.getElementById('old_miss').innerHTML='<i class="fa-solid fa-circle-exclamation"></i> Enter your old password';		
	}
	else if(b==""){
		document.getElementById('old_miss').innerHTML='';
		document.getElementById('new_miss').innerHTML='<i class="fa-solid fa-circle-exclamation"></i> Enter your new password';
	}
	else if(f){
		document.getElementById('old_miss').innerHTML='';		
		document.getElementById('new_miss').innerHTML='<i class="fa-solid fa-circle-exclamation"></i> A password is correct if it contains:<ul><li>At least 1 uppercase character.</li><li>At least 1 lowercase character.</li><li>At least 1 digit.</li><li>At least 1 special character.</li><li>Minimum 8 characters.</li></ul>';
		document.getElementsByClassName("centered-right")[0].style.height="600px";
		document.getElementsByClassName("split-right")[0].style.height="120vh";
	}
	else if(c==""){
		document.getElementById('old_miss').innerHTML='';
		document.getElementById('new_miss').innerHTML='';
		document.getElementById('pass_mismatch').innerHTML='<i class="fa-solid fa-circle-exclamation"></i> Enter your new password again';
		document.getElementsByClassName("centered-right")[0].style.height="450px";
		document.getElementsByClassName("split-right")[0].style.height="100vh";		
	}
	else if(b!=c){
		document.getElementById('old_miss').innerHTML='';
		document.getElementById('new_miss').innerHTML='';		
		document.getElementById('pass_mismatch').innerHTML='<i class="fa-solid fa-circle-exclamation"></i> Password mismatch with above entry';
		document.getElementsByClassName("centered-right")[0].style.height="450px";
		document.getElementsByClassName("split-right")[0].style.height="100vh";
	}
	else {
		document.getElementById('old_miss').innerHTML='';
		document.getElementById('new_miss').innerHTML='';		
		document.getElementById('pass_mismatch').innerHTML='';
		document.getElementsByClassName("centered-right")[0].style.height="450px";
		document.getElementsByClassName("split-right")[0].style.height="100vh";
		
		var xmlHttp = new XMLHttpRequest();   
	    var param = "OldPass="+a+"&NewPass="+b;
	    xmlHttp.open("POST", "./ChangePassword?"+param, true);
		xmlHttp.send();
		xmlHttp.responseType="text";
		xmlHttp.onreadystatechange = function()
		{
		    if (xmlHttp.readyState==4 && xmlHttp.status ==200 )
		    {
				var obj = JSON.parse(xmlHttp.responseText);
				if(obj.result=="pass")
				{
					document.getElementById("edit").innerHTML='<div>Password changed <br>successfully in the Records</div>';
					document.getElementById("edit").style.display = 'block';					
					document.getElementById("save").innerHTML = '';					
					setTimeout(() => {
						document.getElementById("edit").style.display = 'none';		
						pass_change();
					}, 5000);	
				}
				else if(obj.result=="fail")
				{
					document.getElementById('old_miss').innerHTML='<i class="fa-solid fa-circle-exclamation"></i> '+obj.message;					
				}
			}
		}		
	}	
}


function showPassword1(x)
{
    if(x.className==="fa-solid fa-eye")
    {
       	document.getElementById('oldPass').type='text';
        x.className="fa-solid fa-eye-slash";        
    }
    else if( x.className==="fa-solid fa-eye-slash"){
        document.getElementById('oldPass').type='password';
        x.className="fa-solid fa-eye";
    }
}
function showPassword2(x)
{
    if(x.className==="fa-solid fa-eye")
    {
       	document.getElementById('newPass').type='text';
        x.className="fa-solid fa-eye-slash";
        
    }
    else if( x.className==="fa-solid fa-eye-slash"){
        document.getElementById('newPass').type='password';
        x.className="fa-solid fa-eye";
    }
}
function showPassword3(x)
{
    if(x.className==="fa-solid fa-eye")
    {
       	document.getElementById('conformPass').type='text';
        x.className="fa-solid fa-eye-slash";
    }
    else if( x.className==="fa-solid fa-eye-slash"){
        document.getElementById('conformPass').type='password';
        x.className="fa-solid fa-eye";
    }
}

function edit1()
{
	document.getElementById("icn1").innerHTML="";
	document.getElementById("mail").disabled=false;
	document.getElementsByClassName("centered-right")[0].style.paddingTop="40px";
	document.getElementById("edit").style.display = 'none';
	document.getElementById("edit").innerHTML = '';	
	document.getElementById("save").innerHTML='<button id="change" onclick="save()" >SAVE CHANGES</button>';		
}
function edit2()
{
	document.getElementById("icn2").innerHTML="";
	document.getElementById("name").disabled=false;
	document.getElementsByClassName("centered-right")[0].style.paddingTop="40px";
	document.getElementById("edit").style.display = 'none';
	document.getElementById("edit").innerHTML = '';
	document.getElementById("save").innerHTML='<button id="change" onclick="save()" >SAVE CHANGES</button>';
}
function edit3()
{
	document.getElementById("icn3").innerHTML="";
	document.getElementById("dob").disabled=false;
	document.getElementsByClassName("centered-right")[0].style.paddingTop="40px";
	document.getElementById("edit").style.display = 'none';
	document.getElementById("edit").innerHTML = '';
	document.getElementById("save").innerHTML='<button id="change" onclick="save()" >SAVE CHANGES</button>';
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
			window.location.replace("./index.html");
		}
	}
}

