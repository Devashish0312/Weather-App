var loc = document.getElementById("location");
var state = document.getElementById("state");
var temp = document.getElementById("temp");
var wind = document.getElementById("wind");
var max = document.getElementById("max");
var min = document.getElementById("min");
var des = document.getElementById("des");
var dir = document.getElementById("dir");
var clouds = document.getElementById("Clouds");
var pre = document.getElementById("pressure");
var hum = document.getElementById("humidity");
var vis = document.getElementById("visibility");
var icon = document.getElementById("icon");
var suns = document.getElementById("sunset");
var sunr = document.getElementById("sunrise");
var moons = document.getElementById("moonset");
var moonr = document.getElementById("moonrise");
var ctx = document.getElementById('myChart').getContext('2d');
var ctx1 = document.getElementById('myChart1').getContext('2d');
var UV = document.getElementById('UV').getContext('2d');
var humc = document.getElementById('hum').getContext('2d');
var clc = document.getElementById('cl').getContext('2d');
var ozone = document.getElementById('ozone');
var co = document.getElementById('co');
var so2 = document.getElementById('so2');
var atmopr = document.getElementById('atmopr');
var atmopr_so2 = document.getElementById('atmopr_so2');
var no = document.getElementById('no');

var weather_air = {};
var city;
var uni_url;
// var hour1 = document.getElementById("hour1");
// var temp1 = document.getElementById("temp1");
// var icon1 = document.getElementById("icon1");
// var des1 = document.getElementById("des1");

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showposition)
    hider(whole);
}

function showposition(position) {
    updatebygeo(position);
    hider(whole);
}

function dos(loc) {

    console.log(loc);
    updatebyloc(loc);
    hider(whole);
}

function hider(content) {

    if (content.className === "hide1") {

        content.className = "";
    }
}

function updatebygeo(position){
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    var url = makeurl1(lat,lon);
    var url_add = makeurl1_add(lat,lon);
    var url_fore = makeurl1_fore(lat,lon);
    var url_uv = makeurl1_uv(lat,lon);
    var url_ozone = makeurl_ozone(lat,lon);
    var url_co = makeurl_co(lat,lon);
    var url_so2 = makeurl_so2(lat,lon);
    var url_no = makeurl_no(lat,lon);
    sendRequest(url);
    sendRequest_add(url_add);
    sendRequest_fore(url_fore);
    sendRequest_uv(url_uv);
    sendRequest_ozone(url_ozone);
    sendRequest_co(url_co);
    sendRequest_so2(url_so2);
    sendRequest_no(url_no);

}

function updatebyloc(loc){
    var url = makeurl2(loc);
    var url_add = makeurl2_add(loc);
    var url_fore = makeurl2_fore(loc);
    sendRequest(url);
    sendRequest_add(url_add);
    sendRequest_fore(url_fore);

}

function makeurl1(lat,lon){

    var url = "http://api.openweathermap.org/data/2.5/weather?" +
        "lat=" + lat +
        "&lon=" + lon +
        "&units=metric&appid=0e8880ebbf757b3f57ad61f36b0a465e";
    return url;
}

function makeurl2(loc) {

    var url = "http://api.openweathermap.org/data/2.5/weather?" +
        "q=" + loc +
        "&units=metric&appid=0e8880ebbf757b3f57ad61f36b0a465e";
    console.log(url);

    return url;
}

function makeurl1_add(lat,lon){
    var url = "http://api.apixu.com/v1/forecast.json?key=d75ee71eb3ae4ab19ea140023172106&q="+lat+","+lon;
    return url;
}

function makeurl2_add(loc){
    var url = "http://api.apixu.com/v1/forecast.json?key=d75ee71eb3ae4ab19ea140023172106&q="+loc;
    return url;
}

function makeurl1_fore(lat,lon){
    var url = "http://api.apixu.com/v1/forecast.json?key=d75ee71eb3ae4ab19ea140023172106&q="+lat+","+lon+"&days=7";
    console.log(url);
    return url;

    
}

function makeurl2_fore(loc){
    var url = "http://api.apixu.com/v1/forecast.json?key=d75ee71eb3ae4ab19ea140023172106&q="+loc+"&days=7";
    console.log(url);
    return url;
}

function makeurl1_uv(lat,lon){
    console.log(lat);
    console.log(lon);
    var lat1 = lat.toFixed(1);
    var lon1 = lon.toFixed(1);
    console.log(lat1);
    console.log(lon1);
    var url = "http://api.openweathermap.org/v3/uvi/"+lat1+","+lon1+"/current.json?appid=0e8880ebbf757b3f57ad61f36b0a465e";
    console.log(url);
    return url;
}


