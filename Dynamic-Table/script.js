var number_of_cols = 10;
var number_of_cells = 5;

function printTable() {
    var table = document.getElementById('dTable');
    var row;
    for (var i = 0; i < number_of_cells; i++) {
        if (i % number_of_cols === 0)
            row = table.insertRow();
        var cell = row.insertCell();
        cell.innerText = i+1;
    }
}
printTable();