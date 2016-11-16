var count=0;
var lagen = [];
var kleuren;
var URL;
var Naam;
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
    $(document).ready(function () {
        $(".cb_layer").click( function () {
            var i = $(this).index();
            alert(i);
        });
        makeMap();
        // in beeld brengen
        $('#menu').on('mouseenter', function () {
            $(this).clearQueue();
            $(this).animate(

    {
        left: '5px'
    }, 1500, 'linear');
        });
        // uit beeld halen
        $('#serviceToevoegen').on('click', function () {
            $("#menu").animate(

        {
            left: '-250px'
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
function sT()
{
    URL = { url:$('#webserviceURL').val()};
    Naam = $('#webserviceNaam').val();
    $.ajax(
    {
        url: 'PHP/geoproxy.php',
        method: 'post',
        dataType: 'json',
        data: URL
    })
    .done(function (data) {
        getRandomKleur();
        var laag = L.geoJson(data, {
            style: function (feature) {
                return { color: kleuren };
            }
        }).addTo(map);
        lagen.push(laag);
        count++;
        makeLayerList();
    })
    .fail(function () {
        console.log("kan data niet ophalen");
    });
}
function getRandomKleur() {
    var letters = 'ABCDEF0123456789';
    var kleur = '#';
    for (var i = 0; i < 6; i++ ) {
        kleur += letters[Math.floor(Math.random() * 16)];
    }
    kleuren = kleur;
}
function makeLayerList()
{
    var label = '<label for="cb'+count+'">' + Naam + '</label>';
    var li = '<li>'+label+'<input type="checkbox" class="cb_layer" id="cb' + count + '" checked=checked>';
    $('#serviceLijst').append(li);
    $("#serviceLijst input:checkbox").on("click", function () {
        var index = $("#serviceLijst input:checkbox").index(this);
        console.log(this);
        if (this.checked) {
            map.addLayer(lagen[index]);
        }
        else {
            map.removeLayer(lagen[index]);
        }
    });
}