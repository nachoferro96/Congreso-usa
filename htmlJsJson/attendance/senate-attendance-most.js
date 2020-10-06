var data2 = datad2.results[0].members;


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




function MembersofParty (data1) {
    data2.forEach(members=>{
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

MembersofParty(data2);

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
    return a.missed_votes_pct - b.missed_votes_pct;
}

data2.sort(compare);






// cree un objeto con el 10% de los diputados llamado "diezporciento" 
var diezporciento2 = [];

var percent2 = data2.length*0.1;

function porcentaje2 () {
    for (i = 0; i < percent2; i++ ){
        diezporciento2.push(data2[i]);
    }
}

porcentaje2(data2);


// la parte de arriba sirve para crear la lista del 10%









// ---------------------- TABLAS -----------------------------

//        1) NUMERO DE REPRESENTANTES Y % DE VOTOS ( EN EL HOUSE-ATTENDANCE-LEAST)
//        2) 10% MENOS LEAL ( EN EL HOUSE-ATTENDANCE-LEAST)
//        3) 10% MAS LEAL





// TABLA NUMERO (1)
// EN EL HOUSE-ATTENDANCE-LEAST




// TABLA NUMERO (2)
// EN EL HOUSE-ATTENDANCE-LEAST



// TABLA NUMERO (3)
var html3 = tabladinamicamas(diezporciento);
document.getElementById("mostengaged").innerHTML = html3;



function tabladinamicamas(abc){
    return diezporciento2.map(miembros=>{
        return "<tr>" + 
        "<td>" + miembros.first_name + " " + (miembros.middle_name || " " ) + " " +
        miembros.last_name + "</td>" +
        "<td>" + miembros.missed_votes + "</td>" +
        "<td>" + miembros.missed_votes_pct + "%" + "</td>" +
        "</tr>"
    }).join("")
}

console.log(data2);