function makeurl_ozone(lat,lon){
    lat1 = lat.toFixed(1);
    lon1 = lon.toFixed(1);
    var url = "http://api.openweathermap.org/pollution/v1/o3/"+lat1+","+lon1+"/current.json?appid=0e8880ebbf757b3f57ad61f36b0a465e"
    return url;
}

function makeurl_co(lat,lon){
        lat1 = lat.toFixed(1);
    lon1 = lon.toFixed(1);
    var url = "http://api.openweathermap.org/pollution/v1/co/"+lat1+","+lon1+"/current.json?appid=0e8880ebbf757b3f57ad61f36b0a465e"
    return url;
}
function makeurl_so2(lat,lon){
        lat1 = lat.toFixed(1);
    lon1 = lon.toFixed(1);
    var url = "http://api.openweathermap.org/pollution/v1/so2/"+lat1+","+lon1+"/current.json?appid=0e8880ebbf757b3f57ad61f36b0a465e"
    return url;
}
function makeurl_no(lat,lon){
        lat1 = lat.toFixed(1);
    lon1 = lon.toFixed(1);
    var url = "http://api.openweathermap.org/pollution/v1/no2/"+lat1+","+lon1+"/current.json?appid=0e8880ebbf757b3f57ad61f36b0a465e"
    return url;
}


function sendRequest(url){
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            var data = JSON.parse(req.responseText);
            var weather = {};
            weather.loc = data.name;
            weather.temp = data.main.temp + "C";
            weather.wind = data.wind.speed + " Km/hr";
            weather.max = data.main.temp_max + "C";
            weather.min = data.main.temp_min + "C";
            weather.des = data.weather[0].description;
            weather.vis = parseFloat((data.visibility) / 1000) + " km";
            weather.hum = data.main.humidity + " %";
            weather.icon = data.weather[0].icon;
            weather.clouds = data.clouds.all + "%";
            weather.pre = data.main.pressure + " mb";
            // back(weather.icon);
            // console.log(weather.icon);
            show(weather);
            back(weather.icon);
            makechart3(data.main.humidity);
            makechart4(data.clouds.all);
            var temp1 = makeurl1_uv(data.coord.lat,data.coord.lon);
            var temp2 = makeurl_ozone(data.coord.lat,data.coord.lon);
            var temp3 = makeurl_co(data.coord.lat,data.coord.lon);
            var temp4 = makeurl_so2(data.coord.lat,data.coord.lon);
            var temp5 = makeurl_no(data.coord.lat,data.coord.lon);
            sendRequest_uv(temp1);
            sendRequest_ozone(temp2);
            sendRequest_co(temp3);
            sendRequest_so2(temp4);
            sendRequest_no(temp5);

        }
    }

    req.open('GET', url, true);
    req.send();
}


function sendRequest_add(url){
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            var data = JSON.parse(req.responseText);
            var weather_add = {};
            weather_add.sunr = data.forecast.forecastday[0].astro.sunrise;
            weather_add.suns = data.forecast.forecastday[0].astro.sunset;
            weather_add.moonr = data.forecast.forecastday[0].astro.moonrise;
            weather_add.moons = data.forecast.forecastday[0].astro.moonset;
            weather_add.state = data.location.region;
            weather_add.dir = " " + "("+data.current.wind_dir+")";
            // weather_add.hour1 = data.forecast.forecastday[0].hour[0].time;
            // weather_add.temp1 = data
            // weather_add.icon1 = data.forecast.forecastday[0].hour[0].condition.icon;
            // weather_add.des1 = data.forecast.forecastday[0].hour[0].condition.text;
            show_add(weather_add);
}
    }
    req.open('GET', url, true);
    req.send();
}

function sendRequest_fore(url){
    console.log("Sa");
    var req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if(req.readyState == 4 && req.status == 200){
            var data = JSON.parse(req.responseText);
            makechart(data);
            makechart1(data);
        }
    }
    req.open('GET', url, true);
    req.send();
}


function sendRequest_uv(url){
    console.log("Sasa");
    var req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if(req.readyState == 4 && req.status == 200){
            var data = JSON.parse(req.responseText);
            makechart2(data);
        }
    }
    req.open('GET', url, true);
    req.send();
}

