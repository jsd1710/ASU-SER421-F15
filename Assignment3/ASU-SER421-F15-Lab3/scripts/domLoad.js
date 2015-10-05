/* Before gameplay Stuff, i.e. requirement 2 (load player name / welcome.
Before images/style sheets load. */
document.addEventListener( 'DOMContentLoaded', function ( e )
{

    setWeaponsDraggable( false );
    setGuestsDraggable( false );

    var savedName = getCookie( "name" );
    if ( savedName == null )
    {
    }
    else
    {
        document.getElementById( "username" ).value = savedName;
        newName = false;
        welcomeUser();
    }
    // document.cookie = "name=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC";
}, false );

var imagesReady = false;
window.onload = function ()
{
    setDraggable( false, board );
    //keepHoverAligned();
    setupBoardDragEvents();

    imagesReady = true;

    sessionStorage.guessHistoryDetails = "";
    sessionStorage.recordDetails = "";
}

/* Event Call functions */
var dragged;
function setupBoardDragEvents()
{

    document.addEventListener( "dragstart", function ( event )
    {
        // store a ref. on the dragged elem
        dragged = event.target;
        // make it half transparent
        event.target.style.opacity = .5;
    }, false );
    document.addEventListener( "dragend", function ( event )
    {
        // store a ref. on the dragged elem
        dragged = event.target;
        // make it half transparent
        event.target.style.opacity = 1;
    }, false );


    kitchen.addEventListener( "drop", drop );
    ballroom.addEventListener( "drop", drop );
    conservatory.addEventListener( "drop", drop );
    diningroom.addEventListener( "drop", drop );
    billiardroom.addEventListener( "drop", drop );
    library.addEventListener( "drop", drop );
    lounge.addEventListener( "drop", drop );
    hall.addEventListener( "drop", drop );
    study.addEventListener( "drop", drop );

    kitchen.addEventListener( "dragover", function ( event )
    {
        event.preventDefault();
    }, false );
    ballroom.addEventListener( "dragover", function ( event )
    {
        event.preventDefault();
    }, false );
    conservatory.addEventListener( "dragover", function ( event )
    {
        event.preventDefault();
    }, false );
    diningroom.addEventListener( "dragover", function ( event )
    {
        event.preventDefault();
    }, false );
    billiardroom.addEventListener( "dragover", function ( event )
    {
        event.preventDefault();
    }, false );
    library.addEventListener( "dragover", function ( event )
    {
        event.preventDefault();
    }, false );
    lounge.addEventListener( "dragover", function ( event )
    {
        event.preventDefault();
    }, false );
    hall.addEventListener( "dragover", function ( event )
    {
        event.preventDefault();
    }, false );
    study.addEventListener( "dragover", function ( event )
    {
        event.preventDefault();
    }, false );


}

var currentRoomGuess = null;
var currentSuspectGuess = null;
var currentWeaponGuess = null;

function drop( ev )
{
    //check if room has already been selected
    if ( !currentRoomGuess )
    {
        currentRoomGuess = event.target;
    }
    if ( currentRoomGuess != event.target )
    {
        removeBoardCards();
        currentRoomGuess = null;
        currentSuspectGuess = null;
        currentWeaponGuess = null;
        document.getElementById( "roundResult" ).innerHTML += "<br>Invalid Guess! You  rooms must be the same for both guest and weapon.";
        return;
    }

    var cardType = dragged.getAttribute( "data-type" );

    if ( cardType == "weapon" )
    {
        if ( !currentWeaponGuess )
        {
            currentWeaponGuess = dragged;
        }
        if ( currentWeaponGuess != dragged )
        {
            removeBoardCards();
            currentRoomGuess = null;
            currentSuspectGuess = null;
            currentWeaponGuess = null;
            document.getElementById( "roundResult" ).innerHTML += "<br>Invalid Guess! You cannot place a weapon twice.";
            return;
        }
    }

    if ( cardType == "guest" )
    {
        if ( !currentSuspectGuess )
        {
            currentSuspectGuess = dragged;
        }
        if ( currentSuspectGuess != dragged )
        {
            removeBoardCards();
            currentRoomGuess = null;
            currentSuspectGuess = null;
            currentWeaponGuess = null;
            document.getElementById( "roundResult" ).innerHTML += "<br>Invalid Guess! You cannot place a guest twice.";
            return;
        }
    }

    var crt = dragged.cloneNode( true );

    event.target.appendChild( crt );
    ev.dataTransfer.setDragImage( crt, 0, 0 );

    crt.style.opacity = 0.5;
    dragged.style.opacity = 0.5;

    ev.preventDefault();

    dragged.style.opacity = 0.5;

    if ( currentWeaponGuess && currentSuspectGuess && currentRoomGuess )
    {
        userGuess();
    }
}

function keepHoverAligned()
{

    var hoverTable = document.getElementById( "hoverTable" );
    var board = document.getElementById( "board" );

    var rect = board.getBoundingClientRect();

    hoverTable.setAttribute( "height", board.offsetHeight.toString() );
    hoverTable.setAttribute( "width", board.offsetHeight.toString() );
    hoverTable.style.left = rect.left.toString() + "px";
    hoverTable.style.top = rect.top.toString() + "px";
    setTimeout( keepHoverAligned, 1000 );
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

function removeBoardCards()
{

    kitchen.innerHTML = '';
    ballroom.innerHTML = '';
    conservatory.innerHTML = '';
    diningroom.innerHTML = '';
    billiardroom.innerHTML = '';
    library.innerHTML = '';
    lounge.innerHTML = '';
    hall.innerHTML = '';
    study.innerHTML = '';

}

function setWeaponsDraggable( isDraggable )
{

    setDraggable( isDraggable, candlestick );
    setDraggable( isDraggable, knife );
    setDraggable( isDraggable, leadpipe );
    setDraggable( isDraggable, revolver );
    setDraggable( isDraggable, rope );
    setDraggable( isDraggable, wrench );

}

function setGuestsDraggable( isDraggable )
{
    setDraggable( isDraggable, colMustard );
    setDraggable( isDraggable, missScarlet );
    setDraggable( isDraggable, mrGreen );
    setDraggable( isDraggable, mrsPeacock );
    setDraggable( isDraggable, mrsWhite );
    setDraggable( isDraggable, profplum );
}

function setDraggable( isDraggable, specificElement )
{
    specificElement.setAttribute( "draggable", isDraggable.toString() );
}