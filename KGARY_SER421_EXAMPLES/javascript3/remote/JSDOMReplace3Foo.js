console.log('EXTERNAL SCRIPT SLEEPY3DOMReplace EXECUTED OFF DCS');
var fooElem=document.getElementById("foo");
if (fooElem == 'undefined' || fooElem == null) console.log("GOT NO REMOTE FOO");
else {
    console.log("GOT ME SOME REMOTE FOO");
    fooElem.innerHTML="Table 1 changed FOO";
}
