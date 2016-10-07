var mapOptions = {
  zoomAnimation: true,
  zoomAnimationTreshold: 5,
  zoomControl: false,
  center: [0,0],
  zoom: 3,
  minZoom: 3,
  worldCopyJump:true
};
var OpenMapSurfer_Grayscale = L.tileLayer('http://korona.geog.uni-heidelberg.de/tiles/roadsg/x={x}&y={y}&z={z}', {
	maxZoom: 19,
	attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

var openStreetMap = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});

var satellietLayer = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });
$(document).ready(function ()
{
      makeMap();
        // in beeld brengen
    $('#menu').on('mouseenter', function ()
    {
        $(this).clearQueue();
        $(this).animate(

    {
        left: '5px'
    }, 1500, 'linear');
    });
    // uit beeld halen
    $('#menu').on('mouseleave', function ()
    {
        $(this).animate(

        {
            left: '-170px'
        }, 1000, 'linear')
    });
});

function makeMap()
{
map = new L.Map('map', mapOptions);
OpenMapSurfer_Grayscale.addTo(map);
}
function backgroundSwitch()
{
    var selectedItem=$("#achtergrond").val();
    switch(selectedItem)
    {
        case "grijs":
            map.removeLayer(openStreetMap);
            map.removeLayer(satellietLayer);
            map.addLayer(OpenMapSurfer_Grayscale);
            break;
        case "osm":
            map.removeLayer(OpenMapSurfer_Grayscale);
            map.removeLayer(satellietLayer);
            map.addLayer(openStreetMap);
            break;
        case "satelliet":
            map.removeLayer(OpenMapSurfer_Grayscale);
            map.removeLayer(openStreetMap);
            map.addLayer(satellietLayer);
            break;
    }
}