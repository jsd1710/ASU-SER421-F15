"use strict";

//Initialize HTML fields and forms.
document.getElementById("rooms").innerHTML = "Rooms:   " + getRooms();
document.getElementById("guests").innerHTML = "Guests:  " + getGuests();
document.getElementById("weapons").innerHTML = "Weapons: " + getWeapons();

populateSelectBox("RoomSelect", getRooms());
populateSelectBox("SuspectSelect", getGuests());
populateSelectBox("WeaponSelect", getWeapons());