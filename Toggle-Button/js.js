function Func() {
    var toggle = document.getElementById('toggle');
    var circle = document.getElementById("circle");
    if (circle.style.marginLeft == "0px")
        Move(circle, toggle, 0, 90, 2000);
    else
        Move(circle, toggle, 90, 0, 2000);
}

function Move(item1, item2, from, to, durution) {
    pos = from;
    var id = setInterval(frame, (durution / 450));

    function frame() {
        if (pos == to) {
            clearInterval(id);
        } else {

            if (from == 90) {
                var r = Math.round(34 + (-(pos - 90) / 2) * (245 - 34) / 45);
                var g = Math.round(139 + (-(pos - 90) / 2) * (245 - 139) / 45);
                var b = Math.round(34 + (-(pos - 90) / 2) * (245 - 34) / 45);
                pos -= 2;
            }
            else {
                var r = Math.round(34 + ((90 - pos) / 2) * (245 - 34) / 45);
                var g = Math.round(139 + ((90 - pos) / 2) * (245 - 139) / 45);
                var b = Math.round(34 + ((90 - pos) / 2) * (245 - 34) / 45);
                pos += 2;
            }

            item1.style.marginLeft = pos + 'px';
            item2.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
        }
    }
}
