var _console;
var container;

var gameNumber;
var iGoFirst;

var roundNumber;
var myNumber;

var allPssibilities;
var lastGuess;
var lastResult;

var userInputExpect;    //number    //result    //answer (yes or no)     //quit    //new (New Game)     //none

function winLoad() {
    _console = document.getElementById("console");
    container = document.getElementById("container");
    gameNumber = 1;
    iGoFirst = true;
    userInputExpect = "new";
    writeSpan("Type ", true, 0);
    writeSpan("'new'", true, 0, "springgreen");
    writeSpan(" when you are ready... to start new game.", true, 1);
    document.getElementById("textbox").focus();
}

function onKeyPressed(e) {
    if (e.keyCode == 13) {
        getUserInput();
    }
}

function newGame() {
    lastGuess = "";
    roundNumber = 1;
    writeSpan("", 1);
    writeSpan("--- Game " + gameNumber++ + " ---", true, 1, "skyblue");
    if (iGoFirst) {
        writeSpan("I'll go first. ", true, 2, "plum");
    }
    else {
        writeSpan("Your turn to start first. ", true, 2, "orange");
    }
    writeSpan("Round " + roundNumber + ":", true, 1, "black", "white");
    myNumber = generateRandomNumber();
    var index = 0;
    allPssibilities = [];
    for (var i = 1234; i < 9877; i++) {
        if (!checkNumber("" + i)) {
            allPssibilities[index] = "" + i;
            index++;
        }
    }

    if (iGoFirst) {
        writeSpan("I think you number is \"" + getGuessNumber(/*roundNumber*/) + "\"?", true, 1);
        userInputExpect = "result";
    } else {
        writeSpan("Guess what my number would be.", true, 1);
        userInputExpect = "number";
    }

    iGoFirst = !iGoFirst;
}

function generateRandomNumber() {
    var number = "";
    while (number.length < 4) {
        var digit = ("" + Math.random())[5]
        if ((digit != 0 && !number.includes(digit)))
            number += digit;
    }
    return number;
}

function writeSpan(text, letterOneByOne, linebBreakerCount, color, background) {
    if (text !== "") {
        var span = document.createElement("span");
        if (color !== undefined)
            span.style.color = color;
        if (background !== undefined)
            span.style.backgroundColor = background;
        _console.appendChild(span);
        if (letterOneByOne) {
            appendChar(span, text, 0, 20);
        } else {
            span.innerHTML = text;
        }
    }
    writeLineBreaker(linebBreakerCount);
    container.scrollTop = container.scrollHeight;
}

function appendChar(span, text, index, interval) {
    span.innerHTML += text[index++];
    if (index < text.length) {
        setTimeout(function () { appendChar(span, text, index, interval); }, interval);
    }
}

function writeLineBreaker(count) {
    for (var i = 0; i < count; i++) {
        linebBreaker = document.createElement("br");
        _console.appendChild(linebBreaker);
    }
}

function getUserInput() {
    var textbox = document.getElementById("textbox");
    var text = textbox.value;
    textbox.value = "";
    if (text === "") {
        writeSpan(" [empty] ", false, 1, "lightgray");
    } else {
        writeSpan(text, false, 1);
    }
    checkUserInput(text);
}

