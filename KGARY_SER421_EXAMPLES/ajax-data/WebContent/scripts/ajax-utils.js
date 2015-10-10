// Get the browser-specific request object, either for
// Internet Explorer 5 and 6 (top entry) or for Firefox,
// Safari, Opera, Mozilla, Netscape, or IE 7 (bottom entry).

function getRequestObject() {
  if (window.ActiveXObject) { 
    return(new ActiveXObject("Microsoft.XMLHTTP"));
  } else if (window.XMLHttpRequest) {
    return(new XMLHttpRequest());
  } else {
    return(null);
  }
}

// Make an HTTP request to the given address. 
// Display result in the HTML element that has given ID.

function ajaxResult(address, resultRegion) {
  var request = getRequestObject();
  request.onreadystatechange = 
    function() { showResponseText(request, 
                                  resultRegion); };
  request.open("GET", address, true);
  request.send(null);
}

// Make an HTTP request to the given address. 
// Display result in the HTML element that has given ID.
// Use POST. Also see the more general ajaxPost function.

function ajaxResultPost(address, data, resultRegion) {
  var request = getRequestObject();
  request.onreadystatechange = 
    function() { showResponseText(request, 
                                  resultRegion); };
  request.open("POST", address, true);
  request.setRequestHeader("Content-Type", 
                           "application/x-www-form-urlencoded");
  request.send(data);
}

// Put response text in the HTML element that has given ID.

function showResponseText(request, resultRegion) {
  if ((request.readyState == 4) &&
      (request.status == 200)) {
    htmlInsert(resultRegion, request.responseText);
  }
}

// Insert the html data into the element 
// that has the specified id.

function htmlInsert(id, htmlData) {
  document.getElementById(id).innerHTML = htmlData;
}

// Return escaped value of textfield that has given id.
// The builtin "escape" function converts < to &lt;, etc.

function getValue(id) {
  return(escape(document.getElementById(id).value));
}

// Generalized version of ajaxResultPost. In this
// version, you pass in a response handler function
// instead of just a result region.

function ajaxPost(address, data, responseHandler) {
  var request = getRequestObject();
  request.onreadystatechange = 
    function() { responseHandler(request); };
  request.open("POST", address, true);
  request.setRequestHeader("Content-Type", 
                           "application/x-www-form-urlencoded");
  request.send(data);
}

// Given the name of an XML element, returns an array 
// of the values of all elements with that name.
// E.g., for 
//    <foo><a>one</a><q>two</q><a>three</a></foo>
// getXmlValues(doc, "a") would return 
//    ["one", "three"].

function getXmlValues(xmlDocument, xmlElementName) {
  var elementArray = 
    xmlDocument.getElementsByTagName(xmlElementName);
  var valueArray = new Array();
  for(var i=0; i<elementArray.length; i++) {
    valueArray[i] = 
      elementArray[i].childNodes[0].nodeValue;
  }
  return(valueArray);
}

// Takes as input an array of headings (to go into th elements)
// and an array-of-arrays of columns--not rows-- (to go into
// td elements). Builds an xhtml table from the data.

function getTable(headings, columns) {
  var table = "<table border='1'>\n" +
              getTableHeadings(headings) +
              getTableBody(columns) +
              "</table>";
  return(table);
}

function getTableHeadings(headings) {
  var firstRow = "  <tr>";
  for(var i=0; i<headings.length; i++) {
    firstRow += "<th>" + headings[i] + "</th>";
  }
  firstRow += "</tr>\n";
  return(firstRow);
}

function getTableBody(columns) {
  var numRows = columns[0].length;
  var numCols = columns.length;
  var body = "";
  for(var row=0; row<numRows; row++) {
    body += "  <tr>";
    for(var col=0; col<numCols; col++) {
      body += "<td>" + columns[col][row] + "</td>";
    }
    body += "</tr>\n";
  }
  return(body);
}

// Trick so that the Firebug console.log function will
// be ignored (instead of crashing) in Internet Explorer.
// Also see Firebug Lite and Faux Console if you want 
// logging to actually do something on IE.
// Firebug Lite: http://www.getfirebug.com/lite.html
// Faux Console: http://icant.co.uk/sandbox/fauxconsole/
 
try { console.log("Loading script"); 
} catch(e) { console = { log: function() {} }; }