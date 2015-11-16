var Assignment = angular.module( 'Assignment5', [] );

Assignment.controller( 'CityController', function ( $scope, $http )
{
    $scope.init = function()
    {
        console.log( "init()" );
        $scope.updateAllCities();
    }

    $scope.hardCodedCities = [
       {
           main: {
               name: "Phoenix, US",
               temp: 320.15,
               humidity: 1,
           },
           wind: {
               speed: 0
           },
           clouds: {
               all: 20
           }
       },
       {
           main: {
               name: "London, UK",
               temp: 300.0,
               humidity: 90,
           },
           wind: {
               speed: 3
           },
           clouds: {
               all: 0
           }
       },
    {
        main: {
            name: "Fulda, DE",
            temp: 310.57,
            humidity: 18,
        },
        wind: {
            speed: 1.3
        },
        clouds: {
            all: 80
        }
    }
    ];

    $scope.cities = [{}, {}, {}];

    $scope.oldCityCall = [{}, {}, {}];

    $scope.City = function ( cityIndex )
    {
        this.city = {};

        this.setName = function(name)
        {
            this.city["name"] = name;
        }

        this.getName = function ()
        {
            return this.city["name"];
        }

        this.setTemp = function ( temp )
        {
            this.city["temperature"] = temp;
        }
        this.getTemp = function ()
        {
            return this.city["temperature"];
        }

        this.setHumidity = function ( humidity )
        {
            this.city["humidity"] = humidity;
        }
        this.getHumidity = function ()
        {
            return this.city["humidity"];
        }

        this.setWindSpeed = function ( temp )
        {
            this.city["windspeed"] = temp;
        }
        this.getWindSpeed = function ()
        {
            return this.city["windspeed"];
        }

        this.setCloudiness = function ( temp )
        {
            this.city["cloudiness"] = temp;
        }
        this.getCloudiness = function ()
        {
            return this.city["cloudiness"];
        }

        this.updateTimeStamp = function ()
        {
            this.time = new Date().toLocaleString();
        }
    }

    $scope.updateAllCities = function()
    {
        console.log( "updateAllCities()" );

        for ( var i = 0; i < $scope.cities.length; i++ )
        {
            $scope.cities[i] = new $scope.City( i );
            $scope.updateCity( i );
        }
        
        $scope.findAvgTemp();
        $scope.findMaxTemp();
        $scope.findAvgHumidity();
        $scope.findMaxHumidity();
        var qualities = $scope.weatherQuality();
        $scope.rankWeather( qualities );
        
    }

    $scope.updateCity = function ( cityIndex )
    {
        var weatherJSON = $scope.hardCodedCities[cityIndex];
        weatherJSON = $scope.randomize( weatherJSON );
        /* Previous assignment AJAX call
        request.onreadystatechange = function ()
        {
            if ( ( request.readyState == 4 ) &&
            ( request.status == 200 ) )
            {
                weatherJSON = JSON.parse( request.responseText );
            }
        };
    
        request.open(
            "GET",
            baseAddress + cities[cityIndex].getName() + "&APPID=" + APPID,
            false );
    
        request.send( null );
        */

        $scope.cities[cityIndex].setName( weatherJSON["main"]["name"] );
        $scope.cities[cityIndex].setTemp(parseFloat( weatherJSON["main"]["temp"] - 273.15 ).toFixed( 2 ));
        $scope.cities[cityIndex].setHumidity( weatherJSON["main"]["humidity"] );
        $scope.cities[cityIndex].setWindSpeed(( parseFloat( weatherJSON["wind"]["speed"] ) * ( 3600 ) * ( 1 / 1609.344 ) ).toFixed( 2 ) );
        $scope.cities[cityIndex].setCloudiness( weatherJSON["clouds"]["all"] );
        $scope.cities[cityIndex].updateTimeStamp();

    }

    $scope.randomize = function ( city )
    {
        var newCity = { main: {}, clouds: {}, wind: {} };
        newCity.main.name = city.main.name;
        newCity.main.temp = city.main.temp + ( city.main.temp - 273.15 ) * Math.random() / 11;
        newCity.main.humidity = Math.floor( city.main.humidity + Math.random() * 11 );
        newCity.wind.speed = city.wind.speed + Math.random() * 11 / 3600 * 1609.344;
        newCity.clouds.all = Math.floor( city.clouds.all + Math.random() * 11 );

        return newCity;
    }

    $scope.updateAllLastCall = function()
    {
        for ( i = 0; i < $scope.cities.length; i++ )
        {
            $scope.lastCall( i );
        }
    }
    
    $scope.clearLastCall = function()
    {
        $scope.oldCityCall = [{}, {}, {}];
        localStorage.removeItem( 'oldCityCall' );
    }
    
    $scope.lastCall = function ( cityIndex )
    {
        var old = document.getElementsByClassName( "City" )[cityIndex].children;
        var oldCity = document.getElementsByClassName( "CityOld" )[cityIndex].children;

        $scope.oldCityCall[cityIndex] = $scope.cities[cityIndex];

        localStorage.setItem( 'oldCityCall', JSON.stringify( $scope.oldCityCall ) );

    }

    
    if ( JSON.parse( localStorage.getItem( 'oldCityCall' ) ) )
    {
        $scope.oldCityCall = JSON.parse( localStorage.getItem( 'oldCityCall' ) );
    }
    

    $scope.findAvgTemp = function()
    {
        var sum = 0.0;
        for ( i = 0; i < $scope.cities.length; i++ )
        {
            sum += parseFloat( $scope.cities[i].city.temperature );
        }
        sum = sum / $scope.cities.length;
        document.getElementById( "avgTemp" ).innerHTML = sum.toFixed( 2 ) + "&deg;C";
    }
    $scope.findMaxTemp = function()
    {
        var maxIndex = 0;
        for ( i = 0; i < $scope.cities.length; i++ )
        {
            if ( parseFloat( $scope.cities[i].city.temperature ) > parseFloat( $scope.cities[maxIndex].city.temperature ) )
            {
                maxIndex = i;
            }
        }
        document.getElementById( "maxTemp" ).innerHTML = $scope.cities[maxIndex].city.name;
    }

    $scope.findAvgHumidity = function()
    {
        var sum = 0.0;
        for ( i = 0; i < $scope.cities.length; i++ )
        {
            sum += parseFloat( $scope.cities[i].city.humidity );
        }
        sum = sum / $scope.cities.length;
        document.getElementById( "avgHumidity" ).innerHTML = sum.toFixed( 2 ) + "%";
    }
    $scope.findMaxHumidity = function()
    {
        var maxIndex = 0;
        for ( i = 0; i < $scope.cities.length; i++ )
        {
            if ( parseFloat( $scope.cities[i].city.humidity ) > parseFloat( $scope.cities[maxIndex].city.humidity ) )
            {
                maxIndex = i;
            }
        }
        document.getElementById( "maxHumidity" ).innerHTML = $scope.cities[maxIndex].city.name;
    }

    $scope.weatherQuality = function()
    {
        var qualities = [];
        for ( i = 0; i < $scope.cities.length; i++ )
        {
            qualities[i] = parseFloat(
                $scope.cities[i].city.temperature *
                ( $scope.cities[i].city.humidity / 100 ) +
                $scope.cities[i].city.windspeed +
                $scope.cities[i].city.cloudiness );
        }
        return qualities;
    }

    $scope.rankWeather = function( qualities )
    {
        var best = 0;
        var worst = 0;
        for ( i = 0; i < qualities.length; i++ )
        {
            if ( qualities[i] < qualities[best] )
            {
                best = i;
            }
            if ( qualities[i] > qualities[worst] )
            {
                worst = i;
            }
        }

        document.getElementById( "nicest" ).innerHTML = $scope.cities[best].city.name;
        document.getElementById( "worst" ).innerHTML = $scope.cities[worst].city.name;
    }
} );

var APPID;
var baseAddress = "http://api.openweathermap.org/data/2.5/weather?q=";

if ( getCookie( "APPID" ) )
{
    APPID = getCookie( "APPID" );
    document.getElementById( "APPID_Form" ).innerHTML = "APPID = " + APPID;
}


angular.element( document ).ready( function ()
{

} );

/* --------------------------------------- */



function setAPPID()
{
    APPID = document.getElementById( "APPID" ).value;
    setCookie( "APPID", APPID, 4200 );
    console.log( "Cookie: APPID set to '" + APPID + "'" );
    document.getElementById( "APPID_Form" ).innerHTML = "APPID = " + APPID;
}

function setCookie( cname, cvalue, exdays )
{
    var d = new Date();
    d.setTime( d.getTime() + ( exdays * 24 * 60 * 60 * 1000 ) );
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie( cname )
{
    var name = cname + "=";
    var ca = document.cookie.split( ';' );
    for ( var i = 0; i < ca.length; i++ )
    {
        var c = ca[i];
        while ( c.charAt( 0 ) == ' ' )
            c = c.substring( 1 );
        if ( c.indexOf( name ) == 0 )
            return c.substring( name.length, c.length );
    }
    return null;
}