function checkUserInput(userInput) {
    if (userInputExpect !== "quit" && (userInput.toUpperCase() === "Q" || userInput.toUpperCase() === "QUIT")) {
        writeSpan("Game over", true, 0, "yellow", "gray");
        writeSpan(" , do you want to start again?", true, 1);
        userInputExpect = "quit";
    } else {
        switch (userInputExpect) {
            case "number":
                var isWrong = userInput.length != 4;
                isWrong = isWrong || (/\D/).test(userInput);
                isWrong = isWrong || parseInt(userInput) === NaN;
                isWrong = isWrong || checkNumber(userInput);
                if (!isWrong) {
                    var result = checkUserNumber(userInput);

                    writeSpan(result == "" ? "Actuialy you got no thing!" : result, true, 1);
                    if (result == "++++") {
                        writeSpan("Congratulations you won", true, 0, "lime");
                        writeSpan(". Do you want another game?", true, 1);
                        userInputExpect = "answer";
                    }
                    else {
                        if (!iGoFirst) {
                            roundNumber++;
                            writeSpan("Round " + roundNumber + ":", true, 1, "black", "white")
                        }
                        writeSpan("I think you number is \"" + getGuessNumber(/*roundNumber*/) + "\"?", true, 1);
                        userInputExpect = "result";
                    }
                }
                else {
                    writeSpan("Invalid input.", 0, true, "tomato");
                    writeSpan(" please enter a right 4 digits number!", true, 1);
                }
                break;
            case "result":
                var isWrong = userInput.length > 4;
                isWrong = isWrong || (/[^+>]/).test(userInput);
                if (!isWrong) {
                    var result = checkUserResult(userInput);
                    if (result) {
                        if (userInput == "++++") {
                            writeSpan("I won", true, 0, "lime");
                            writeSpan(", do you want to start again?", true, 1);
                            userInputExpect = "answer";
                        } else {
                            lastResult = userInput;
                            userInputExpect = "number";
                            if (iGoFirst) {
                                roundNumber++;
                                writeSpan("Round " + roundNumber + ":", true, 1, "black", "white");
                            }
                            writeSpan("Ok ", true, 0);
                            writeSpan("your turn", true, 0, "darkkhaki");
                            writeSpan(". type your guess.", true, 1);
                        }
                    } else {
                        writeSpan("Invalid input", true, 0, "tomato");
                        writeSpan(", you gave me confusing results! and because of that, ", true, 0);
                        writeSpan("I WON", true, 0, "lime");
                        writeSpan(".", true, 1);
                        writeSpan("Next time, please make sure that your results match your number.", true, 1);
                        writeSpan("Do you want to start again?", true, 1);
                        userInputExpect = "answer";;
                    }

                } else {
                    writeSpan("Invalid input.", true, 0, "tomato");
                    writeSpan(" please enter a right score for my guess!", true, 1);
                }
                break;
            case "quit":
            case "answer":
                if (userInput.toUpperCase() === "YES" || userInput.toUpperCase() === "Y")
                    newGame();
                else if (userInput.toUpperCase() === "NO" || userInput.toUpperCase() === "N") {
                    writeSpan("thank you for playing...", true, 1, "limegreen");
                    writeSpan("Goodbye 👋", true, 1, "skyblue");
                    userInputExpect = "none";
                } else {
                    writeSpan("Invalid input.", true, 0, "tomato");
                    writeSpan(" please answer the question, just type ", true, 0);
                    writeSpan("'yes'", true, 0, "lime");
                    writeSpan(" or ", true, 0);
                    writeSpan("'no'", true, 0, "tomato");
                    writeSpan("!", true, 1);
                }
                break;
            case "new":
                if (userInput.toUpperCase() !== "NEW")
                    writeSpan("I'll take this as 'new' 😉 so let's get started.", true, 1, "lightseagreen");
                newGame();
                break;
        }
    }
}

//return true if not accepted
function checkNumber(number) {
    var isWrong = false;
    isWrong = isWrong || number.includes("0");
    isWrong = isWrong || (/([1-9]).*?\1/).test(number)
    return isWrong;
}

function checkUserNumber(userInput) {
    return compareNumbers(myNumber, userInput);
}

function compareNumbers(number1, number2) {
    var result = "";
    if (number2.length == number1.length) {
        for (var i = 0; i < number1.length; i++) {
            if (number2[i] === number1[i])
                result += "+";
            else if (number1.includes(number2[i]))
                result += ">";
        }
        return result;
    }
    return "invalid";
}

function checkUserResult(userInput) {
    for (var i = allPssibilities.length - 1; i > -1; i--) {
        if (compareNumbers(allPssibilities[i], lastGuess) !== userInput) {
            allPssibilities.splice(i, 1);
        }
    }
    return allPssibilities.length > 0;
}

function getGuessNumber(/*round*/) {
    /*if (round == 2 && lastResult.length < 3) {
        var guess = "";
        for (var i = 1; i < 10; i++) {
            if (!lastGuess.includes(i)) {
                guess += i
                if (guess.length == 4) {
                    lastGuess = guess;
                    return lastGuess;
                }
            }
        }
    }
    else {*/
    var index = Math.floor(Math.random() * allPssibilities.length);
    lastGuess = allPssibilities[index];
    return lastGuess;
    //}
}

function containerClick() {
    document.getElementById("textbox").focus();
}