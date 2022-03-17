function checkInput(int)
{
  var n = /^[0-9]+$/;
  return (n.test(int));
}

function clearForm()
{
	document.getElementById("postCode1").value="";
	document.getElementById("postCode2").value="";
	document.getElementById('address').value="";
	document.getElementById('district').value="";
	document.getElementById('city').value="";
	document.getElementById("state").value="";
	document.getElementById("weather").value="";
} 

function configPostCode1()
{
  var postCode1 = document.getElementById("postCode1");
  var postCode2 = document.getElementById("postCode2");
  
  //Only numbers allowed
  if(!checkInput(postCode1.value))
  {
	var text = postCode1.value.substring(0,postCode1.value.length-1);
	postCode1.value = text;
  }      
  
  //Auto-Tab PostCode1
  if(postCode1.value.length == 5)
  {
	postCode2.select();
  }
}

function configPostCode2()
{
  var postCode2 = document.getElementById("postCode2");
  
  //Only numbers allowed
  if(!checkInput(postCode2.value))
  {
	var text = postCode2.value.substring(0, postCode2.value.length-1);
	postCode2.value = text;
  }

  //Auto-Tab PostCode2
  if(postCode2.value.length == 3)
  {
	postCodeValidation();
  }        
}

function postCodeValidation()
{
  var postCode1 = document.getElementById("postCode1");
  var postCode2 = document.getElementById("postCode2");
  if(postCode2.value.length == 3 && postCode1.value.length == 5)
  {
	var postCode = postCode1.value + postCode2.value;
	
	//Post code validation
	var cPostCode = /^[0-9]{8}$/;        
	if(cPostCode.test(postCode))
	{
	getPostCode(postCode);
	}
	else
	{
	  alert("Invalid Post Code!!!");
	  postCode1.value = "";
	  postCode2.value = "";
	  postCode1.select();
	}
  }
}

function fillFieldsPostCode(element) 
{
	if (!("erro" in element)) 
	{		
		document.getElementById('address').value=(element.logradouro);
		document.getElementById('district').value=(element.bairro);
		document.getElementById('city').value=(element.localidade);
		document.getElementById('state').value=(element.uf);	
		
		//New JS Element: OpenWeather API
		var url = document.createElement("script");	

  		//Callback sync
		url.src = `https://api.openweathermap.org/data/2.5/weather?q=${element.localidade},BR&units=metric&callback=fillFieldsWeather&appid=64e5f7c980db71f1ee4f907e0551a8e1`;  		
		document.body.appendChild(url);
	} 
	else 
	{
		clearForm();
		alert("Post Code not found!!!");
	}
	
	document.getElementById("btnSearch").disabled  = false;
	document.getElementById("postCode1").disabled  = false;
	document.getElementById("postCode2").disabled = false;
	document.getElementById("btnSearch").innerHTML="Search";	
    
}

function fillFieldsWeather(element)
{
	document.getElementById('weather').value=(element.main.temp);	
}