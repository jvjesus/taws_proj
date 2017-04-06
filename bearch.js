// Nome do utilizador a analisar
var targetUserName;
var selector;
var apikey= "Z2p4KF8ZlYHtNFzFhzL3XEsP2XlHphwf";
var nomes;

// Array associativo com nome do utilizador como chave e valor de amizade como valor
var amigos = {};
var interesses = {};
var users_url = "https://www.behance.net/v2/users/";
var fiedls_url = "https://www.behance.net/v2/fields/";



$(document).ready(function(){
  console.log("Ready!");
  //selector = $('#selectOne option:contains("City")').val();



  $( "select" )
    .change(function() {
      selector = $( "select option:selected").val();
      //selector.each(function() {
        console.log(selector);
        if(selector == "city"){
          $("#textinput").show();
          $(".interest").hide();


       }

       if(selector == "interest"){
        $("#textinput").hide();
        $(".interest").show();
        getFieldsInfo();
        //new selector with for to check all interest areas
        }

      if(selector == "user"){
        $("#textinput").show();
        $(".interest").hide();

        //optional: add effect (search box grow and get
        //back to the same size in 0.4s)

       $("#query").on("keypress", function(event){
         console.log(event.keyCode);
           if(event.keyCode == 13){
             event.preventDefault();
               $("#load").hide();
               search();
          }
       });

       $("#query").on("keyup", function(event){
         event.preventDefault();
       });
     }

    //  });
    })
.trigger( "change" );

});


function search(){
	targetUserName = $("#query").val();
  $("h1").hide();
  $("#textinput").hide();
  $("#selectOne").hide();
  $('#search').css("height", "0px");
	getUserInfo();
}

function getUserInfo(){


    //implementar: pedir informação básica do utilizador à API
    //$.get(www.behance.net/v2/users/{targetUserName}?api_key={key},data);
    //$.get(, key)
    $.ajax({
      url: users_url + targetUserName,
      dataType: "jsonp",
      data: {api_key: apikey},
      timeout: 1500,
      success: processUserInfo,
      error: logError("a procurar utilizador")
    });
}

function processUserInfo(response){

    //implementar: processar dados do utilizador (response) e mostrá-los
  /*  if(response.user.username == "") {
        logError("a procurar utilizador");
    } else {*/

        targetUserName = response.user.username;

        var nome = response.user.display_name;
        var cidade = response.user.city;
        var imagem_url = response.user.images[276];
        var interesses = response.user.fields;

        $(".userResults").append("<div id='quad'> <h1>" + nome +
         "<br> </h1> <img id='userImage' src=" + imagem_url
         + "> <br><p><b>Cidade: </b>"+ cidade +
         "<br><b>Interesses: </b>" + interesses +"</p></div>");
        //getUserFriends();
    //}
    //implementar: chamar getUserFrieds()

}

function getUserFriends(){

    log("Obter amigos de "+targetUserName+" ...");

    //implementar: pedir followers e followees
    $.ajax({
        url: users_url + targetUserName + "/followers",
        dataType: "jsonp",
        data: {api_key: apikey},
        timeout: 1500,
        success: processUserFollowers,
        error: logError("a procurar utilizador")
    });
    $.ajax({
        url: users_url + targetUserName + "/following",
        dataType: "jsonp",
        data: {api_key: apikey},
        timeout: 1500,
        success: processUserFollowees,
        error: logError("a procurar utilizador")
    });
}

function processUserFollowers(response){

    console.log(response);
    log("Processar seguidores de "+targetUserName+" ...");

    $("#do").append("<br><b>Followers:</b> </br>");
    for(i=0;i<response.followers.length; i++){
        amigos[i]={
          nomes: response.followers[i].username,
          pontos:10
        }
        $("#content").append(response.followers[i].username + ", ");
    //implementar: processadores os seguidores e actualizar o array associativo amigos
    }
  if(amigos.length==response.followers.length){
    updateTable();
  }
}

function processUserFollowees(response){

    log("Processar seguidos por utilizador "+targetUserName+" ...");
    $("#content").append("<br><b>Following:</b> </br>");
    //para o caso da rede distinguir entre seguidos e seguidores
    for(i=0;i<response.following.length; i++) {
        for(n=0; n<amigos.length; n++){
            if(response.following[i].username == amigos[n].nome) {
                amigos[n].pontos = amigos[n].pontos + 6;
            }
        }
        $("#content").append(response.following[i].username + ", ");
    }
}

function log(message){
	$("#status").append(message + "<br>");
}

function logError(actividade){
	return function(data)
	{
		$("#status").append("Erro ao " + actividade + ": " + data.statusText + "<br/>");
		searchAgain();
	}
}

function searching(){
	$("#search").hide();
	$("#load").show();
	$("#status").empty();

	log("Procurando informação sobre " + targetUserName);
}

function searchAgain(){
	$("#search").show();
	$("#load").hide();
}

function updateTable(){

	$("#load").hide();
	$("#table").html("<table></table>");
	$("#table>table").append("<tr><th>Amigo</th><th>Compatibilidade</th></tr>");

    //implementar: ordenar amigos por compatibilidade e mostrar apenas primeiros 10

    for(i=0;i<amigos.length;i++){
        if(i<9){
		  $("#table>table").append("<tr><td>" + amigos[i].nome + "</td><td>" + amigos[i].pontos + "</td></tr>");
        }
    }


	$("#table>table>tbody>tr>*").css("border", "1px solid");
	$("#table>table>tbody>tr>td:first-child").width("150px");
	$("#table>table>tbody>tr>td:last-child").width("60px");
}
