var main;
(function (main) {
    /* Before gameplay Stuff, i.e. requirement 2 (load player name / welcome.
    Before images/style sheets load. */
    document.addEventListener('DOMContentLoaded', function (e) {
        var savedName = getCookie("name");
        if (savedName == null) {
        }
        else {
            name = savedName;
        }
        // document.cookie = "name=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC";
    }, false);
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }
    main.setCookie = setCookie;
    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ')
                c = c.substring(1);
            if (c.indexOf(name) == 0)
                return c.substring(name.length, c.length);
        }
        return null;
    }
})(main || (main = {}));
//# sourceMappingURL=DomLoad.js.map