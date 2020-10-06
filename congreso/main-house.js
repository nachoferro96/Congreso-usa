var html = tabladinamica(data);
document.getElementById("house").innerHTML = html;

function tabladinamica(abc){
    return data.results[0].members.map(miembros=> {
        return "<tr>" +
        "<td><a href='" + miembros.url + "'>" 
        + miembros.first_name + " " + (miembros.middle_name || " ") + " " + 
        miembros.last_name  + "</a>" +  "</td>" +
        "<td>" + miembros.party + "</td>" + 
        "<td>" + miembros.state + "</td>" + 
        "<td>" + miembros.seniority + "</td>" +
        "<td>" + miembros.votes_with_party_pct + "%" + "</td>"
        "</tr>"
    }).join("")}
