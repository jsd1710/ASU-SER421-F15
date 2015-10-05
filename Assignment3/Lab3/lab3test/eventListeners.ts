module main {
    



    /* Event Call functions */
    var dragged;
    export function setupBoardDragEvents() {

        document.addEventListener("dragstart", function (event) {
            console.log("drag start");
            // store a ref. on the dragged elem
            dragged = event.target;
            // make it half transparent
            (<any>event.target).style.opacity = .5;
        }, false);
        document.addEventListener("dragend", function (event) {
            console.log("drag end");
            // store a ref. on the dragged elem
            dragged = event.target;
            // make it half transparent
            (<any>event.target).style.opacity = 1;
        }, false);


        kitchen.addEventListener("drop", drop);
        ballroom.addEventListener("drop", drop);
        conservatory.addEventListener("drop", drop);
        diningroom.addEventListener("drop", drop);
        billiardroom.addEventListener("drop", drop);
        library.addEventListener("drop", drop);
        lounge.addEventListener("drop", drop);
        hall.addEventListener("drop", drop);
        study.addEventListener("drop", drop);

        kitchen.addEventListener("dragover", function (event) {
            event.preventDefault();
        }, false);
        ballroom.addEventListener("dragover", function (event) {
            event.preventDefault();
        }, false);
        conservatory.addEventListener("dragover", function (event) {
            event.preventDefault();
        }, false);
        diningroom.addEventListener("dragover", function (event) {
            event.preventDefault();
        }, false);
        billiardroom.addEventListener("dragover", function (event) {
            event.preventDefault();
        }, false);
        library.addEventListener("dragover", function (event) {
            event.preventDefault();
        }, false);
        lounge.addEventListener("dragover", function (event) {
            event.preventDefault();
        }, false);
        hall.addEventListener("dragover", function (event) {
            event.preventDefault();
        }, false);
        study.addEventListener("dragover", function (event) {
            event.preventDefault();
        }, false);

        
    }


    function drop(ev) {

        console.log(dragged);
        var crt = dragged.cloneNode(true);

        (<any>event.target).appendChild(crt);
        ev.dataTransfer.setDragImage(crt, 0, 0);

        crt.style.opacity = 0.5;
        dragged.style.opacity = 0.5;


        console.log("drop");
        ev.preventDefault();

        dragged.style.opacity = 0.5;
    }







    export function keepHoverAligned() {
        
        var rect = board.getBoundingClientRect();
        console.log(rect.top, rect.right, rect.bottom, rect.left);

        hoverTable.setAttribute("height", board.offsetHeight.toString());
        hoverTable.setAttribute("width", board.offsetHeight.toString());
        hoverTable.style.left = rect.left.toString();
        hoverTable.style.top = rect.top.toString();

        setTimeout(keepHoverAligned, 1000);
    }



}