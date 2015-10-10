// Build a table from purely client-side information.
// To test the getTable function.

function clientTable(displayRegion) {
  var headings = ["Quarter", "Apples", "Oranges"];
  var columns = [["Q1", "Q2", "Q3", "Q4"],
                 [randomSales(), randomSales(), 
                  randomSales(), randomSales()],
                 [randomSales(), randomSales(), 
                  randomSales(), randomSales()]];
  var table = getTable(headings, columns);
  htmlInsert(displayRegion, table);
}

function randomSales() {
  var sales = 1000 + (Math.round(Math.random() * 9000));
  return("$" + sales);
}

// See combined version at end that can handle
// any of XML, JSON, or String data.

function xmlCityTable(inputField, resultRegion) {
  var address = "show-cities";
  var data = "cityType=" + getValue(inputField) +
             "&format=xml";
  ajaxPost(address, data, 
           function(request) { 
             showXmlCityInfo(request, resultRegion); 
           });
}

function showXmlCityInfo(request, resultRegion) {
  if ((request.readyState == 4) &&
      (request.status == 200)) {
    var xmlDocument = request.responseXML;
    var headings = ["City", "Time", "Population"];
    var columns = [getXmlValues(xmlDocument, "name"),
                   getXmlValues(xmlDocument, "time"),
                   getXmlValues(xmlDocument, "population")];
    var table = getTable(headings, columns);
    htmlInsert(resultRegion, table);
  }
}

function jsonCityTable(inputField, resultRegion) {
  var address = "show-cities";
  var data = "cityType=" + getValue(inputField) +
             "&format=json";
  ajaxPost(address, data, 
           function(request) { 
             showJsonCityInfo(request, resultRegion); 
           });
}

function showJsonCityInfo(request, resultRegion) {
  if ((request.readyState == 4) &&
      (request.status == 200)) {
    var rawData = request.responseText;
    var data = eval(rawData);
    var headings = ["City", "Time", "Population"];
    var columns = [data.names, 
                   data.times, 
                   data.populations];
    var table = getTable(headings, columns);
    htmlInsert(resultRegion, table);
  }
}

function stringCityTable(inputField, resultRegion) {
  var address = "show-cities";
  var data = "cityType=" + getValue(inputField) +
             "&format=string";
  ajaxPost(address, data, 
           function(request) { 
             showStringCityInfo(request, resultRegion); 
           });
}

function showStringCityInfo(request, resultRegion) {
  if ((request.readyState == 4) &&
      (request.status == 200)) {
    var rawData = request.responseText;
    var columnStrings = rawData.split(/\n/);
    var names = columnStrings[0].split("#");
    var times = columnStrings[1].split("#");
    var populations = columnStrings[2].split("#");
    var headings = ["City", "Time", "Population"];
    var columns = [names, times, populations];
    var table = getTable(headings, columns);
    htmlInsert(resultRegion, table);
  }
}

function cityTable(cityTypeField, formatField, resultRegion) {
  var address = "show-cities";
  var cityType = getValue(cityTypeField);
  var format = getValue(formatField);
  var data = "cityType=" + cityType +
             "&format=" + format;
  var responseHandler = findHandler(format);
  ajaxPost(address, data, 
           function(request) { 
             responseHandler(request, resultRegion); 
           });
}

// Reminder: unlike in Java, in JavaScript it is OK to 
// use == to compare strings.

function findHandler(format) {
  if (format == "xml") {
    return(showXmlCityInfo);
  } else if (format == "json") {
    return(showJsonCityInfo);
  } else {
    return(showStringCityInfo);
  }
}