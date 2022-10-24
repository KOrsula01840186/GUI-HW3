//Kevin Orsula, 10/23/2022, GUI-HW3
//Bunch of variables to use multiple times for getting elements from the HTML form
var multiplierMin = document.getElementById("min-multiplier");
var multiplierMax = document.getElementById("max-multiplier");
var multiplicandMin = document.getElementById("min-multiplicand");
var multiplicandMax = document.getElementById("max-multiplicand");
var inputForm = document.getElementById("form");
var multTable = document.getElementById("mult-table");
var errorText = document.getElementById("errors");

main();
function main() { //This function is where the program begins
    inputForm.addEventListener("submit", handleSubmitButtonClicked); //Called when the button on the page is clicked, and goes to the handleSubmitButtonClicked function.
};

function handleSubmitButtonClicked(e) {
    e.preventDefault(); //Used to stop page reload when button is clicked
    var colMin = +multiplierMin.value; //Gets values from form
    var colMax = +multiplierMax.value;
    var rowMin = +multiplicandMin.value;
    var rowMax = +multiplicandMax.value;
    if (!errorCheck(colMin, colMax, rowMin, rowMax)) { //Calls function to check if inputs are valid (ERROR HANDLING)
        return;
    }
    removeErrors(); //Removes the red outlines that occur on error
    generateTable(colMin, colMax, rowMin, rowMax); //Generates the table
}

//Generates the table to the page
function generateTable(colMin, colMax, rowMin, rowMax) {
    var newHTML = '<tr><td></td>'; //Sets a new table
    for( var i = colMin; i <= colMax; i++) { //Sets the top row
        var newMult = '<td>'+ i +'</td>';
        newHTML += newMult;
    }
    for( var y = rowMin; y <= rowMax; y++) { //Iterates through the table doing the math to fill it
        var newRow = '<tr>';
        newRow += '<td>'+ y +'</td>';
        for( var z = colMin; z <= colMax; z++) {
            newRow += '<td>'+ (y*z) +'</td>';
        }
        newRow += '</tr>';
        newHTML += newRow; //Adds a new row to the table
    }
    multTable.innerHTML = newHTML; //setst the table into the html 
}

// ERROR Handeling
function badValueError(element) { //Element is not a number
    element.style.border = "2px solid red";
    errorText.innerHTML += "<p>Error: One of the input values is not an integer.</p><br>";
}
function badRangeError(element1, element2) { //The two elements from either the rows or the cols provide a bad range
    element1.style.border = "2px solid red";
    element2.style.border = "2px solid red";
    errorText.innerHTML += "<p>Error: Invalid range provided. Min must be less than max.</p><br>";
}
function OutOfRangeError(element) { //Element is greater or lower than the range of -50 to 50
    element.style.border = "2px solid red";
    errorText.innerHTML += "<p>Error: Input values are not in the range (-50, 50).</p><br>";
}

//Used to remove the red border error indicator after an incorect input has been fixed
function removeErrors() {
    //Remove all red borders and error messages from elements
    multiplicandMax.style.border = "";
    multiplierMin.style.border = "";
    multiplierMax.style.border = "";
    multiplicandMin.style.border = "";
    errorText.innerHTML = "";
};

//ERROR Checking for if value is number, if number is too large or small, and if range is correct
function errorCheck(min1, max1, min2, max2) {
    var isValid = true;
    removeErrors();
    if (Number.isNaN(min1)) { 
        badValueError(multiplierMin);
        isValid = false;
    } else if (min1 < -50) {
        OutOfRangeError(multiplierMin);
        isValid = false;
    }
    if (Number.isNaN(max1)) {
        badValueError(multiplierMax);
        isValid = false;
    } else if (max1 > 50) {
        OutOfRangeError(multiplierMax);
        isValid = false;
    }
    if (Number.isNaN(min2)) {
        badValueError(multiplicandMin);
        isValid = false;
    } else if (min2 < -50) {
        OutOfRangeError(multiplicandMin);
        isValid = false;
    }
    if (Number.isNaN(max2)) {
        badValueError(multiplicandMax);
        isValid = false;
    } else if (max2 > 50) {
        OutOfRangeError(multiplicandMax);
        isValid = false;
    }
    if (min1 >= max1) {
        badRangeError(multiplierMin, multiplierMax);
        isValid = false;
    }
    if (min2 >= max2) {
        badRangeError(multiplicandMin, multiplicandMax);
        isValid = false;
    }
    return isValid;
}
