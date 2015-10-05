var suspects = [];
var rooms = [];
var weapons = [];

//Dom objects (<img>)
var board = document.getElementById( "board" );
//Guests
var colMustard = document.getElementById( "colmustard" );
suspects.push( colMustard );
var missScarlet = document.getElementById( "missscarlet" );
suspects.push( missScarlet );
var mrGreen = document.getElementById( "mrgreen" );
suspects.push( mrGreen );
var mrsPeacock = document.getElementById( "mrspeacock" );
suspects.push( mrsPeacock );
var mrsWhite = document.getElementById( "mrswhite" );
suspects.push( mrsWhite );
var profplum = document.getElementById( "profplom" );
suspects.push( profplum );
//Weapons
var candlestick = document.getElementById( "candlestick" );
weapons.push( candlestick );
var knife = document.getElementById( "knife" );
weapons.push( knife );
var leadpipe = document.getElementById( "leadpipe" );
weapons.push( leadpipe );
var revolver = document.getElementById( "revolver" );
weapons.push( revolver );
var rope = document.getElementById( "rope" );
weapons.push( rope );
var wrench = document.getElementById( "wrench" );
weapons.push( wrench );
//Rooms
var kitchen = document.getElementById( "kitchen" );
rooms.push( kitchen );
var ballroom = document.getElementById( "ballroom" );
rooms.push( ballroom );
var conservatory = document.getElementById( "conservatory" );
rooms.push( conservatory );
var diningroom = document.getElementById( "diningroom" );
rooms.push( diningroom );
var billiardroom = document.getElementById( "billiardroom" );
rooms.push( billiardroom );
var library = document.getElementById( "library" );
rooms.push( library );
var lounge = document.getElementById( "lounge" );
rooms.push( lounge );
var hall = document.getElementById( "hall" );
rooms.push( hall );
var study = document.getElementById( "study" );
rooms.push( study );

var hoverTable = document.getElementById( "hoverTable" );
var gameTable = document.getElementById( "gameTable" );


var secretToGuess = {};

var username;

var gameEndStatus = false;
var winner = "";
var usersTurn = true;

function generateSecretToGuess()
{
    secretToGuess["suspect"] = suspects[Math.floor( Math.random() * suspects.length )]; // random element from suspects array
    secretToGuess["room"] = rooms[Math.floor( Math.random() * rooms.length )]; // random element from rooms array
    secretToGuess["weapon"] = weapons[Math.floor( Math.random() * weapons.length )]; // random element from weapons array
}

function welcomeUser()
{
    generateSecretToGuess();

    username = document.getElementById( "username" ).value;
    setCookie( "name", username, 4200 ); //Store name as cookie
    document.getElementById( "form" ).innerHTML = "Welcome " + username + "<br>";

    var resetName = document.createElement( "button" );
    resetName.onclick = function ()
    {
        newName = true;
        restartGame();
    };
    resetName.innerHTML = "Reset Name";
    document.getElementById( "form" ).appendChild( resetName );

    setUpBoard();
}


function setUpBoard()
{
    if ( !imagesReady )
    {
        setTimeout( setUpBoard, 1000 );
        return;
    }

    removeBoardCards();
    setWeaponsDraggable( true );
    setGuestsDraggable( true );
}

function constructContinueDiv()
{
    currentRoomGuess = null;
    currentSuspectGuess = null;
    currentWeaponGuess = null;

    var continueDiv = document.createElement( "div" );
    continueDiv.setAttribute( "id", "continueDiv" );

    document.getElementById( "guessingDiv" ).appendChild( continueDiv );


    var continueBtn = document.createElement( "button" );
    continueBtn.onclick = continueGame;

    var textNode = document.createTextNode( "Continue" );
    continueBtn.appendChild( textNode );
    continueDiv.appendChild( continueBtn );
}

function restartGame()
{
    removeBoardCards();
    currentRoomGuess = null;
    currentSuspectGuess = null;
    currentWeaponGuess = null;

    // clear guess history
    sessionStorage.guessHistoryDetails = "";
    document.getElementById( "guessHistoryDetails" ).innerHTML = sessionStorage.guessHistoryDetails;

    // remove guessingDiv's children
    var guessingDiv = document.getElementById( "guessingDiv" );
    while ( guessingDiv.firstChild )
    {
        guessingDiv.removeChild( guessingDiv.firstChild );
    }

    // save record
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if ( dd < 10 )
    {
        dd = '0' + dd;
    }

    if ( mm < 10 )
    {
        mm = '0' + mm;
    }

    today = mm + '/' + dd + '/' + yyyy;
    sessionStorage.recordDetails += "<br>" + "Game against - " + username + ", played on - " + today + ", winner was - " + winner;
    document.getElementById( "recordDetails" ).innerHTML += sessionStorage.recordDetails;

    usersTurn = true;
    winner = "";
    gameEndStatus = false;

    if ( newName )
        document.getElementById( "form" ).innerHTML = "<input type='text' placeholder='Enter your name' id='username'><button type='button' onclick='welcomeUser()'>Submit</button>";
}

