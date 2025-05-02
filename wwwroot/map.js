var map;
var markersGroup;
var radius = 5;
var i = 0;
var editing = false;
var placeIncrement = 0.00005;
var originalIncrement=placeIncrement;


function createMap(lat, long, zoom){
     map = L.map('map').setView([lat, long], zoom);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 30,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    markersGroup = L.layerGroup();
    map.addLayer(markersGroup);
    
    

}
function setRadius(newRadius){
    radius = newRadius;
}
function  toggleEditing(){
    editing = !editing;
}
function massPlace(lat, long, id){
    var latIncrement =0;
    var longIncrement =0;
    if(i%2 ==0 ){
         latIncrement = placeIncrement;
    }else{
         longIncrement = placeIncrement;
    }
    var circle = L.marker( [lat + latIncrement, long +longIncrement], {
        draggable: 'true',
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: radius
    }).addTo(markersGroup);
    var new_popup = L.popup({"autoClose": false, "closeOnClick": null});
    new_popup.setContent("Index: " +i +", "+id);
    circle.bindPopup(new_popup).openPopup();
    //circle.bindPopup({"autoClose": false, "closeOnClick": null}).setContent( "Index: " +i +", "+id).openPopup();
    i = i+1;
    placeIncrement += originalIncrement;
}