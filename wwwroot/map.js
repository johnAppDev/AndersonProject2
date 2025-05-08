var map;
var localmap;
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
var dotNetObject
function createMap(lat, long, zoom, objectReference){
    if(map != null){
        map.remove();
    }
     map = L.map('map').setView([lat, long], zoom);
     dotNetObject = objectReference;
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 30,
        minZoom: 6,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    markersGroup = L.layerGroup();
    map.addLayer(markersGroup);
    map.setMaxBounds(bounds);
}

map.on('drag', function(event) {
    map.panInsideBounds(bounds, { animate: false });
    dotNetObject.invokeMethodAsync('storeLocation', event.target.id, "global", event.latLng.lat, event.latLng.lng);
});

function setLocalMap(){
    map.remove();
    map = L.map('map', {
        crs: L.CRS.Simple, // CRS.Simple, which represents a square grid:
        minZoom: -2,
        maxZoom: 1
      }).setView([300,300]);
    var bounds = [L.latLng(0, 0) ,L.latLng( 527, 740)]
    var image = L.imageOverlay('floor-plan.jpg', bounds)
    image.addTo(map)
}

function massPlace(lat, long, id){
    dotNetObject.invokeMethodAsync('storeLocation', id, "global", lat, long);
    var buildingIcon = L.icon({
        iconUrl: 'facility.png',
    
        iconSize:     [50, 64], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [25, 35], // point of the icon which will correspond to marker's location
        shadowAnchor: [40, 62],  // the same for the shadow
        popupAnchor:  [0, -10] // point from which the popup should open relative to the iconAnchor
    });
    var circle = L.marker( [lat, long ], {
        draggable: 'true',
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: radius,
        icon: buildingIcon,
        buildingId: id
    })
    circle.on('click', function(event){
        dotNetObject.invokeMethodAsync('SetMap', id);
    });
    circle.addTo(markersGroup);
    var new_popup = L.popup({"autoClose": false, "closeOnClick": false});
    new_popup.setContent(id);
    circle.bindPopup(new_popup).openPopup();
    //circle.bindPopup({"autoClose": false, "closeOnClick": null}).setContent( "Index: " +i +", "+id).openPopup();
}