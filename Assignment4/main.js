﻿var request = getRequestObject();
var cities = {};
var APPID;
var oldCityCall = [{}, {}, {}];
var baseAddress = "http://api.openweathermap.org/data/2.5/weather?q=";

if ( getCookie( "APPID" ) )
{
    APPID = getCookie( "APPID" );
    document.getElementById( "APPID_Form" ).innerHTML = "APPID = " + APPID;
}

if ( JSON.parse( localStorage.getItem( 'oldCityCall' ) ) )
{
    oldCityCall = JSON.parse( localStorage.getItem( 'oldCityCall' ));
    var DOMcities = document.getElementsByClassName( "City" );
    for ( i = 0; i < DOMcities.length; i++ )
    {
        var oldCity = document.getElementsByClassName( "CityOld" )[i].children;

        oldCity.name.innerHTML = oldCityCall[i]['oldName'] + " (Last Call)";
        oldCity.temp.innerHTML = oldCityCall[i]['oldTemp'];
        oldCity.humidity.innerHTML = oldCityCall[i]['oldHumidity'];
        oldCity.windspeed.innerHTML = oldCityCall[i]['oldWindSpeed'];
        oldCity.cloudiness.innerHTML = oldCityCall[i]['oldCloudiness'];
        oldCity.time.innerHTML = oldCityCall[i]['oldTime'];
    }
}

init();

/* --------------------------------------- */
function init()
{
    updateAllCities();
}

function City( cityIndex )
{
    this.DOMCity = document.getElementsByClassName( "City" )[cityIndex];
    this.city = {};

    this.city["name"] = this.DOMCity.children.name.innerHTML;

    this.getName = function ()
    {
        return this.city["name"];
    }

    this.setTemp = function (temp)
    {
        this.city["temperature"] = temp;
    }
    this.getTemp = function ()
    {
        return this.city["temperature"];
    }

    this.setHumidity = function(humidity)
    {
        this.city["humidity"] = humidity;
    }
    this.getHumidity = function()
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
        this.DOMCity.children.time.innerHTML = new Date().toLocaleString();
    }
    
    this.setTDElement = function ( attribute, value )
    {
        this.DOMCity.children[attribute].innerHTML = value;
        this.updateTimeStamp()
    }
}

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

function getRequestObject()
{
    if ( window.ActiveXObject )
    {
        return ( new ActiveXObject( "Microsoft.XMLHTTP" ) );
    } else if ( window.XMLHttpRequest )
    {
        return ( new XMLHttpRequest() );
    } else
    {
        return ( null );
    }
}

function updateCity(cityIndex)
{
    var weatherJSON;
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

    cities[cityIndex].setTemp( parseFloat( weatherJSON["main"]["temp"] - 273.15 ).toFixed( 2 ) );
    cities[cityIndex].setTDElement( "temp", cities[cityIndex].getTemp() + "&deg;C" );

    cities[cityIndex].setHumidity( weatherJSON["main"]["humidity"] );
    cities[cityIndex].setTDElement( "humidity", cities[cityIndex].getHumidity() + "%" );

    cities[cityIndex].setWindSpeed( (parseFloat(weatherJSON["wind"]["speed"]) * (3600) * (1/1609.344)).toFixed(2) );
    cities[cityIndex].setTDElement( "windspeed", cities[cityIndex].getWindSpeed() + " miles per hour" );

    cities[cityIndex].setCloudiness( weatherJSON["clouds"]["all"] );
    cities[cityIndex].setTDElement( "cloudiness", cities[cityIndex].getCloudiness() + "%" );
}

function updateAllCities()
{
    updateThirdCityRow();
    var DOMcities = document.getElementsByClassName( "City" );
    for ( i = 0; i < DOMcities.length; i++ )
    {
        cities[i] = new City( i );
        updateCity( i );
    }
}

function updateAllLastCall()
{
    var DOMcities = document.getElementsByClassName( "City" );
    for ( i = 0; i < DOMcities.length; i++ )
    {
        lastCall( i );
    }
    updateAllCities();
}

function lastCall(cityIndex)
{
    var old = document.getElementsByClassName( "City" )[cityIndex].children;
    var oldCity = document.getElementsByClassName( "CityOld" )[cityIndex].children;

    oldCityCall[cityIndex] = {};
    oldCityCall[cityIndex]['oldName'] = old.name.innerHTML;
    oldCityCall[cityIndex]['oldTemp'] = old.temp.innerHTML;
    oldCityCall[cityIndex]['oldHumidity'] = old.humidity.innerHTML;
    oldCityCall[cityIndex]['oldWindSpeed'] = old.windspeed.innerHTML;
    oldCityCall[cityIndex]['oldCloudiness'] = old.cloudiness.innerHTML;
    oldCityCall[cityIndex]['oldTime'] = old.time.innerHTML;

    localStorage.setItem( 'oldCityCall', JSON.stringify( oldCityCall ) );
    oldCity.name.innerHTML = oldCityCall[cityIndex]['oldName'] + " (Last Call)";
    oldCity.temp.innerHTML = oldCityCall[cityIndex]['oldTemp'];
    oldCity.humidity.innerHTML = oldCityCall[cityIndex]['oldHumidity'];
    oldCity.windspeed.innerHTML = oldCityCall[cityIndex]['oldWindSpeed'];
    oldCity.cloudiness.innerHTML = oldCityCall[cityIndex]['oldCloudiness'];
    oldCity.time.innerHTML = oldCityCall[cityIndex]['oldTime'];
}

function updateThirdCityRow()
{
    var citySelect = document.getElementById( "citySelect" );
    var city = citySelect.options[citySelect.selectedIndex].value;

    var thirdCityRow = document.getElementsByClassName( "City" )[2];
    thirdCityRow.children.name.innerHTML = city;
}