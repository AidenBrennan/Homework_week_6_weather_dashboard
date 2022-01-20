$(document).ready(function(){
    if (localStorage.hasOwnProperty('searchedlocation')) {
        var searchedlocation = JSON.parse(localStorage.getItem('searchedlocation'))}
        else { var searchedlocation = ["Sydney", "Berlin", "Prague", "Florence", "Tokyo"]};
        var displaylocation = $('.dropdown-content')
        CallAPItoday();
        $.each(searchedlocation, function(i) {
            $('<a class="searchedlocation">')
            .appendTo(displaylocation)
            .text(searchedlocation[i])
        })

        async function CallAPItoday(){
                 if (localStorage.hasOwnProperty('currentlocation')) {
        var currentlocation = JSON.parse(localStorage.getItem('currentlocation'))
        } else {var currentlocation = "sydney"};
        const APIKey = "c9a9ed03a355403f4cb9a36e931c0b4a";
        var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + currentlocation + "&appid=" + APIKey;
        var response = await fetch(weatherURL);
        var data = await response.json();
        var cityname = (data.name);
        var todayshumidity = (data.main.humidity);
        var todaystemperatureKelvin = (data.main.temp);
        var todaystemperaturecelcius = (todaystemperatureKelvin-273.15);
        var todaysdescription = (data.weather[0].description);
        var windspeed = (data.wind.speed);
        var iconcode = (data.weather[0].icon)
        var icon = "https://openweathermap.org/img/wn/" + iconcode + "@2x.png"
        var latitude = (data.coord.lat);
        var longitude = (data.coord.lon);
        var UVindexcall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey + "&cnt=1";
        var response2 = await fetch(UVindexcall);
        var data2 = await response2.json();
        var UVindex = (data2.daily[0].uvi);
        var UNIX_timestamp = (data2.current.dt)
        localStorage.setItem('UNIX_timestamp', UNIX_timestamp)
        timeConverter();
        var todaysweather = $('.todaysweather');
        $(".todaysweather").empty()
            var time = localStorage.getItem('time')
            $('<p/ class="time">')
            .appendTo(todaysweather)
            .text(time)
            $('<img/>', {src: icon,
            width: '200px',
            height: '100px'})
            .appendTo(todaysweather)
            $('<p/ class="cityname">')
            .appendTo(todaysweather)
            .text(cityname)
            $('<p/ class="humidity">')
            .appendTo(todaysweather)
            .text("humidity" + "=" + todayshumidity)
            $('<p/ class="temperature">')
            .appendTo(todaysweather)
            .text("temperature" + "=" + todaystemperaturecelcius)
            $('<p/ class="windspeed">')
            .appendTo(todaysweather)
            .text("windspeed" + "=" + windspeed)
            $('<p/ class="description">')
            .appendTo(todaysweather)
            .text(todaysdescription)
            $('<p/ class="uvi" id="uvi">')
            .appendTo(todaysweather)
            .text("uv index =" + UVindex);
            if (UVindex > 7) {
               var UVtext = document.getElementById("uvi")
               var warning = document.createTextNode(" warning high uv index")
               document.getElementById("uvi").style.color = "red"
               UVtext.appendChild(warning)
            } else if (7> UVindex && UVindex > 5) {
                document.getElementById("uvi").style.color = "red"
            } else if (5 > UVindex && UVindex > 3) {
                document.getElementById("uvi").style.color = "orange"
            } else {
                document.getElementById("uvi").style.color = "green"
            };
        localStorage.setItem('latitude', latitude);
        localStorage.setItem('longitude', longitude);
        CallAPI5day();
    }

    async function CallAPI5day(){
        var latitude = localStorage.getItem('latitude');
        var longitude = localStorage.getItem('longitude');
        var APIKey = "c9a9ed03a355403f4cb9a36e931c0b4a";
        var fivedayweatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey + "&cnt=5";
        var response = await fetch(fivedayweatherURL);
        var data = await response.json();
        $('li').remove();
        $('.dailyweather img').remove();
        var day1 = $('.day1')
            var UNIX_timestamp = (data.daily[1].dt)
            localStorage.setItem('UNIX_timestamp', UNIX_timestamp)
            timeConverter();
            var time = localStorage.getItem('time')
            var iconcode = (data.daily[1].weather[0].icon)
            var icon = "https://openweathermap.org/img/wn/" + iconcode + "@2x.png"
            var description = (data.daily[1].weather[0].description)
            var humidity = (data.daily[1].humidity);
            var temperatureKelvin = (data.daily[0].temp.day)
            var temperatureCelcius = (temperatureKelvin-273.15);
            var temperatureCelcius = temperatureCelcius.toFixed(1);
            var windspeed = (data.daily[1].wind_speed)
            $('<li/ class="time">').appendTo(day1).text(time)
            $('<img/>', {src: icon,
                width: '50px',
                height: '50px'})
                .appendTo(day1)
            $('<li/ class="description list-group-item-danger">').appendTo(day1).text("windspeed=" + windspeed)
            $('<li/ class="description list-group-item-info">').appendTo(day1).text(description)
            $('<li/ class="temperature list-group-item-primary">').appendTo(day1)
            .text("temp" + "=" + temperatureCelcius);
            $('<li/ class="humidity list-group-item-secondary">').appendTo(day1)
            .text("humidity" + "=" + humidity);
        var day2 = $('.day2')
            var UNIX_timestamp = (data.daily[2].dt)
            localStorage.setItem('UNIX_timestamp', UNIX_timestamp)
            timeConverter();
            var time = localStorage.getItem('time')
            var iconcode = (data.daily[2].weather[0].icon)
            var icon = "https://openweathermap.org/img/wn/" + iconcode + "@2x.png"
            var description = (data.daily[2].weather[0].description)
            var humidity = (data.daily[2].humidity);
            var temperatureKelvin = (data.daily[2].temp.day)
            var temperatureCelcius = (temperatureKelvin-273.15);
            var temperatureCelcius = temperatureCelcius.toFixed(1);
            var windspeed = (data.daily[2].wind_speed)
            $('<li/ class="time">').appendTo(day2).text(time)
            $('<img/>', {src: icon,
                width: '50px',
                height: '50px'})
                .appendTo(day2)
            $('<li/ class="description list-group-item-danger">').appendTo(day2).text("windspeed=" + windspeed)
            $('<li/ class="description list-group-item-info">').appendTo(day2).text(description)
            $('<li/ class="temperature list-group-item-primary">').appendTo(day2)
            .text("temp" + "=" + temperatureCelcius);
            $('<li/ class="humidity list-group-item-secondary">').appendTo(day2)
            .text("humidity" + "=" + humidity);
        var day3 = $('.day3')
            var UNIX_timestamp = (data.daily[3].dt)
            localStorage.setItem('UNIX_timestamp', UNIX_timestamp)
            timeConverter();
            var time = localStorage.getItem('time')
            $('<li/ class="time">').appendTo(day3).text(time)
            var iconcode = (data.daily[3].weather[0].icon)
             var icon = "https://openweathermap.org/img/wn/" + iconcode + "@2x.png"
            var description = (data.daily[3].weather[0].description)
            var humidity = (data.daily[3].humidity);
            var temperatureKelvin = (data.daily[3].temp.day)
            var temperatureCelcius = (temperatureKelvin-273.15);
            var temperatureCelcius = temperatureCelcius.toFixed(1)
            var windspeed = (data.daily[3].wind_speed)
            $('<img/>', {src: icon,
                width: '50px',
                height: '50px'})
                .appendTo(day3)
            $('<li/ class="description list-group-item-danger">').appendTo(day3).text("windspeed=" + windspeed)
            $('<li/ class="description list-group-item-info">').appendTo(day3).text(description)
            $('<li/ class="temperature list-group-item-primary">').appendTo(day3)
            .text("temp" + "=" + temperatureCelcius);
            $('<li/ class="humidity list-group-item-secondary">').appendTo(day3)
            .text("humidity" + "=" + humidity);
        var day4 = $('.day4')
            var UNIX_timestamp = (data.daily[4].dt)
            localStorage.setItem('UNIX_timestamp', UNIX_timestamp)
            timeConverter();
            var time = localStorage.getItem('time')
            $('<li/ class="time">').appendTo(day4).text(time)
            var iconcode = (data.daily[4].weather[0].icon)
            var icon = "https://openweathermap.org/img/wn/" + iconcode + "@2x.png"
            var description = (data.daily[4].weather[0].description)
            var humidity = (data.daily[4].humidity);
            var temperatureKelvin = (data.daily[4].temp.day)
            var temperatureCelcius = (temperatureKelvin-273.15);
            var temperatureCelcius = temperatureCelcius.toFixed(1)
            var windspeed = (data.daily[4].wind_speed)
                $('<img/>', {src: icon,
                width: '50px',
                height: '50px'})
                .appendTo(day4)
            $('<li/ class="description list-group-item-danger">').appendTo(day4).text("windspeed=" + windspeed)
            $('<li/ class="description list-group-item-info">').appendTo(day4).text(description)
            $('<li/ class="temperature list-group-item-primary">').appendTo(day4)
            .text("temp" + "=" + temperatureCelcius);
            $('<li/ class="humidity list-group-item-secondary">').appendTo(day4)
            .text("humidity" + "=" + humidity);
        var day5 = $('.day5')
            var UNIX_timestamp = (data.daily[5].dt)
            localStorage.setItem('UNIX_timestamp', UNIX_timestamp)
            timeConverter();
            var time = localStorage.getItem('time')
            $('<li/ class="time">').appendTo(day5).text(time)
            var iconcode = (data.daily[5].weather[0].icon)
            var icon = "https://openweathermap.org/img/wn/" + iconcode + "@2x.png"
            var description = (data.daily[5].weather[0].description)            
            var humidity = (data.daily[5].humidity);
            var temperatureKelvin = (data.daily[5].temp.day)
            var temperatureCelcius = (temperatureKelvin-273.15);
            var temperatureCelcius = temperatureCelcius.toFixed(1)
            var windspeed = (data.daily[5].wind_speed)
            $('<img/>', {src: icon,
                width: '50px',
                height: '50px'})
                .appendTo(day5)
            $('<li/ class="description list-group-item-danger">').appendTo(day5).text("windspeed=" + windspeed)
            $('<li/ class="description list-group-item-info">').appendTo(day5).text(description)
            $('<li/ class="temperature list-group-item-primary">').appendTo(day5)
            .text("temp" + "=" + temperatureCelcius);
            $('<li/ class="humidity list-group-item-secondary">').appendTo(day5)
            .text("humidity" + "=" + humidity);
    }




    $('.searchedlocation').on("click", function() {
        var currentlocation = $(this).text();
        localStorage.setItem('currentlocation', JSON.stringify(currentlocation))
        CallAPItoday()
    })

    $("#locationselectionBtn").on("click", function() {
        var currentlocation = $("#locationinput").val();
        $("#locationinput").val('');
        localStorage.setItem('currentlocation', JSON.stringify(currentlocation))
        if (localStorage.hasOwnProperty('searchedlocation')) {
            var searchedlocation = JSON.parse(localStorage.getItem('searchedlocation'))}
            else { var searchedlocation = []};
        if (searchedlocation.length <5) {
        searchedlocation.push(currentlocation);
        localStorage.setItem('searchedlocation',JSON.stringify(searchedlocation))
        CallAPItoday();
        } else {
            searchedlocation.pop()
            searchedlocation.unshift(currentlocation);
            localStorage.setItem('searchedlocation',JSON.stringify(searchedlocation))
            CallAPItoday();
        }
    })
    function timeConverter(){
        var UNIX_timestamp = localStorage.getItem('UNIX_timestamp')
        var date = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = date.getFullYear();
        var month = months[date.getMonth()];
        var date = date.getDate();
        var time = date + ' ' + month + ' ' + year;
        localStorage.setItem('time', time)
      }
})
