let display = document.querySelector("#screen");
let res = document.querySelector("#res");
let grid = document.querySelector("#grid");

grid.addEventListener("click", (event) => {
    let button = event.target;
    if (button.id == "grid") return;

    const operators = ["/", "*", "+", "-"];
    let displayText = display.textContent.trim();
    let lastChar = displayText[displayText.length - 1] || "";
    let secondLastChar =
        displayText.length > 1 ? displayText[displayText.length - 2] : "";

    if (button.id == "clear") {
        display.textContent = "";
        res.textContent = "";
    } else if (button.id == "delete") {
        display.textContent = displayText.slice(0, -1) || "";
    } else if (button.id == "eq") {
        try {
            res.textContent = `= ${eval(displayText)}`;
            display.textContent = eval(displayText);
        } catch (e) {
            res.textContent = "Malformed expression";
        }
    } else if (
        button.id == "div" ||
        button.id == "mul" ||
        button.id == "sub" ||
        button.id == "add"
    ) {
        const op = button.textContent.trim();
        if (displayText === "") {
            if (op === "-") {
                display.textContent += op;
            }
            return;
        }
        if (op === "*") {
            if (lastChar === "*") {
                if (secondLastChar === "*") {
                    return;
                } else {
                    display.textContent += "*";
                }
            } else if (operators.includes(lastChar)) {
                display.textContent = displayText.slice(0, -1) + "*";
            } else {
                display.textContent += "*";
            }
        } else {
            if (operators.includes(lastChar)) {
                display.textContent = displayText.slice(0, -1) + op;
            } else {
                display.textContent += op;
            }
        }
    } else {
        display.textContent += button.textContent.trim();
    }
    button.blur();
});

window.addEventListener("keydown", (event) => {
    const key = event.key;
    const displayText = display.textContent.trim();
    const operators = ["/", "*", "+", "-"];
    if (key >= "0" && key <= "9") {
        display.textContent += key;
    } else if (key === ".") {
        display.textContent += key;
    } else if (operators.includes(key)) {
        if (displayText === "") {
            if (key === "-") {
                display.textContent += key;
            }
            return;
        }
        const lastChar = displayText[displayText.length - 1];
        if (key === "*") {
            let starsCount = 0;
            for (let i = displayText.length - 1; i >= 0; i--) {
                if (displayText[i] === "*") starsCount++;
                else break;
            }

            if (starsCount < 2) {
                display.textContent += "*";
            }
        } else {
            if (operators.includes(lastChar)) {
                display.textContent = displayText.slice(0, -1) + key;
            } else {
                display.textContent += key;
            }
        }
    } else if (key === "Enter" || key === "=") {
        try {
            res.textContent = `= ${eval(display.textContent.trim())}`;
            display.textContent = eval(display.textContent.trim());
        } catch {
            res.textContent = "Malformed expression";
        }
    } else if (key === "Backspace") {
        display.textContent = displayText.slice(0, -1);
    } else if (key.toLowerCase() === "c") {
        display.textContent = "";
        res.textContent = "";
    }

    event.target.blur();
});
