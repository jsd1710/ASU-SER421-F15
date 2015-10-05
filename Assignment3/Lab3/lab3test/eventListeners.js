var main;
(function (main) {
    /* Event Call functions */
    var dragged;
    function setupBoardDragEvents() {
        document.addEventListener("dragstart", function (event) {
            console.log("drag start");
            // store a ref. on the dragged elem
            dragged = event.target;
            // make it half transparent
            event.target.style.opacity = .5;
        }, false);
        document.addEventListener("dragend", function (event) {
            console.log("drag end");
            // store a ref. on the dragged elem
            dragged = event.target;
            // make it half transparent
            event.target.style.opacity = 1;
        }, false);
        main.kitchen.addEventListener("drop", drop);
        main.ballroom.addEventListener("drop", drop);
        main.conservatory.addEventListener("drop", drop);
        main.diningroom.addEventListener("drop", drop);
        main.billiardroom.addEventListener("drop", drop);
        main.library.addEventListener("drop", drop);
        main.lounge.addEventListener("drop", drop);
        main.hall.addEventListener("drop", drop);
        main.study.addEventListener("drop", drop);
        main.kitchen.addEventListener("dragover", function (event) {
            event.preventDefault();
        }, false);
        main.ballroom.addEventListener("dragover", function (event) {
            event.preventDefault();
        }, false);
        main.conservatory.addEventListener("dragover", function (event) {
            event.preventDefault();
        }, false);
        main.diningroom.addEventListener("dragover", function (event) {
            event.preventDefault();
        }, false);
        main.billiardroom.addEventListener("dragover", function (event) {
            event.preventDefault();
        }, false);
        main.library.addEventListener("dragover", function (event) {
            event.preventDefault();
        }, false);
        main.lounge.addEventListener("dragover", function (event) {
            event.preventDefault();
        }, false);
        main.hall.addEventListener("dragover", function (event) {
            event.preventDefault();
        }, false);
        main.study.addEventListener("dragover", function (event) {
            event.preventDefault();
        }, false);
    }
    main.setupBoardDragEvents = setupBoardDragEvents;
    function drop(ev) {
        console.log(dragged);
        var crt = dragged.cloneNode(true);
        event.target.appendChild(crt);
        ev.dataTransfer.setDragImage(crt, 0, 0);
        crt.style.opacity = 0.5;
        dragged.style.opacity = 0.5;
        console.log("drop");
        ev.preventDefault();
        dragged.style.opacity = 0.5;
    }
    function keepHoverAligned() {
        var rect = main.board.getBoundingClientRect();
        console.log(rect.top, rect.right, rect.bottom, rect.left);
        main.hoverTable.setAttribute("height", main.board.offsetHeight.toString());
        main.hoverTable.setAttribute("width", main.board.offsetHeight.toString());
        main.hoverTable.style.left = rect.left.toString();
        main.hoverTable.style.top = rect.top.toString();
        setTimeout(keepHoverAligned, 1000);
    }
    main.keepHoverAligned = keepHoverAligned;
})(main || (main = {}));
//# sourceMappingURL=eventListeners.js.map