var app = new Vue({
    el: '#app',
    data: {
    members: [],
    statistics: {
    votesdemocrats: 0,
    votesrepublicans: 0,
    votesindependents: 0,
    promediovotosD: 0,
    promediovotosR: 0,
    promediovotosI: 0,    
    democrats: [],
    numerodedemocratas: 0,
    republicans: [],
    numeroderepublicanos: 0,
    independents: [],
    numerodeindependientes: 0,
    least_engaged: [],
    most_engaged: [],
    least_loyal: [],
    most_loyal: [],
    diezPercent: 0,
    totaldemocratas: [],
    totalrepublicans: [],
    totalindependents:[],


}
}})
        



       fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {
      // method: "GET",
      headers: new Headers({
        "X-API-Key": "66Bvf2Vy0QHVjtIIJnvot4TeLW79EiutJDArtolK"
      })
    })
      .then(res => res.json())
      .then(data => {
        app.members = data.results[0].members;
        app.diezPercent = percent(app.members)
        app.democrats = app.members.filter(cantidaddemocratas);
        app.republicans = app.members.filter(cantidadrepublican);
        app.independents = app.members.filter(cantidadindependents);
        funciones()
        
      });
    




function cantidadrepublican (member){
    return member.party == "R";
}

function cantidaddemocratas (member){
    return member.party == "D";
}

function cantidadindependents (member){
    return member.party == "I"
}


function percent (array){
    return array.length * 0.10;
}




function leastloyal(array, percent){
    var votes = [];
    array.sort(function (a, b){
        return a.votes_with_party_pct - b.votes_with_party_pct;
    });
votes = array.slice(0, percent);

return votes;

}

function mostloyal(array, percent){
    var votes = [];
    array.sort(function (a, b){
        return b.votes_with_party_pct - a.votes_with_party_pct;
    });
votes = array.slice(0, percent);

return votes;

}

function leastengaged(array, percent){
    var votes = [];
    array.sort(function (a, b){
        return b.missed_votes_pct - a.missed_votes_pct;
    });
votes = array.slice(0, percent);

return votes;

}

function mostengaged(array, percent){
    var votes = [];
    array.sort(function (a, b){
        return a.missed_votes_pct - b.missed_votes_pct;
    });
votes = array.slice(0, percent);

return votes;

}






function avaragevotes(party){
    var sum = 0;
    party.forEach(votos=>{
        sum=sum+votos.votes_with_party_pct;
    })
    var avarage = sum/party.length;
    if (party.length == 0){
        return 0;
    }
        else{
        return avarage;     
        }
    }




function funciones(){
    app.statistics.numerodedemocratas = app.democrats.length;
    app.statistics.numeroderepublicanos = app.republicans.length;
    app.statistics.numerodeindependientes = app.independents.length;
    app.statistics.least_engaged = leastengaged(app.members, app.diezPercent); 
    app.statistics.most_engaged = mostengaged(app.members, app.diezPercent);
    app.statistics.least_loyal = leastloyal(app.members, app.diezPercent);
    app.statistics.most_loyal = mostloyal(app.members, app.diezPercent);
    app.statistics.promediovotosD = avaragevotes(app.democrats);
    app.statistics.promediovotosI = avaragevotes(app.independents);
    app.statistics.promediovotosR = avaragevotes(app.republicans);
    app.statistics.totaldemocratas.push({"party": "Democrats", "numero":"" + app.statistics.numerodedemocratas,"promedio": "" + app.statistics.promediovotosD});
    app.statistics.totalrepublicans.push({"party":"Republicans","numero":"" + app.statistics.numeroderepublicanos ,"promedio": "" + app.statistics.promediovotosR});
    app.statistics.totalindependents.push({"party":"Independents","numero": "" + app.statistics.numerodeindependientes ,"promedio": "" + app.statistics.promediovotosI});
    
}