function sendRequest_ozone(url){
    var req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if(req.readyState == 4 && req.status == 200){
            var data = JSON.parse(req.responseText);
            weather_air.ozone = data.data;
            show_air(weather.air);
        }
    }
    req.open('GET', url, true);
    req.send();
}

function sendRequest_co(url){
    var req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if(req.readyState == 4 && req.status == 200){
            var data = JSON.parse(req.responseText);
            weather_air.co = data.data[0].value;
            weather_air.atmopr = data.data[0].pressure;
            show_air(weather_air);
        }
    }
    req.open('GET', url, true);
    req.send();
}

function sendRequest_so2(url){
    var req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if(req.readyState == 4 && req.status == 200){
            var data = JSON.parse(req.responseText);
            weather_air.so2 = data.data[0].value;
            weather_air.atmopr_so2 = data.data[0].pressure;
            show_air(weather_air);
        }
    }
    req.open('GET', url, true);
    req.send();
}

function sendRequest_no(url){
    var req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if(req.readyState == 4 && req.status == 200){
            var data = JSON.parse(req.responseText);
            weather_air.no = data.data.no2;
            show_air(weather_air);
        }
    }
    req.open('GET', url, true);
    req.send();
}


function show(weather){
    loc.innerHTML = weather.loc;
    temp.innerHTML = weather.temp;
    wind.innerHTML = weather.wind;
    max.innerHTML = weather.max;
    min.innerHTML = weather.min;
    des.innerHTML = weather.des;
    vis.innerHTML = weather.vis;
    hum.innerHTML = weather.hum;
    icon.src = "http://openweathermap.org/img/w/" + weather.icon + ".png";

    Clouds.innerHTML = weather.clouds;
    pressure.innerHTML = weather.pre;
}

function show_add(weather_add){
sunset.innerHTML = weather_add.suns;
sunrise.innerHTML = weather_add.sunr;
state.innerHTML = weather_add.state;
moonr.innerHTML = weather_add.moonr;
moons.innerHTML = weather_add.moons;
dir.innerHTML = weather_add.dir;
// hour1.innerHTML = weather_add.hour1;
// temp1.innerHTML = weather_add.temp1;
// icon1.src = weather.icon1;
}

function show_air(weather_air){
    ozone.innerHTML = weather_air.ozone;
    co.innerHTML = weather_air.co;
    atmopr.innerHTML = weather_air.atmopr;
    no.innerHTML = weather_air.no;
    so2.innerHTML = weather_air.so2;
    atmopr_so2.innerHTML = weather_air.atmopr_so2;
    
}

function makechart(data) {
    console.log("sad");
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: [data.forecast.forecastday[0].hour[0].time, data.forecast.forecastday[0].hour[1].time, data.forecast.forecastday[0].hour[2].time,data.forecast.forecastday[0].hour[3].time, data.forecast.forecastday[0].hour[4].time, data.forecast.forecastday[0].hour[5].time,data.forecast.forecastday[0].hour[6].time],
            datasets: [{
                label: "Temperature",
                backgroundColor: "#80cbc4",
                borderColor: "rgb(0,128,128)",
                data: [data.forecast.forecastday[0].hour[0].temp_c, data.forecast.forecastday[0].hour[1].temp_c, data.forecast.forecastday[0].hour[2].temp_c, data.forecast.forecastday[0].hour[3].temp_c, data.forecast.forecastday[0].hour[4].temp_c,data.forecast.forecastday[0].hour[5].temp_c, data.forecast.forecastday[0].hour[6].temp_c],
            }]
        },

        // Configuration options go here
        options: {}
    })

}


function makechart1(data) {
    console.log(data);
    var chart = new Chart(ctx1, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: [data.forecast.forecastday[0].date, data.forecast.forecastday[1].date, data.forecast.forecastday[2].date, data.forecast.forecastday[3].date, data.forecast.forecastday[4].date,data.forecast.forecastday[5].date, data.forecast.forecastday[6].date],
            datasets: [{
                label: "Temperature",
                backgroundColor: "#80cbc4",
                borderColor: "rgb(0,128,128)",
                data: [data.forecast.forecastday[0].day.avgtemp_c, data.forecast.forecastday[1].day.avgtemp_c, data.forecast.forecastday[2].day.avgtemp_c, data.forecast.forecastday[3].day.avgtemp_c, data.forecast.forecastday[4].day.avgtemp_c, data.forecast.forecastday[5].day.avgtemp_c,data.forecast.forecastday[6].day.avgtemp_c],
            }]
        },

        // Configuration options go here
        options: {}
    })
}

