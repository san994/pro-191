let latitude,longitude,destination;

$(document).ready(function(){
    alert("please turn on the device location");
    initGeolocate()
})

function initGeolocate(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success);
    }else{
        alert("sorry")
    }
}

$(function(){
    $("#tour-button").click(function(){
        window.location.href = `ar_location_tour.html?source=${latitude};${longitude}&destination=${destination[1]};${destination[0]}`;
    })
})

function success(position){
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    // initializing map box
    mapboxgl.accessToken = "pk.eyJ1IjoiYXBvb3J2ZWxvdXMiLCJhIjoiY2ttZnlyMDgzMzlwNTJ4a240cmEzcG0xNyJ9.-nSyL0Gy2nifDibXJg4fTA";

    var map = new mapboxgl.Map({
        container:"map",
        style:"mapbox://styles/mapbox/streets-v11",
        center:[longitude,latitude],
        zoom:16
    })

    map.addControl(
        new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
        }).on("result",function(e){
            destination = e.result.center
            console.log(destination)
        })
    );
}
