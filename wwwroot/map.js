var map;
var markersGroup;
var radius = 5;
var i = 0;
var editing = false;


function createMap(lat, long, zoom){
     map = L.map('map').setView([lat, long], zoom);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 30,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    markersGroup = L.layerGroup();
    map.addLayer(markersGroup);
    map.on('click', function(e){
        if(editing)
        {
           var circle = L.circle( e.latlng, {
                draggable: 'true',
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: radius
            }).addTo(markersGroup);
            circle.bindPopup("Index: " +i).openPopup();
            i = i+1;
            //Circle 
            circle.on('click', function(){
                map.removeLayer(circle);
            })
        }
        return;
    });
    

}
function setRadius(newRadius){
    radius = newRadius;
}
function  toggleEditing(){
    editing = !editing;
}