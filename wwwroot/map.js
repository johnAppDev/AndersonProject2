var map;
var markersGroup;
var radius = 5;
var i = 0;
var editing = false;
var placeIncrement = 0.00005;
var originalIncrement=placeIncrement;
var boundlat = 37.000150
var boundlong = -103.002329
var boundlat2 = 33.129055
var boundlong2 = -89.898810
var northWest = L.latLng(boundlat, boundlong);
var southEast = L.latLng(boundlat2, boundlong2);
var bounds = L.latLngBounds(northWest, southEast);
function createMap(lat, long, zoom){
     map = L.map('map').setView([lat, long], zoom);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 30,
        minZoom: 6,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    markersGroup = L.layerGroup();
    map.addLayer(markersGroup);
    map.setMaxBounds(bounds);
}

map.on('drag', function() {
    map.panInsideBounds(bounds, { animate: false });
});

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
    var buildingIcon = L.icon({
        iconUrl: 'facility.png',
    
        iconSize:     [50, 64], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [25, 35], // point of the icon which will correspond to marker's location
        shadowAnchor: [40, 62],  // the same for the shadow
        popupAnchor:  [0, -10] // point from which the popup should open relative to the iconAnchor
    });
    var circle = L.marker( [lat + latIncrement, long +longIncrement], {
        draggable: 'true',
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: radius,
        icon: buildingIcon
    }).addTo(markersGroup);
    var new_popup = L.popup({"autoClose": false, "closeOnClick": false});
    new_popup.setContent(id);
    circle.bindPopup(new_popup).openPopup();
    //circle.bindPopup({"autoClose": false, "closeOnClick": null}).setContent( "Index: " +i +", "+id).openPopup();
    i = i+1;
    placeIncrement += originalIncrement;
}