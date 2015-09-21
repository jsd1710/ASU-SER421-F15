"use strict";
loadClueJSON();
var rooms = getRooms();
var guests = getGuests();
var weapons = getWeapons();

var secret =
    {
        room: rooms[parseInt( Math.random() * rooms.length )],
        guest: guests[parseInt( Math.random() * guests.length )],
        weapon: weapons[parseInt( Math.random() * weapons.length )]
    }

console.log( secret );

//Initialize HTML fields and forms.
document.getElementById("rooms").innerHTML = "Rooms:   " + rooms;
document.getElementById("guests").innerHTML = "Guests:  " + guests;
document.getElementById("weapons").innerHTML = "Weapons: " + weapons;

populateSelectBox("RoomSelect", getRooms());
populateSelectBox("SuspectSelect", getGuests());
populateSelectBox( "WeaponSelect", getWeapons() );
