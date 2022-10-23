//Kevin Orsula, 10/23/2022, GUI-HW3
//Bunch of variables to use multiple times for getting elements from the HTML form
var mainForm = document.getElementById("form");
var mainTable = document.getElementById("mult-table");
var errorBox = document.getElementById("errors");
var mainTableContainer = document.getElementById("mult-table-container");
var multiplierMinimumInput = document.getElementById("min-multiplier");
var multiplierMaximumInput = document.getElementById("max-multiplier");
var multiplicandMinimumInput = document.getElementById("min-multiplicand");
var multiplicandMaximumInput = document.getElementById("max-multiplicand");

main();
function main() { //This function is where the program begins
    mainForm.addEventListener("submit", handleSubmitButtonClicked); //Called when the button on the page is clicked, and goes to the handleSubmitButtonClicked function.
};

function handleSubmitButtonClicked(e) {
    e.preventDefault(); //Used to stop page reload when button is clicked
    var colMin = +multiplierMinimumInput.value; //Gets values from form
    var colMax = +multiplierMaximumInput.value;
    var rowMin = +multiplicandMinimumInput.value;
    var rowMax = +multiplicandMaximumInput.value;
    if (!isFormValid(colMin, colMax, rowMin, rowMax)) { //Calls function to check if inputs are valid (ERROR HANDLING)
        return;
    }
    removeErrorIndicators();
    generateTable(colMin, colMax, rowMin, rowMax); //Generates the table
}
// ERROR Handeling
function handleInvalidValueError(element) { //Element is not a number
    element.style.border = "2px solid red";
    errorBox.innerHTML += "<p>Error: One of the input values is not an integer.</p><br>";
}
function handleInvalidRangeError(element1, element2) { //The two elements from either the rows or the cols provide a bad range
    element1.style.border = "2px solid red";
    element2.style.border = "2px solid red";
    errorBox.innerHTML += "<p>Error: Invalid range provided.</p><br>";
}
function handleOutOfRangeError(element) { //Element is greater or lower than the range of -50 to 50
    element.style.border = "2px solid red";
    errorBox.innerHTML += "<p>Error: Input values are not in the range (-50, 50).</p><br>";
}

//ERROR Checking for if value is number, if number is too large or small, and if range is correct
function isFormValid(min1, max1, min2, max2) {
    var isValid = true;
    removeErrorIndicators();
    if (Number.isNaN(min1)) { 
        handleInvalidValueError(multiplierMinimumInput);
        isValid = false;
    } else if (min1 < -50) {
        handleOutOfRangeError(multiplierMinimumInput);
        isValid = false;
    }
    if (Number.isNaN(max1)) {
        handleInvalidValueError(multiplierMaximumInput);
        isValid = false;
    } else if (max1 > 50) {
        handleOutOfRangeError(multiplierMaximumInput);
        isValid = false;
    }
    if (Number.isNaN(min2)) {
        handleInvalidValueError(multiplicandMinimumInput);
        isValid = false;
    } else if (min2 < -50) {
        handleOutOfRangeError(multiplicandMinimumInput);
        isValid = false;
    }
    if (Number.isNaN(max2)) {
        handleInvalidValueError(multiplicandMaximumInput);
        isValid = false;
    } else if (max2 > 50) {
        handleOutOfRangeError(multiplicandMaximumInput);
        isValid = false;
    }
    if (min1 >= max1) {
        handleInvalidRangeError(multiplierMinimumInput, multiplierMaximumInput);
        isValid = false;
    }
    if (min2 >= max2) {
        handleInvalidRangeError(multiplicandMinimumInput, multiplicandMaximumInput);
        isValid = false;
    }
    return isValid;
}
//Used to remove the red border error indicator after an incorect input has been fixed
function removeErrorIndicators() {
    //Remove all red borders and error messages from elements
    multiplicandMaximumInput.style.border = "";
    multiplierMinimumInput.style.border = "";
    multiplierMaximumInput.style.border = "";
    multiplicandMinimumInput.style.border = "";
    errorBox.innerHTML = "";
};
//Generates the table to the page
function generateTable(colMin, colMax, rowMin, rowMax) {
    var newHTML = '<tr><td></td>';
    for( var i = colMin; i <= colMax; i++) {
        var newMult = '<td>'+ i +'</td>';
        newHTML += newMult;
    }
    for( var y = rowMin; y <= rowMax; y++) {
        var newRow = '<tr>';
        newRow += '<td>'+ y +'</td>';
        for( var z = colMin; z <= colMax; z++) {
            newRow += '<td>'+ (y*z) +'</td>';
        }
        newRow += '</tr>';
        newHTML += newRow;
    }
    mainTable.innerHTML = newHTML;
}

