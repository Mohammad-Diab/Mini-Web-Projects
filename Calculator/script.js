var reset = false;
function trackMouse(e, btn) {
    var x = e.pageX - btn.offsetLeft
    var y = e.pageY - btn.offsetTop
    btn.style.setProperty('--x', x + 'px')
    btn.style.setProperty('--y', y + 'px')
}

function inputNumber(input) {
    result = document.getElementById("result");
    reset = reset & !" + - * / ( ) ".includes(input);
    reset = reset | (result.value=="NaN"||result.value=="error")
    result.value = reset ? input : result.value + input;
    reset = false;
}

function clearText() {
    result = document.getElementById("result");
    result.value = "";
    reset = false;
}

function findResult() {
    reset = true;
    result = document.getElementById("result");
    var tmp = "";
    try {
        tmp = eval(result.value);
    } catch (e) {
        tmp = "error";
    }
    result.value = tmp;
}