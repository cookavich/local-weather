let lat, lon, weather;
const key = '2c9b6c5080e338af6c6a2f49707dd592';
const corsAnywhere =  'https://cors-anywhere.herokuapp.com';
const apiUrl = 'https://api.darksky.net/forecast';

navigator.geolocation.getCurrentPosition((position) => {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    fetch(`${corsAnywhere}/${apiUrl}/${key}/${lat},${lon}`, {method: 'get'})
        .then((response) => response.json().then((data) => {
            weather = data;
            console.log(weather);
            document.getElementById('location').innerHTML = weather.timezone;
            document.getElementById('temperature').innerHTML = Math.round(weather.currently.apparentTemperature);
            document.getElementById('weather').innerHTML = weather.currently.summary;
            document.getElementById('icon').innerHTML = weather.currently.icon;
        }))
        .catch((error) => console.error(error));
});