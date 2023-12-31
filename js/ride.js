/*global WildRydes _config*/

var WildRydes = window.WildRydes || {};
WildRydes.map = WildRydes.map || {};
let map;

(function rideScopeWrapper($) {
    var authToken;
    WildRydes.authToken.then(function setAuthToken(token) {
        if (token) {
            authToken = token;
        } else {
            window.location.href = '/signin.html';
        }
    }).catch(function handleTokenError(error) {
        alert(error);
        window.location.href = '/signin.html';
    });

    //  requestUnicorn
    //      make the POST request to the server
    function requestUnicorn(pickupLocation) {       //      !!!! 2
        $.ajax({
            method: 'POST',
            url: _config.api.invokeUrl + '/ride',   //      !!!! 3 check out API Gateway
            headers: {
                Authorization: authToken
            },
            data: JSON.stringify({
                PickupLocation: {
                    Latitude: pickupLocation.latitude,
                    Longitude: pickupLocation.longitude
                }
            }),
            contentType: 'application/json',
            success: result => completeRequest(result, pickupLocation),
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Error requesting ride: ', textStatus, ', Details: ', errorThrown);
                console.error('Response: ', jqXHR.responseText);
                alert('An error occurred when requesting your unicorn:\n' + jqXHR.responseText);
            }
        });
    }

    //  completeRequest
    //      a Unicorn has been dispatched to your location
    function completeRequest(result, pickupLocation) {          //  !!!!! 4 request accepted
        var unicorn;
        var pronoun;

        console.log('Response received from API: ', result);
        unicorn = result.Unicorn;
        pronoun = unicorn.Gender === 'Male' ? 'his' : 'her';
        displayUpdate(unicorn.Name + ', your ' + unicorn.Color + ' unicorn, is on ' + pronoun + ' way.', unicorn.Color);

        console.log(pickupLocation);
        addSomeSizzle(pickupLocation);                          //  !!!! 5 now what
        //  get the local weather, find nearby restaurants, movies
        // getWeather(pickupLocation, unicorn)

        animateArrival(function animateCallback() {
            displayUpdate(unicorn.Name + ' has arrived. Giddy up!', unicorn.Color);
            WildRydes.map.unsetLocation();

            $('#request').prop('disabled', 'disabled');
            $('#request').text('Set Pickup');
        });
    }

function addSomeSizzle(loc) {                           //      !!!! 6
    let sizzle = document.querySelector("#sizzle").value;
    let search = sizzle.substring(sizzle.indexOf(':')+1);
    sizzle = sizzle.substring(0,  sizzle.indexOf(':'));
    switch (sizzle) {
        case "weather"  :   weather(search, loc);   break;      //  weather:cityName
        case "apod"     :   NASA(search);           break;      //  apos:date
        case "movies"   :   movies(search);         break;      //  movies:title
    }
}

function weather (cityName, loc) {
    let url;

    if (cityName.length > 0)
        url = `https://api.openweathermap.org/data/2.5/weather?appid=a099a51a6362902523bbf6495a0818aa&units=imperial&q=${cityName}`;
    else
        url = `https://api.openweathermap.org/data/2.5/onecall?appid=a099a51a6362902523bbf6495a0818aa&units=imperial&lat=${loc.latitude}&lon=${loc.longitude}&exclude=minutely,hourly,daily,alerts`;
    fetch(url)
        .then(resp => resp.json())
        .then(weather => {
            if (cityName.length > 0) {
                let cityWX = weather.main;
                displayUpdate(
                `<div class="grid-item">
                    <h4>Date: ${niceTime(weather.dt, weather.timezone)}</h4>
                    <p>Temp: ${cityWX.temp}</h3>
                    <p>Forecast: <img src='https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png' alt=""> ${weather.weather[0].description}</p>
                    <p>Humidity ${cityWX.humidity}% Feels Like ${cityWX.feels_like}</p>
                    <p>Wind at ${weather.wind.speed} mph out of the ${weather.wind.deg}</p>
                    <p>Sunrise: ${niceTime(weather.sys.sunrise, weather.timezone)} / Sunset: ${niceTime(weather.sys.sunset, weather.timezone)}</p>
                    </div>`,"lightgray");
            } else {
                let wx = weather.current;
                displayUpdate(
                `<div class="grid-item">
                    <h4>Date: ${niceTime(wx.dt, weather.timezone_offset)}</h4>
                    <p>Temp: ${wx.temp}</h3>
                    <p>Forecast: <img src='https://openweathermap.org/img/wn/${wx.weather[0].icon}@2x.png' alt=""> ${wx.weather[0].description}</p>
                    <p>Humidity ${wx.humidity}% Feels Like ${wx.feels_like}</p>
                    <p>Wind at ${wx.wind_speed} mph out of the ${wx.wind_deg}</p>
                    <p>Sunrise: ${niceTime(wx.sunrise, wx.timezone_offset)} / Sunset: ${niceTime(wx.sunset, wx.timezone_offset)}</p>
                </div>`,"lightblue");
            }
    });
}

function NASA (date) {
    let url = 'https://api.nasa.gov/planetary/apod?api_key=Aw0TZ7aE7e6WJnh4t7plOXEk1xdbCg45NMqfUX42';

    if (date.length > 0)    url += `&date=${date}`;
    fetch(url)
    .then(response => response.json())  //  wait for the response and convert it to JSON
    .then(apod => {                     //  with the resulting JSON data do something
        let media;
        if (apod.media_type === 'image') 
            media = `<img src="${apod.hdurl}" height="100px" alt="">`;
        else
            media = `<iframe width="240" height="120" src="${apod.url}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>`;
        displayUpdate(
            `<div class="grid-item">
            <h3>Date: ${apod.date}</h3>
            <h5>Title: ${apod.title}</h3>
            <p>${media}</h3>
            <p>${apod.explanation}</p>
            </div>`,"lightyellow");
    });
}

function movies(title) {
    let url = `https://www.omdbapi.com/?s=${title}&apikey=2c791b47`;

    fetch(url)
    .then(response => response.json())
    .then(movies => {
        let innerHTML = "";

        //  if you want more details click on the movie image
        for (let movie of movies.Search) {
            innerHTML +=
                `<div class="grid-item">
                    <a href="https://www.imdb.com/title/${movie.imdbID}"><h5>${movie.Title}</h5></a>
                    <img src='${movie.Poster}' height="100px" alt="">
                </div>`;
        }
        displayUpdate(`<div class="grid-item"> ${innerHTML} </div>`,"lightgreen");
    });
}

function niceTime(dateTime, offset) {
    let day = new Date(dateTime * 1000 + offset).toLocaleString();
    let hour = day.indexOf(' ') + 1;
    let time = day.substring(hour);
    time = time.substring(0, time.lastIndexOf(':')) + time.substring(time.length-3)
    return time;
}
    
// Register click handler for #request button
$(function onDocReady() {
    $('#request').click(handleRequestClick);

        WildRydes.authToken.then(function updateAuthMessage(token) {
            if (token) {
                displayUpdate('You are authenticated. Click to see your <a href="#authTokenModal" data-toggle="modal">auth token</a>.');
                $('.authToken').text(token);
            }
        });

        if (!_config.api.invokeUrl) {
            $('#noApiMessage').show();
        }

        window.navigator.geolocation
            .getCurrentPosition(setLocation);

        //  put the map behind the updates list
        document.getElementById("map").style.zIndex = "10";

        function setLocation(loc) {
            map = L.map('map').setView([loc.coords.latitude, loc.coords.longitude], 13);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© OpenStreetMap'
            }).addTo(map);

            WildRydes.map.center = {latitude: loc.coords.latitude, longitude: loc.coords.longitude};
            let b = map.getBounds();        //  TODO moved
            WildRydes.map.extent = {minLat: b._northEast.lat, minLng: b._northEast.lng,
                maxLat: b._southWest.lat, maxLng: b._southWest.lng};

            WildRydes.marker  = L.marker([loc.coords.latitude, loc.coords.longitude]).addTo(map);
            var myIcon = L.icon({
                iconUrl: 'images/unicorn-icon.png',
                iconSize: [25, 25],
                iconAnchor: [22, 24],
                shadowSize: [25, 25],
                shadowAnchor: [22, 24]
            });
            WildRydes.unicorn = L.marker([loc.coords.latitude, loc.coords.longitude], {icon: myIcon}).addTo(map);
            // WildRydes.marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

            // var popup = L.popup();
            map.on('click', onMapClick);

            function onMapClick(e) {            //  TODO move to esri.js
                WildRydes.map.selectedPoint = {longitude: e.latlng.lng, latitude: e.latlng.lat};
                if (WildRydes.marker)       WildRydes.marker.remove();
                handlePickupChanged();

                WildRydes.marker  = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);

                // popup
                //     .setLatLng(e.latlng)
                //     .setContent("You clicked the map at " + e.latlng.toString())
                //     .openOn(map);
            }
        }
    });

    //  handlePickupChanged
    //      enable the Pickup button and set text to Request Unicorn
    function handlePickupChanged() {
        var requestButton = $('#request');
        requestButton.text('Request Unicorn');
        requestButton.prop('disabled', false);
    }

    //  handleRequestClick
    //      get current request location and POST request to server
    function handleRequestClick(event) {
        var pickupLocation =  WildRydes.map.selectedPoint;

        event.preventDefault();
        requestUnicorn(pickupLocation);         //      !!!!! 1
    }

    //  animateArrival
    //      animate the Unicorn's arrival to the user's pickup location
    function animateArrival(callback) {
        var dest = WildRydes.map.selectedPoint;
        var origin = {};

        if (dest.latitude > WildRydes.map.center.latitude) {
            origin.latitude = WildRydes.map.extent.minLat;
        } else {
            origin.latitude = WildRydes.map.extent.maxLat;
        }

        if (dest.longitude > WildRydes.map.center.longitude) {
            origin.longitude = WildRydes.map.extent.minLng;
        } else {
            origin.longitude = WildRydes.map.extent.maxLng;
        }

        WildRydes.map.animate(origin, dest, callback);
    }


}(jQuery));

//  these functions below here are my utility functions
//      to present messages to users
//      and to particularly add some 'sizzle' to the application

//  displayUpdate
//      nice utility method to show message to user
function displayUpdate(text, color='green') {
    $('#updates').prepend($(`<li style="background-color:${color}">${text}</li>`));
}

