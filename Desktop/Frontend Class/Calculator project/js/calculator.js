const display = document.getElementById('display');
function appendToDisplay(input) {
    display.value += input;
}
function calculate() {
try{
        const xy = display.value
        const result = eval(xy)
        display.value = eval(display.value);
} 
catch(error){
    display.value = 'Error';
}
}

function cleardisplay() {
    display.value = '';
}
function deleted() {
    display.value = display.value.toString().slice(0,-1);
}





// history = JSON.parse(localStorage.getItem('calHistory')) || [];
// history.push(xy + ' = ' + result);
 