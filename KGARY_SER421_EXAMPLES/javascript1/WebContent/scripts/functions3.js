/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Cmd-R),
 * 2. Inspect to bring up an Object Inspector on the result (Cmd-I), or,
 * 3. Display to insert the result in a comment after the selection. (Cmd-L)
 */

function doSomethingWith(v, params) {
  console.log("doSomethingWith(" + v + ", " + params + ")");
}
function someCalculation(num) {
  console.log("in someCalculation, num is " + num);
  return num * num;
}

function someFunction(args) {
  var val = someCalculation(args);
  return(function(moreArgs) {
           doSomethingWith(val, moreArgs);
         });  
}
var f1 = someFunction(5);
console.log("The f1 function is " + f1);
var f2 = someFunction(7);
console.log("The f2 function is " + f2);

f1(10);  // Uses one copy of "val"
f2(10);  // Uses a different copy of "val"
