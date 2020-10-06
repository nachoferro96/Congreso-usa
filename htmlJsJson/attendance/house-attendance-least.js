var data1 = data.results[0].members;


var statistisc = {
"NumbersOfDemocrats": 0,
"NumbersOfRepublicans": 0,
"NumbersOfIndependents": 0,
"%votedwithpartydemocrat": 0,
"%votedwithpartyrepublican": 0,
"%votedwithpartyindependent": 0,

}


// aqui se calcularan los miembros de cada partido 
//estas variables estan guardando objetos

var democrats = [];
var republicans = [];
var independets = [];


console.log(democrats);


function MembersofParty (data1) {
    data1.forEach(members=>{
        if (members.party=="D"){
            democrats.push(members);
        }
        else if (members.party=="R"){
            republicans.push(members);
        }
        else {
            independets.push(members);
        }
    })
    return democrats;
}

MembersofParty(data1);

//aqui calcule la cantidad. sacando la longitud de cada objeto.

statistisc.NumbersOfDemocrats = democrats.length;
statistisc.NumbersOfRepublicans = republicans.length;
statistisc.NumbersOfIndependents = independets.length;


console.log(statistisc.NumbersOfDemocrats);
console.log(statistisc.NumbersOfRepublicans);
console.log(statistisc.NumbersOfIndependents);



// aqui se calcularan los porcentajes de votos



var votesdemocrats = 0 ; 
var votesrepublicans = 0;
var votesindependents = 0;

function sumofvotesD (democrats) {
    democrats.forEach(vdemocrats=>{
    votesdemocrats=votesdemocrats+vdemocrats.votes_with_party_pct
    return votesdemocrats;
    })
}

function sumofvotesR (republicans) {
    republicans.forEach(vrepublicans=>{
    votesrepublicans=votesrepublicans+vrepublicans.votes_with_party_pct
    return votesrepublicans;
    })
}

function sumofvotesI(independets) {
    independets.forEach(vindependets=>{
    votesindependents=votesindependents+vindependets.votes_with_party_pct
    return votesindependents;
    })
}

sumofvotesD(democrats);

sumofvotesR(republicans);

sumofvotesI(independets);

// le puse 0, porque me da fiaca hacer un if
//el if pregunta si la longitud de independents es cero, en caso afirmativo devolver 0
function averageofvotes (votesdemocrats,votesrepublicans,votesindependents){
    promedioD= votesdemocrats/democrats.length
    promedioR= votesrepublicans/republicans.length
    promedioI= 0
  return promedioD
}
averageofvotes(votesdemocrats,votesrepublicans,votesindependents);
console.log(promedioD);
console.log(promedioR);
console.log(promedioI);

// hasta aca se termino de hacer la funcion para la tabla que va a estar en las 4 paginas

// Esta funcion ordena de mayor a menos o de menor a mayor el json segun los datos que reste 
// entre si (ejemplo "votes_against_party_pct")



function compare (a, b) {
    return b.missed_votes_pct - a.missed_votes_pct;
}

data1.sort(compare);
console.log(data1);






// cree un objeto con el 10% de los diputados llamado "diezporciento" 
var diezporciento = [];

var percent = data1.length*0.1;

function porcentaje () {
    for (i = 0; i < percent; i++ ){
        diezporciento.push(data1[i]);
    }
}

porcentaje(data1);


// la parte de arriba sirve para crear la lista del 10%









// ---------------------- TABLAS -----------------------------

//        1) NUMERO DE REPRESENTANTES Y % DE VOTOS 
//        2) 10% MENOS LEAL
//        3) 10% MAS LEAL





// TABLA NUMERO (1)

var html2 = tabladinamicaglance(data1);
document.getElementById("glance").innerHTML = html2;

function tabladinamicaglance(abc){
    
        return "<tr>" + 
        "<td>" + "Democrats" + "</td>" +
        "<td>" + democrats.length + "</td>" +
        "<td>" + promedioD + "%" + "</td>" +
        "</tr>" + 
        "<tr>" +
        "<td>" + "Republicans" + "</td>" + 
        "<td>" + republicans.length + "</td>" +
        "<td>" + promedioR + "%" + "</td>" +
        "</tr>" +
        "<tr>" + 
        "<td>" + "Independents" + "</td>" +
        "<td>" + independets.length + "</td>" +
        "<td>" + promedioI + "%" + "</td>" + 
        "</tr>"


}





// TABLA NUMERO (2)
var html = tabladinamicamenos(diezporciento);
document.getElementById("leastengaged").innerHTML = html;


function tabladinamicamenos(abc){
    return diezporciento.map(miembros=>{
        return "<tr>" + 
        "<td>" + miembros.first_name + " " + (miembros.middle_name || " " ) + " " +
        miembros.last_name + "</td>" +
        "<td>" + miembros.missed_votes + "</td>" +
        "<td>" + miembros.missed_votes_pct + "%" + "</td>" +
        "</tr>"
    }).join("")
}



// TABLA NUMERO (3)

// // EN EL HOUSE-ATTENDANCE-MOST