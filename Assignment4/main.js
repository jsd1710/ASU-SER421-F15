var cities = {};

if ( getCookie( "APPID" ) )
{
    document.getElementById( "APPID_Form" ).innerHTML = "APPID = " + getCookie( "APPID" );
}

init();


function init()
{
    DOMcities = document.getElementsByClassName("City");
    for (i = 0; i < DOMcities.length; i++)
    {
        
        cities[i] = new City(DOMcities[i].children.name.innerHTML);
        console.log(cities[i].getName());
    }
}

function City(name)
{
    this.city = {};

    this.city["name"] = name;

    this.getName = function()
    {
        return this.city["name"];
    }

    this.getTemp = function()
    {
        this.city["temperature"] = "test";
        return this.city["temperature"];
    }

    this.updateTimestamp()
    {

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