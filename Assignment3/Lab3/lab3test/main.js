var main;
(function (main) {
    //Dom objects (<img>)
    main.board = document.getElementById("board");
    //Guests
    main.colMustard = document.getElementById("colmustard");
    main.missScarlet = document.getElementById("missscarlet");
    main.mrGreen = document.getElementById("mrgreen");
    main.mrsPeacock = document.getElementById("mrspeacock");
    main.mrsWhite = document.getElementById("mrswhite");
    main.profplum = document.getElementById("profplom");
    //Weapons
    main.candlestick = document.getElementById("candlestick");
    main.knife = document.getElementById("knife");
    main.leadpipe = document.getElementById("leadpipe");
    main.revolver = document.getElementById("revolver");
    main.rope = document.getElementById("rope");
    main.wrench = document.getElementById("wrench");
    //Rooms
    main.kitchen = document.getElementById("kitchen");
    main.ballroom = document.getElementById("ballroom");
    main.conservatory = document.getElementById("conservatory");
    main.diningroom = document.getElementById("diningroom");
    main.billiardroom = document.getElementById("billiardroom");
    main.library = document.getElementById("library");
    main.lounge = document.getElementById("lounge");
    main.hall = document.getElementById("hall");
    main.study = document.getElementById("study");
    main.hoverTable = document.getElementById("hoverTable");
    main.gameTable = document.getElementById("gameTable");
    window.onload = function () {
        setDraggable(false, main.board);
        main.keepHoverAligned();
        main.setupBoardDragEvents();
        gameStart();
    };
    function gameStart() {
        setGuestsDraggable(true);
        setWeaponsDraggable(true);
        removeBoardCards();
    }
    function removeBoardCards() {
        main.kitchen.innerHTML = '';
        main.ballroom.innerHTML = '';
        main.conservatory.innerHTML = '';
        main.diningroom.innerHTML = '';
        main.billiardroom.innerHTML = '';
        main.library.innerHTML = '';
        main.lounge.innerHTML = '';
        main.hall.innerHTML = '';
        main.study.innerHTML = '';
    }
    function setWeaponsDraggable(isDraggable) {
        setDraggable(isDraggable, main.candlestick);
        setDraggable(isDraggable, main.knife);
        setDraggable(isDraggable, main.leadpipe);
        setDraggable(isDraggable, main.revolver);
        setDraggable(isDraggable, main.rope);
        setDraggable(isDraggable, main.wrench);
    }
    function setGuestsDraggable(isDraggable) {
        setDraggable(isDraggable, main.colMustard);
        setDraggable(isDraggable, main.missScarlet);
        setDraggable(isDraggable, main.mrGreen);
        setDraggable(isDraggable, main.mrsPeacock);
        setDraggable(isDraggable, main.mrsWhite);
        setDraggable(isDraggable, main.profplum);
    }
    function setDraggable(isDraggable, specificElement) {
        specificElement.setAttribute("draggable", isDraggable.toString());
    }
    function dragEnter(ev) {
        console.log("drag enter");
    }
    function dragLeave(ev) {
        console.log("drag leave");
    }
    var CardType;
    (function (CardType) {
        CardType[CardType["Guest"] = 0] = "Guest";
        CardType[CardType["Weapon"] = 1] = "Weapon";
        CardType[CardType["Room"] = 2] = "Room";
    })(CardType || (CardType = {}));
})(main || (main = {}));
//# sourceMappingURL=main.js.map