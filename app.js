function getHistory() {
    return document.getElementById("history-value").innerText;
}

function printHistory(num) {
    document.getElementById("history-value").innerText = num;
}

function getOutput() {
    return document.getElementById("output-value").innerText;
}

function printOutput(num) {
    if (num === "") {
        document.getElementById("output-value").innerText = num;
    } else {
        document.getElementById("output-value").innerText = getFormattedNumber(num);
    }
}

function getFormattedNumber(num) {
    if (num === "-") {
        return "";
    }
    var n = Number(num);
    var value = n.toLocaleString("en");
    return value;
}

function reverseNumberFormat(num) {
    return Number(num.replace(/,/g, ''));
}

var operator = document.getElementsByClassName("operator");
for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener('click', function () {
        if (this.id === "clear") {
            printHistory("");
            printOutput("");
        } else if (this.id === "backspace") {
            var output = reverseNumberFormat(getOutput()).toString();
            if (output) {
                output = output.substr(0, output.length - 1);
                printOutput(output);
            }
        } else if (this.id === "sqrt") {
            var output = getOutput();
            var result = Math.sqrt(parseFloat(output));
            printOutput(result);
        } else {
            var output = getOutput();
            var history = getHistory();
            if (output === "" && history !== "") {
                if (isNaN(history[history.length - 1])) {
                    history = history.substr(0, history.length - 1);
                }
            }
            if (output !== "" || history !== "") {
                output = output === "" ? output : reverseNumberFormat(output);
                history = history + output;
                if (this.id === "=") {
                    var result = calculateResult(history);
                    printOutput(result);
                    printHistory("");
                } else {
                    history = history + this.id;
                    printHistory(history);
                    printOutput("");
                }
            }
        }
    });
}

var number = document.getElementsByClassName("number");
for (var i = 0; i < number.length; i++) {
    number[i].addEventListener('click', function () {
        var output = reverseNumberFormat(getOutput());
        if (!isNaN(output)) {
            output = output + this.id;
            printOutput(output);
        }
    });
}

function calculateResult(expression) {
    var operands = expression.split(/\+|\-|\*|\//);
    var operators = expression.replace(/[^-+*\/]/g, '').split('');
    var result = parseFloat(operands[0]);
    
    for (var i = 0; i < operators.length; i++) {
        var nextOperand = parseFloat(operands[i + 1]);
        if (isNaN(nextOperand)) continue;
        if (operators[i] === '+') {
            result += nextOperand;
        } else if (operators[i] === '-') {
            result -= nextOperand;
        } else if (operators[i] === '*') {
            result *= nextOperand;
        } else if (operators[i] === '/') {
            result /= nextOperand;
        }
    }
    
    return result;
}

