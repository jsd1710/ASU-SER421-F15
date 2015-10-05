
    //The global arrays
    rooms = ["Room0", "Room1", "Room2", "Room3", "Room4"];
    guests = ["Guest0", "Guest1", "Guest2"];
    weapons = ["Weapon0", "Weapon1", "Weapon2"];
    //dom objects
    var mainDiv = document.getElementById("main");
    var reloadGameBtn;
    var domLists, domNames, domGuess;
    var roomsDom, guestsDom, weaponsDom;
    var nameEnterArea, nameTxtBox, nameBtn, introArea;
    var guessRooms, guessSuspects, guessWeapons, guessBtn;
    var log;
    //arrays of cards for player, comp, and the secret
    secret = [];
    myCards = [];
    compCards = [];
    //player name
    var name = "";
    //sets the dom objects.
    //Pre-made the tags in the html file, instead of writing a long html string for each different dom object. Which would be overall
    //more messy to look at. This way it's easy to see the html dom objects before hand (in the html file) and see how everything is set up
    function getDomObjects() {
        domLists = document.getElementById('listsSection');
        domNames = document.getElementById('nameSection');
        domGuess = document.getElementById('guessSection');
        roomsDom = document.getElementById('rooms');
        guestsDom = document.getElementById('guests');
        weaponsDom = document.getElementById('weapons');
        nameEnterArea = document.getElementById("nameEnterArea");
        nameTxtBox = document.getElementById("nameTxt");
        nameBtn = document.getElementById("nameBtn");
        introArea = document.getElementById("intro");
        nameBtn.onclick = enteredName;
        guessRooms = document.getElementById("guessRoom");
        guessSuspects = document.getElementById("guessSuspect");
        guessWeapons = document.getElementById("guessWeapon");
        guessBtn = document.getElementById("guess");
        guessBtn.onclick = playerGuess;
        reloadGameBtn = document.getElementById("reload");
        log = document.getElementById("log");
    }
    //After entering player name, starts game
    function startGame() {
        domNames.removeChild(nameEnterArea);
        createSecretAndHandoutCards();
        introArea.innerHTML = "Welcome " + name + ", you hold the cards for " + replaceAll(",", ", ", myCards.toString());
        console.log("Player holds the cards for " + replaceAll(",", ", ", myCards.toString()) + "\n comp hold the cards for " + replaceAll(",", ", ", compCards.toString()) + "\n secret is " + replaceAll(",", ", ", secret.toString()));
        guessBtn.disabled = false;
    }
    function playerGuess() {
        guessBtn.setAttribute("value", "continue");
        log.innerHTML = "";
        var guessRoom = guessRooms.options[guessRooms.selectedIndex].value;
        var guessGuest = guessSuspects.options[guessSuspects.selectedIndex].value;
        var guessWeapon = guessWeapons.options[guessWeapons.selectedIndex].value;
        if (secret.indexOf(guessRoom) == -1) {
            log.innerHTML += "<br><span>" + "You guessed the room incorrectly!";
            guessBtn.onclick = computerTurn;
            return;
        }
        if (secret.indexOf(guessGuest) == -1) {
            log.innerHTML += "<br><span>" + "You guessed the suspect incorrectly!";
            //computerTurn();
            guessBtn.onclick = computerTurn;
            return;
        }
        if (secret.indexOf(guessWeapon) == -1) {
            log.innerHTML += "<br><span>" + "You guessed the weapon incorrectly!";
            guessBtn.onclick = computerTurn;
            return;
        }
        updateComputerLoss();
    }
    //copy array by value, randomize and guess a room/suspect/weapon that isn't in the computers
    //own card array
    function computerTurn() {
        var copiedRoomArray = shuffle(rooms.slice());
        var copiedGuestArray = shuffle(guests.slice());
        var copiedWeaponArray = shuffle(weapons.slice());
        var roomGuess = copiedRoomArray.pop();
        while (compCards.indexOf(roomGuess) > -1) {
            roomGuess = copiedRoomArray.pop();
        }
        var guestGuess = copiedGuestArray.pop();
        while (compCards.indexOf(guestGuess) > -1) {
            guestGuess = copiedGuestArray.pop();
        }
        var weaponGuess = copiedWeaponArray.pop();
        while (compCards.indexOf(weaponGuess) > -1) {
            weaponGuess = copiedWeaponArray.pop();
        }
        if (secret.indexOf(roomGuess) == -1) {
            console.log("The Computer guessed the room incorrectly: " + roomGuess);
            log.innerHTML += "<br><span>" + "The Computer guessed (" + roomGuess + ", " + guestGuess + ", " + weaponGuess + ") incorrectly!</span>";
            guessBtn.onclick = intermediate;
            return;
        }
        if (secret.indexOf(guestGuess) == -1) {
            console.log("The Computer guessed the suspect incorrectly: " + guestGuess);
            log.innerHTML += "<br><span>" + "The Computer guessed (" + roomGuess + ", " + guestGuess + ", " + weaponGuess + ") incorrectly!</span>";
            guessBtn.onclick = intermediate;
            return;
        }
        if (secret.indexOf(weaponGuess) == -1) {
            console.log("The Computer guessed the weapon incorrectly: " + weaponGuess);
            log.innerHTML += "<br><span>" + "The Computer guessed (" + roomGuess + ", " + guestGuess + ", " + weaponGuess + ") incorrectly!</span>";
            guessBtn.onclick = intermediate;
            return;
        }
        updateComputerWon();
    }
    function intermediate() {
        log.innerHTML += "<br>Guess again!";
        guessBtn.setAttribute("value", "Guess");
        guessBtn.onclick = playerGuess;
    }
    //uses html dom-object attributes to store and retrieve data (wins,losses, and the log of matches (who/result/date)
    function updateComputerWon() {
        var history = document.getElementById("history").getAttribute("data-history");
        var wins = document.getElementById("historywl").getAttribute("data-w");
        document.getElementById("historywl").setAttribute("data-w", (parseInt(wins) + 1).toString());
        var date = new Date();
        var now = (date.getMonth() + 1).toString() + "/" + date.getDate().toString() + "/" + date.getFullYear() + " " + date.getHours().toString() + ":" + date.getMinutes().toString();
        var newHistoryLabel = "<span>Computer won against " + name + " on " + now + ". </span><br/>";
        history = history + newHistoryLabel;
        document.getElementById("history").setAttribute("data-history", history);
        log.innerHTML = "<br><span>The computer guessed correctly! You lost the game! (" + secret.toString() + ") </span>";
        guessBtn.onclick = InitGame;
        updateHistory();
    }
    //uses html dom-object attributes to store and retrieve data (wins,losses, and the log of matches (who/result/date)
    function updateComputerLoss() {
        var history = document.getElementById("history").getAttribute("data-history");
        var losses = document.getElementById("historywl").getAttribute("data-l");
        document.getElementById("historywl").setAttribute("data-l", (parseInt(losses) + 1).toString());
        var date = new Date();
        var now = (date.getMonth() + 1).toString() + "/" + date.getDate().toString() + "/" + date.getFullYear() + " " + date.getHours().toString() + ":" + date.getMinutes().toString();
        var newHistoryLabel = "<span>Computer Lost to " + name + " on " + now + ". </span><br/>";
        history = history + newHistoryLabel;
        document.getElementById("history").setAttribute("data-history", history);
        log.innerHTML = "<br><span>You won the game!</span>";
        guessBtn.onclick = InitGame;
        updateHistory();
    }
    //hand out cards back and forth between the computer and player. last card left in each (copied/shuffled) array becomes the secret.
    function createSecretAndHandoutCards() {
        secret = [];
        myCards = [];
        compCards = [];
        //Hand out rooms cards
        var clonedArray = rooms.slice(0);
        //shuffle(clonedArray);
        for (var i = 0; i < rooms.length - 1; i++)
            if (i % 2 == 0)
                myCards.push(clonedArray.pop());
            else
                compCards.push(clonedArray.pop());
        //Last room card, set as secret
        secret.push(clonedArray.pop());
        //Hand out Guest cards
        clonedArray = guests.slice();
        shuffle(clonedArray);
        for (var i = 0; i < guests.length - 1; i++)
            if (i % 2 == 0)
                myCards.push(clonedArray.pop());
            else
                compCards.push(clonedArray.pop());
        //Last guest card, set as secret
        secret.push(clonedArray.pop());
        //Hand out Weapon cards
        clonedArray = weapons.slice();
        shuffle(clonedArray);
        //If even number, give to player, else give to comp
        for (var i = 0; i < weapons.length - 1; i++)
            if (i % 2 == 0)
                myCards.push(clonedArray.pop());
            else
                compCards.push(clonedArray.pop());
        //Last weapon card, set as secret
        secret.push(clonedArray.pop());
    }
    //Sets up the game, asks for name, reloads the global arrays. (Reload Game Button also calls this function, mainly for when you
    //change the global arrays in the console ie: weaponsArray = ["fdsfsdf","fgdgdfgdf","fgdfgdfgrdgrd","fdgdfgrdsgr","dgerafedgg"]
    function InitGame() {
        reloadGameBtn.onclick = InitGame;
        mainDiv.innerHTML = "";
        mainDiv.appendChild(reloadGameBtn);
        mainDiv.appendChild(domLists);
        mainDiv.appendChild(domNames);
        introArea.innerHTML = "";
        if (nameEnterArea.parentNode == null)
            domNames.appendChild(nameEnterArea);
        mainDiv.appendChild(domGuess);
        mainDiv.appendChild(log);
        log.innerHTML = "";
        guessBtn.disabled = true;
        loadArrays();
        guessBtn.onclick = playerGuess;
        guessBtn.setAttribute("value", "Guess");
    }
    //validates that atleast 1 character was entered for the player's name
    function enteredName() {
        var txtBoxValue = nameTxtBox.value;
        var error = "Enter a name!";
        if (txtBoxValue.length < 1)
            nameTxtBox.value = error;
        else if (txtBoxValue == error)
            nameTxtBox.value = error;
        else {
            name = txtBoxValue;
            startGame();
        }
    }
    //load global arrays into the html (label/dropdownlists/etc)
    function loadArrays() {
        roomsDom.innerHTML = replaceAll(",", ", ", rooms.toString());
        guestsDom.innerHTML = replaceAll(",", ", ", guests.toString());
        weaponsDom.innerHTML = replaceAll(",", ", ", weapons.toString());
        guessRooms.innerHTML = "";
        guessSuspects.innerHTML = "";
        guessWeapons.innerHTML = "";
        for (var i = 0; i < rooms.length; i++) {
            var option = document.createElement('option');
            option.text = rooms[i];
            option.value = rooms[i];
            guessRooms.appendChild(option);
        }
        for (var i = 0; i < guests.length; i++) {
            var option = document.createElement('option');
            option.text = guests[i];
            option.value = guests[i];
            guessSuspects.appendChild(option);
        }
        for (var i = 0; i < weapons.length; i++) {
            var option = document.createElement('option');
            option.text = weapons[i];
            option.value = weapons[i];
            guessWeapons.appendChild(option);
        }
    }
    //Shuffle an array: http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
    function shuffle(o) {
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x)
            ;
        return o;
    }
    function replaceAll(find, replace, str) {
        return str.replace(new RegExp(find, 'g'), replace);
    }
    function toggleHistory() {
        var historyInnerHtml = document.getElementById("historywl").innerHTML;
        if (historyInnerHtml.length < 4) {
            document.getElementById("toggleHistory").setAttribute("value", "Hide History");
            var history = document.getElementById("history").getAttribute("data-history");
            var losses = document.getElementById("historywl").getAttribute("data-l");
            var wins = document.getElementById("historywl").getAttribute("data-w");
            document.getElementById("history").innerHTML = history;
            document.getElementById("historywl").innerHTML = "Computer W/L: " + wins + " / " + losses;
        }
        else {
            document.getElementById("history").innerHTML = " ";
            document.getElementById("historywl").innerHTML = " ";
            document.getElementById("toggleHistory").setAttribute("value", "Show History");
        }
    }
    //called after winning or losing. if the history is currently being shown, it updates it (not just the attributes)
    function updateHistory() {
        var historyInnerHtml = document.getElementById("historywl").innerHTML;
        if (historyInnerHtml.length > 4) {
            document.getElementById("toggleHistory").setAttribute("value", "Hide History");
            var history = document.getElementById("history").getAttribute("data-history");
            var losses = document.getElementById("historywl").getAttribute("data-l");
            var wins = document.getElementById("historywl").getAttribute("data-w");
            document.getElementById("history").innerHTML = history;
            document.getElementById("historywl").innerHTML = "Computer W/L: " + wins + " / " + losses;
        }
    }
    window.onload = function () {
        mainDiv = document.getElementById("main");
        getDomObjects();
        InitGame();
        document.getElementById("hidden").remove();
        document.getElementById("toggleHistory").onclick = toggleHistory;
    };
