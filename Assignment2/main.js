﻿"use strict";
loadClueJSON();

var rooms = getRooms();
var guests = getGuests();
var weapons = getWeapons();

var availableRoomCards = getRooms().slice();
var availableGuestCards = getGuests().slice();
var availableWeaponCards = getWeapons().slice();

generateSecret();

//Initialize HTML fields and forms.
document.getElementById("rooms").innerHTML = "Rooms:   " + rooms;
document.getElementById("guests").innerHTML = "Guests:  " + guests;
document.getElementById("weapons").innerHTML = "Weapons: " + weapons;

populateSelectBox("RoomSelect", getRooms());
populateSelectBox("SuspectSelect", getGuests());
populateSelectBox( "WeaponSelect", getWeapons() );