function makechart2(data){
var myChart = new Chart(UV, {
  type: 'doughnut',
  data: {
    labels: ['UV index'],
    datasets: [{
      label: 'UV',
      data: [data.data,16-data.data],
      backgroundColor: ["teal"]
    }]
  },
  options: {
  cutoutPercentage: 90,
  responsive: true,

  }
});
 
}

function makechart3(data){
    var chart = new Chart(humc,{
        type: 'doughnut',
        data:{
            labels:['Humidity'],
            datasets: [{
                label: 'Humidity',
                data: [data,100-data],
                backgroundColor: ["teal"]
            }]
        },
        option:{
            cutoutPercentage: 90,
            responsive:true,
        }
    });
}

function makechart4(data){
    var chart = new Chart(clc,{
        type: 'doughnut',
        data:{
            labels:['Clouds'],
            datasets: [{
                label: 'Clouds',
                data: [data,100-data],
                backgroundColor: ["teal"]
            }]
        },
        option:{
            cutoutPercentage: 90,
            responsive : true,
        }
    });
}


function back(data) {
    console.log(data);
    if (data == "01d")
        document.body.style.backgroundImage = "url('http://orig07.deviantart.net/3c81/f/2009/098/a/9/clear_sky_by_lfcjake.png')";
    else if (data == "01n")
        document.body.style.backgroundImage = "url('http://i.imgur.com/nwqHT3H.jpg')";
    else if (data == "02d")
        document.body.style.backgroundColor = "url('https://ak5.picdn.net/shutterstock/videos/7192381/thumb/1.jpg')";
    else if (data == "02n")
        document.body.style.backgroundImage = "url('http://www.drahtphotography.com/wp-content/uploads/2015/05/sampleIMG_3642.jpg')";
    else if (data == "03d")
        document.body.style.backgroundImage = "url('https://c1.staticflickr.com/3/2106/1909487867_de140c7eb8_b.jpg')";
    else if (data == "03n")
        document.body.style.backgroundImage = "url('https://coclouds.com/wp-content/uploads/2011/11/wispy-fall-sunset-cirrus-clouds-2011-11-23.jpg')";
    else if (data == "04d")
        document.body.style.backgroundImage = "url('https://c1.staticflickr.com/3/2106/1909487867_de140c7eb8_b.jpg')";
    else if (data == "04n")
        document.body.style.backgroundImage = "url('https://coclouds.com/wp-content/uploads/2011/11/wispy-fall-sunset-cirrus-clouds-2011-11-23.jpg')";
    else if (data == "09d")
        document.body.style.backgroundImage = "url('http://www.rd.com/wp-content/uploads/sites/2/2016/09/03-not-weird-facts-rain-Mr_Twister.jpg')";
    else if (data == "09n")
        document.body.style.backgroundImage = "url('https://i.ytimg.com/vi/q76bMs-NwRk/maxresdefault.jpg')";
    else if (data == "10d")
        document.body.style.backgroundImage = "url('http://www.rd.com/wp-content/uploads/sites/2/2016/09/03-not-weird-facts-rain-Mr_Twister.jpg')";
    else if (data == "10n")
        document.body.style.backgroundImage = "url('https://ak3.picdn.net/shutterstock/videos/3744299/thumb/4.jpg?i10c=img.resize(height:160)')";
    else if (data == "11d")
        document.body.style.backgroundImage = "url('http://s.hswstatic.com/gif/thunderstorm-orig.jpg')";
    else if (data == "11n")
        document.body.style.backgroundImage = "url('http://s.hswstatic.com/gif/thunderstorm-orig.jpg')";
    else if (data == "13d")
        document.body.style.backgroundImage = "url('https://static.bhphotovideo.com/explora/sites/default/files/Correct.jpg')";
    else if (data == "13n")
        document.body.style.backgroundImage = "url('http://www.twitrcovers.com/wp-content/uploads/2013/07/Snow-Night-l.jpg')";
    else if (data == "50d")
        document.body.style.backgroundImage = "url('https://vignette1.wikia.nocookie.net/demigodshaven/images/f/f5/Mist.jpg/revision/latest?cb=20110102163040')";
    else if (data == "50n")
        document.body.style.backgroundImage = "url('http://awesomwallpaper.com/img2/FBB2EF662E0A0E9A/street-night-fog.jpg')";
}

