function showInfo(node, indent) {
  if (node.nodeType == Node.TEXT_NODE) {
    console.log("%s Body content is '%s'.", 
                spaces(indent), node.nodeValue);
  } else if (node.nodeType == Node.ELEMENT_NODE) {
    console.log("%s Found element '%s'.", 
                spaces(indent), node.nodeName);
    var children = node.childNodes;
    for(var i=0; i<children.length; i++) {
      showInfo(children[i], indent+1);
    }
  }
}

function spaces(n) {
  var indentString = "  ";
  var result = "";
  for(var i=0; i<n; i++) {
    result = result.concat(indentString);
  }
  return(result);
}

// test variable and getXmlDoc function 
// defined in document.js
var testDoc = getXmlDoc(test); 
testDoc.documentElement.normalize();
showInfo(testDoc.documentElement, 0);