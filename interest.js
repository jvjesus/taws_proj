// Array associativo com nome do utilizador como chave e valor de amizade como valor
function getFieldsInfo(){


    //implementar: pedir informação básica do utilizador à API
    $.ajax({
        url: fiedls_url,
        dataType: "jsonp",
        data: {api_key: apikey},
        timeout: 1500,
        success: processFieldsInfo,
        error: logError("a procurar interesses")
    });

}

function processFieldsInfo(response){

  for(i=0;i<response.fields.length; i++){
      interesses[i]={
        nomes: response.fields[i].name,
        id: response.fields[i].id
        //$("#int").append(new Option(response.fields[i].name, response.fields[i].name));
      }
        $("#int").append("<option value='"+ response.fields[i].name +"'>"+ response.fields[i].name +"</option>");
      //$(".interest").append(response.fields[i].id + ", "+response.fields[i].name);
  }
}
