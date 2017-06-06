let lat,
    lon,
    weather,
    locality,
    fahrenheit,
    celsius;
const key = '2c9b6c5080e338af6c6a2f49707dd592';
const corsAnywhere = 'https://cors-anywhere.herokuapp.com';
const apiUrl = 'https://api.darksky.net/forecast';

let icons = new Skycons({'color': 'black'});
icons.set({
    "clear-day": Skycons.CLEAR_DAY,
    "clear-night": Skycons.CLEAR_NIGHT,
    "partly-cloudy-day": Skycons.PARTLY_CLOUDY_DAY,
    "partly-cloudy-night": Skycons.PARTLY_CLOUDY_NIGHT,
    "cloudy": Skycons.CLOUDY,
    "rain": Skycons.RAIN,
    "sleet": Skycons.SLEET,
    "snow": Skycons.SNOW,
    "wind": Skycons.WIND,
    "fog": Skycons.FOG
});
icons.play();

navigator.geolocation.getCurrentPosition((position) => {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    let geocode = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + '%2C' + position.coords.longitude + '&language=en';
    fetch(`${corsAnywhere}/${apiUrl}/${key}/${lat},${lon}`, {method: 'get'})
        .then((response) => response.json()
            .then((data) => {
                weather = data;
                fahrenheit = Math.round(weather.currently.temperature);
                celsius = Math.round((fahrenheit - 32) * 0.5556);
                console.log(celsius);
                console.log(weather);
                document.getElementById('temperature').innerHTML = fahrenheit;
                document.getElementById('weather').innerHTML = weather.currently.summary;
                icons.add('icon', weather.currently.icon);
            }))
        .catch((error) => console.error(error));
    fetch(geocode)
        .then((response) => response.json()
            .then((data) => {
                locality = data;
                console.log(locality.results);
                document.getElementById('location').innerHTML = `${locality.results[0].address_components[2].long_name}, ${locality.results[0].address_components[5].short_name}`;
            }));
});

function toggleTemperature() {
    console.log('yeahhhhh');
    let unit = document.getElementById('unit');
    if(unit.innerHTML === 'F')
        console.log('yeahhhhh');
}

$(document).ready(() => {
    const $unitToggle = $('#unit');
    const $tempatureEl = $('#temperature');
    $unitToggle.click(() => {
        $tempatureEl.text() == celsius ? $tempatureEl.text(fahrenheit) : $tempatureEl.text(celsius);
        $unitToggle.text() == 'C' ? $unitToggle.text('F') : $unitToggle.text('C');
    });
});
