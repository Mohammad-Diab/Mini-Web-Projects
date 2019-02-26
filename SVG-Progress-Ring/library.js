var ProgressRingList = [];
var R = 45;

function ProgressRing(placeholderId, startAngle, precent, color, direction) {
    this.placeholderId = placeholderId;
    this.startAngle = startAngle;
    this.precent = precent;
    this.color = color;
    this.direction = direction;
    this.ChangeColor = changeColor;
    this.ChangePercent = changePercent;
    initialRing(placeholderId, startAngle, precent, color, direction);
    ProgressRingList.push(this);
    return this;
}

function changeColor(newColor) {

}

function changePercent(newValue) {

}

function initialRing(placeholderId, startAngle, precent, color, direction) {
    var placeholder = document.getElementById(placeholderId);
    var path = getSVGPath(startAngle, precent, direction);
    var ringHtml = '';
    ringHtml += '<svg direction="' + direction + '" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">';
    ringHtml += '<circle cx="50" cy="50" r="' + R + '" stroke-width="7" stroke="gray" fill="none"/>';
    ringHtml += '<circle cx="50" cy="50" r="' + (R - 10) + '" fill="gray"/>';
    ringHtml += '<path class="' + placeholderId + '-path" d="' + path + '" stroke="green" fill="transparent" stroke-width="7"/>';
    ringHtml += '<text class="' + placeholderId + '-text" text-anchor="middle" fill="white" font-size="28" x="50" y="58">' + getPercentText(precent, numericalDigit.westArabic) + '</text>';
    ringHtml += '</svg>';
    placeholder.innerHTML = ringHtml;
}

function polarToCartesianConvert(r, phi) {
    var x = 0,
        y = 0;
    if (typeof(r) != 'undefined' && (r || r === 0) && typeof(phi) != 'undefined' && (phi || phi === 0)) {
        x = r * Math.cos(phi);
        y = r * Math.sin(phi);
    }
    return { x, y };
}

function getSVGPath(startAngle, precent, direction) {
    debugger;
    var startX, startY, endX, endY;
    startAngle = (startAngle + 90) * Math.PI / 180;
    var temp = polarToCartesianConvert(R, startAngle);
    startX = 50 + temp.x;
    startY = 50 - temp.y;
    var endAngle = Math.PI / 2 + Math.PI * precent / 50; // 360 = 2 * Pi

    temp = polarToCartesianConvert(R, endAngle);
    endX = 50 + temp.x;
    endY = 50 - temp.y;
    var largeArc = (endAngle - startAngle) > Math.PI ? '1' : '0';
    var rotateDir = direction == enumDirection.rtl ? '1' : '0';
    return 'M' + startX + ' ' + startY + ' A ' + R + ' ' + R + ' 0 ' + largeArc + ' ' + rotateDir + ' ' + endX + ' ' + endY;
}

function getPercentText(precent, numericalDigit) {
    return Math.round(precent) + getPercentSign(numericalDigit);
}

function getPercentSign(numericalDigit) {
    return '%';
}

window.onload = function() {

}

var enumDirection = {
    rtl: 'rtl',
    ltr: 'ltr'
}

var numericalDigit = {
    westArabic: 48,
    eastArabic: 1632,
    assamese: 2534,
    devanagari: 2406,
    persian: 1776,
    gurmukhi: 2662,
    urdu: 1776,
    everydayChinese: 12295,
    formalChinese: 38646,
    suzhouChinese: 12321, //zero is not defied
    ethiopic: 4969, //zero is not defied
    gujarati: 2790,
    hieroglyphicEgyptian: 78842, //zero is not defied
    japanese: 19968,
    kannada: 3302,
    khmer: 6112,
    lao: 3792,
    mimbu: 6470,
    malayalam: 3430,
    mongolian: 6160,
    burmese: 4160,
    oriya: 2918,
    roman: 8544, //zero is not defied
    shan: 4240,
    sinhala: 70113, //zero is not defied
    tamil: 3046,
    telugu: 3174,
    thai: 3664,
    tibetan: 3872,
    newTaiLue: 6608,
    javanese: 43472
}