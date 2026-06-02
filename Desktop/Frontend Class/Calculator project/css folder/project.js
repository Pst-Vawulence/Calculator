let history = JSON.parse(localStorage.getItem("calcHistory")) || [];

const display = document.getElementById("display");

function appendToDisplay(value) {
    display.value += value;
    display.scrollTop = display.scrollHeight;
}

function calculate() {
    try {
        let expr = display.value.replace(/%/g, "/100");
        let result = eval(expr);
        if (!isFinite(result)) throw new Error("Div by zero");
        history.push(`${display.value} = ${result}`);
        localStorage.setItem("calcHistory", JSON.stringify(history));
        display.value = result;
    } catch {
        display.value = "Error";
    }
}

function clearDisplay() {
    display.value = "";
}

function removeLast() {
    display.value = display.value.toString().slice(0, -1);
}

function showHistory() {
    const list = document.getElementById("historyList");
    if (history.length === 0) {
        list.innerHTML = "<div style='color:#64748B;'>No history yet</div>";
    } else {
        list.innerHTML = history.map(entry => `<div>${entry}</div>`).join("");
    }
    document.getElementById("historyModal").classList.add("show");
}

function closeHistory() {
    document.getElementById("historyModal").classList.remove("show");
}

function clearHistory() {
    history = [];
    localStorage.removeItem("calcHistory");
    closeHistory();
}

document.getElementById("historyModal").addEventListener("click", function (e) {
    if (e.target === this) closeHistory();
});

document.addEventListener("keydown", function (e) {
    const key = e.key;
    if (key >= "0" && key <= "9" || key === ".") {
        appendToDisplay(key);
    } else if (key === "+" || key === "-" || key === "*" || key === "/") {
        appendToDisplay(key);
    } else if (key === "%") {
        appendToDisplay("%");
    } else if (key === "Enter" || key === "=") {
        e.preventDefault();
        calculate();
    } else if (key === "Backspace") {
        removeLast();
    } else if (key === "Escape") {
        closeHistory();
        clearDisplay();
    } else if (key === "c" || key === "C") {
        clearDisplay();
    }
});
