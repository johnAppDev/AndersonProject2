var map
function createMap(lat, long, zoom){
     map = L.map('map').setView([lat, long], zoom);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
}
function addPin(lat, long){
    var marker = L.marker([lat, long]).addTo(map);
    marker.bindPopup("<img src=\"https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHM2NXl2M3Q3YXNheTh6aHFudGk4NHNoaHZybmFvMHVvOGcxOTlveSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/nDSlfqf0gn5g4/giphy.gif\" alt=\"Computer man\" style=\"width:48px;height:48px;\"><br>This is how readers and panels will be displayed.").openPopup();
}