var newName = true;

function userGuess()
{
    var selectedRoom = currentRoomGuess; 
    var selectedSuspect = currentSuspectGuess; 
    var selectedWeapon = currentWeaponGuess;
    sessionStorage.guessHistoryDetails += "<br>" + username + " guessed : " + selectedRoom.id + "," + selectedSuspect.name + "," + selectedWeapon.id;

    document.getElementById( "guessHistoryDetails" ).innerHTML = sessionStorage.guessHistoryDetails;

    if ( secretToGuess.room === selectedRoom && secretToGuess.suspect === selectedSuspect && secretToGuess.weapon === selectedWeapon )
    {
        // a. If the guess matches the secret, dynamically display a “win” message
        document.getElementById( "roundResult" ).innerHTML = username + ", You Win!!!";
        gameEndStatus = true;
        winner = username;
    }
    else if ( secretToGuess.room !== selectedRoom )
    { // If the guess does not match the secret, dynamically display a message stating 1) the guess did not match the secret, and 2) Reveal ONE AND ONLY ONE incorrect component of your guess.
        document.getElementById( "roundResult" ).innerHTML = username + "! Your guess did not match! " + selectedRoom.id + " is incorrect.";
    }
    else if ( secretToGuess.suspect !== selectedSuspect )
    {
        document.getElementById( "roundResult" ).innerHTML = username + "! Your guess did not match! " + selectedSuspect.name + " is incorrect.";
    }
    else
    {
        document.getElementById( "roundResult" ).innerHTML = username + "! Your guess did not match! " + selectedWeapon.id + " is incorrect.";
    }
    constructContinueDiv();
}

// When the user’s (incorrect) move is complete, have the Computer make a guess. A simple random guess will do,though the program should know not to guess cards that it itself holds. Like #4, display a message indicating whether the Computer’s guess was correct or not, and a Continue button at the end. CAVEAT: The distinction here is that you are told the Computer’s guess, but should not be told the incorrect component of the guess, which is different than what happens for the user (5.b.2).
function computerGuess()
{
    var computersGuess = {};
    computersGuess.suspect = suspects[Math.floor( Math.random() * suspects.length )]; // random element from filteredSuspects array
    computersGuess.room = rooms[Math.floor( Math.random() * rooms.length )]; // random element from filteredRooms array
    computersGuess.weapon = weapons[Math.floor( Math.random() * weapons.length )]; // random element from filteredWeapons array

    sessionStorage.guessHistoryDetails += "<br>computer" + " guessed : " + computersGuess.room.id + "," + computersGuess.suspect.name + "," + computersGuess.weapon.id;

    document.getElementById( "guessHistoryDetails" ).innerHTML = sessionStorage.guessHistoryDetails;
    document.getElementById( "roundResult" ).innerHTML = "Computer's guess was - " + computersGuess.room.id + " " + computersGuess.suspect.name + " " + computersGuess.weapon.id;

    if ( secretToGuess.room === computersGuess.room && secretToGuess.suspect === computersGuess.suspect && secretToGuess.weapon === computersGuess.weapon )
    {
        document.getElementById( "roundResult" ).innerHTML += "<br>Computer Won!!!";
        gameEndStatus = true;
        winner = "Computer";
    }
    else
    {
        document.getElementById( "roundResult" ).innerHTML += "<br>Computer's Guess was incorrect!";
    }

    removeBoardCards();
    currentRoomGuess = null;
    currentSuspectGuess = null;
    currentWeaponGuess = null;

    constructContinueDiv();
}

function continueGame()
{
    document.getElementById( "guessingDiv" ).removeChild( document.getElementById( "continueDiv" ) );
    document.getElementById( "roundResult" ).innerHTML = "";

    if ( gameEndStatus )
    {
        restartGame(); // restart game
    }
    else
    {
        if ( usersTurn )
        {
            usersTurn = false;
            computerGuess();
        } else
        {
            usersTurn = true;
        }
    }
}

function showHistory()
{
    if ( document.getElementById( "guessHistoryDetails" ).hasAttribute( "hidden" ) )
    {
        document.getElementById( "historyBtn" ).innerHTML = "Hide History";
        document.getElementById( "guessHistoryDetails" ).removeAttribute( "hidden" );
    } else
    {
        document.getElementById( "guessHistoryDetails" ).setAttribute( "hidden", true );
        document.getElementById( "historyBtn" ).innerHTML = "Show History";
    }
}

function showRecord()
{
    if ( document.getElementById( "recordDetails" ).hasAttribute( "hidden" ) )
    {
        document.getElementById( "recordBtn" ).innerHTML = "Hide Record";
        document.getElementById( "recordDetails" ).removeAttribute( "hidden" );
    } else
    {
        document.getElementById( "recordDetails" ).setAttribute( "hidden", true );
        document.getElementById( "recordBtn" ).innerHTML = "Show Record";
    }
}