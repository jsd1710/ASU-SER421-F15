

module main {
    //Dom objects (<img>)
    export var board = document.getElementById("board");
    //Guests
    export var colMustard = document.getElementById("colmustard");
    export var missScarlet = document.getElementById("missscarlet");
    export var mrGreen = document.getElementById("mrgreen");
    export var mrsPeacock = document.getElementById("mrspeacock");
    export var mrsWhite = document.getElementById("mrswhite");
    export var profplum = document.getElementById("profplom");
    //Weapons
    export var candlestick = document.getElementById("candlestick");
    export var knife = document.getElementById("knife");
    export var leadpipe = document.getElementById("leadpipe");
    export var revolver = document.getElementById("revolver");
    export var rope = document.getElementById("rope");
    export var wrench = document.getElementById("wrench");
    //Rooms
    export var kitchen = document.getElementById("kitchen");
    export var ballroom = document.getElementById("ballroom");
    export var conservatory = document.getElementById("conservatory");
    export var diningroom = document.getElementById("diningroom");
    export var billiardroom = document.getElementById("billiardroom");
    export var library = document.getElementById("library");
    export var lounge = document.getElementById("lounge");
    export var hall = document.getElementById("hall");
    export var study = document.getElementById("study");

    export var hoverTable = document.getElementById("hoverTable");
    export var gameTable = document.getElementById("gameTable");

    window.onload = function () {
        setDraggable(false, board);
        keepHoverAligned();
        setupBoardDragEvents();

        gameStart();

    }

    function gameStart() {

        setGuestsDraggable(true);
        setWeaponsDraggable(true);
        removeBoardCards();
    }

    function removeBoardCards() {

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




    function setWeaponsDraggable(isDraggable: boolean) {

        setDraggable(isDraggable, candlestick);
        setDraggable(isDraggable, knife);
        setDraggable(isDraggable, leadpipe);
        setDraggable(isDraggable, revolver);
        setDraggable(isDraggable, rope);
        setDraggable(isDraggable, wrench);

    }
    function setGuestsDraggable(isDraggable: boolean) {
        setDraggable(isDraggable, colMustard);
        setDraggable(isDraggable, missScarlet);
        setDraggable(isDraggable, mrGreen);
        setDraggable(isDraggable, mrsPeacock);
        setDraggable(isDraggable, mrsWhite);
        setDraggable(isDraggable, profplum);
    }
    function setDraggable(isDraggable: boolean, specificElement: HTMLElement) {
        specificElement.setAttribute("draggable", isDraggable.toString());
    }





















    function dragEnter(ev) {
        console.log("drag enter");
    }

    function dragLeave(ev) {
        console.log("drag leave");
    }

    enum CardType { Guest, Weapon, Room }


}