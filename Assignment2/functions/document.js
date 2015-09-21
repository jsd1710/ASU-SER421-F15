"use strict";
function populateSelectBox(boxID, itemArray)
{
    let destSelBox = document.getElementById(boxID);
    let fragment = document.createDocumentFragment();

    itemArray.forEach(
        function (option, index)
        {
            let opt = document.createElement("option");
            opt.innerHTML = option;
            opt.value = option;
            fragment.appendChild(opt);
        }
    );
    destSelBox.appendChild(fragment);
}

function welcomeName(formID, userNameBoxID)
{
    let nameForm = document.getElementById( formID );
    let userName = document.getElementById( userNameBoxID ).value;
    nameForm.innerHTML = "Welcome, " + userName;
}





