function getPostCode(postCode)
{ 
  document.getElementById("btnSearch").disabled = true;
  document.getElementById("postCode1").disabled = true;
  document.getElementById("postCode2").disabled = true;
  document.getElementById("btnSearch").innerHTML = "Loading...";   
  
  //New JS Element: ViaCep API
  var url = document.createElement("script");
  
  //Callback sync
  url.src = `https://viacep.com.br/ws/${postCode}/json/?callback=fillFieldsPostCode`;  
  document.body.appendChild(url);   
}