/*


"https://api.propublica.org/congress/v1/113/senate/members.json"



var app = new Vue({
el: '#app',
data: {
members: [],
statistics: {
"numberOfDemocrats": 0,
"numberOfRepublicans": 0,
"numberOfIndependents": 0,

"averageVotesWithPartyForDemocrats": 0,
"averageVotesWithPartyForRepublicans": 0,
"averageVotesWithPartyForIndependents": 0,

"leastEngagedNames": 0,
"mostEngagedNames": 0,

"leastLoyalNames": 0,
"mostLoyalNames": 0,

},
democrat: [],
independent:[],
republican: [],
diezPercent: 0,
}
});


fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {
method: "GET",
headers: new Headers({
"X-API-Key": 'adZUIoKPgkk0ecKXE0ztm9ErLNJgARlsKHBhTBYa'
})
}).then(function (response) {
if (response.ok)
return response.json();
throw new Error(response.statusText);
}).then(function (json) {
console.log(json);
app.members = json.results[0].members
app.diezPercent = Math.round(app.members.length * 0.10);
app.republican = app.members.filter(cantidadPartyR);
app.democrat = app.members.filter(cantidadPartyD);
app.independent = app.members.filter(cantidadPartyI);
allMyStats();
//htmlSenatorsFunction();
//htmlLeastEngFunction();
//htmlMostEngFunction();

})


function cantidadPartyR(member) {
return member.party == "R";
}

function cantidadPartyD(member) {
return member.party == "D";
}

function cantidadPartyI(member) {
return member.party == "I";
}

function averageVotes(party) {
var sum = 0;
for (i = 0; i < party.length; i++) {
sum += party[i].votes_with_party_pct;
}
var average = Math.round(sum / party.length * 100) / 100;
if (party.length == 0) {
return 0;
} else {
return average;
}
}

function lowestTenPercentOfVoters(array, percent) {
var votes = [];
array.sort(function (a, b) {
return b.missed_votes_pct - a.missed_votes_pct;
});

votes = array.slice(0, percent);

console.log(array);
return votes;
}

function highestTenPercentOfVoters(array, percent) {
var votes = [];
array.sort(function (a, b) {
return a.missed_votes_pct - b.missed_votes_pct;
});
votes = array.slice(0, percent);

console.log(array);
return votes;

}


function mostLoyal(array, percent) {
var votes = [];
array.sort(function (a, b) {
return a.votes_with_party_pct - b.votes_with_party_pct;
});
votes = array.slice(0, percent);

console.log(array);
return votes;
}

function lessLoyal(array, percent) {
var votes = [];
array.sort(function (a, b) {
return b.votes_with_party_pct - a.votes_with_party_pct;
});
votes = array.slice(0, percent);

console.log(array);
return votes;
}

function allMyStats() {
app.statistics.numberOfDemocrats = app.democrat.length;
app.statistics.numberOfRepublicans = app.republican.length;
app.statistics.numberOfIndependents = app.independent.length;

app.statistics.averageVotesWithPartyForDemocrats = averageVotes(app.democrat);
app.statistics.averageVotesWithPartyForRepublicans = averageVotes(app.republican);
app.statistics.averageVotesWithPartyForIndependents = averageVotes(app.independent);

app.statistics.leastEngagedNames = lowestTenPercentOfVoters(app.members, app.diezPercent);
app.statistics.mostEngagedNames = highestTenPercentOfVoters(app.members, app.diezPercent);

app.statistics.leastLoyalNames = lessLoyal(app.members, app.diezPercent);
app.statistics.mostLoyalNames = mostLoyal(app.members, app.diezPercent);

}

//function htmlSenatorsFunction() {

// var htmlSenator = "";

// htmlSenator = htmlSenator + "Democrats" + democrat.length + "" + statistics.averageVotesWithPartyForDemocrats + "%" + "Republicans" + republican.length + "" + statistics.averageVotesWithPartyForRepublicans +
// "%" + "Independents" + independent.length + "" + statistics.averageVotesWithPartyForIndependents + "%";


//document.getElementById("senate-data-at-a-glance").innerHTML = htmlSenator;
//}

function htmlLeastEngFunction() {
var htmlLeastEngaged = "";
for (i = 0; i < statistics.leastEngagedNames.length; i++) {

htmlLeastEngaged = htmlLeastEngaged + "" + statistics.leastEngagedNames[i].first_name + " " + (statistics.leastEngagedNames[i].middle_name || "") + statistics.leastEngagedNames[i].last_name + "" + statistics.leastEngagedNames[i].missed_votes + "" + statistics.leastEngagedNames[i].missed_votes_pct + "%";
var url = statistics.leastEngagedNames[i].url;

}
document.getElementById("senate-data-least-engaged").innerHTML = htmlLeastEngaged;

}

function htmlMostEngFunction() {
var htmlMostEngaged = "";

for (i = 0; i < statistics.mostEngagedNames.length; i++) {

htmlMostEngaged = htmlMostEngaged + "" + statistics.mostEngagedNames[i].first_name + " " + (statistics.mostEngagedNames[i].middle_name || "") + statistics.mostEngagedNames[i].last_name + "" + statistics.mostEngagedNames[i].missed_votes + "" + statistics.mostEngagedNames[i].votes_with_party_pct + "%";
var url = statistics.mostEngagedNames[i].url;
}

document.getElementById("senate-data-most-engaged").innerHTML = htmlMostEngaged;










function getdata(congress){
    const url=
        congress == "senate"
         ? "https://api.propublica.org/congress/v1/113/senate/members.json"
         : "https://api.propublica.org/congress/v1/113/house/members.json";
    fetch(url, {
        headers: new headers({
            "X-API-Key": "66Bvf2Vy0QHVjtIIJnvot4TeLW79EiutJDArtolK"
        })
    })
    .then(res => res.json())
    .then(data=> {
        console.log(data);
    })
} 
getdata(congress);
console.log(data-results[0].members)

var app = new vue({
    el: '#app',
    data: {
        members: [],
        results: {
            glance: {
                democrats: [],
                republicans: [],
                independents: [],
            },
            least_engaged: [],
            most_engaged: [],
            least_loyal: [],
            most_loyal: [],
        }
    }
})*/
