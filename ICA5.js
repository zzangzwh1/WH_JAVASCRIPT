// attach all event handlers to the onload event
window.onload = myOnload;
function myOnload() {
    // put in the event handling here
    document.myForm.redirect.onclick = changeLocation;
    document.myForm.back.onclick = previousPage;
    document.getElementById("btn_Agent").onclick = useragent;
    document.myForm.dims.onclick = showdimension;
    document.myForm.Prompt.addEventListener('click', Prompt);
    document.getElementById("btn_groovy").onclick = groovy;
    document.getElementById("btn_tablize").onclick = tablize;
    document.getElementById("range_row").oninput = rowvalchange;
    document.getElementById("range_column").oninput = colvalchange;
    footertext();
}
function changeLocation() {
    location = "https://www.google.ca/";
}
function previousPage() {
    history.back();
}
function useragent() {
    var elem = document.getElementById("btn_Agent");
    elem.innerText = navigator.userAgent;
}
function showdimension() {
    var elem = document.myForm;
    var width = window.innerWidth;
    var height = window.innerHeight;
    elem.textbox.value = "[ " + width + ", " + height + " ]";
}
function Prompt() {
    var str, previousprompt;
    console.log("this=", this);
    previousPrompt = this.innerHTML;
    str = prompt("Current Value" + "(" + previousPrompt + "), Enter a new number", "5");
    if (isNaN(str) == false) {
        this.innerHTML = str;
    }
}
function groovy() {
    var elem = document.getElementById("Body");
    elem.style.letterSpacing = '10px';
    elem.style.backgroundColor = 'pink';
}
function tablize() {
    var elem = document.getElementById("table");
    var rowVal = parseInt(document.getElementById('row_val').innerHTML);
    var colVal = parseInt(document.getElementById('col_val').innerHTML);
    var str = "";
    if (rowVal > 0 & colVal > 0) {
        str += '<table id="my_table">';
        for (let i = 0; i < rowVal + 1; i++) {
            str += '<tr>';
            for (let j = 0; j < colVal + 1; j++) {
                if (i == 0 & j == 0) {
                    str += '<td class="colored_td">';
                    str += 'X';
                    str += '</td>';
                }
                else if (i == 0 & j > 0) {
                    str += '<td class="colored_td">';
                    str += j;
                    str += '</td>';
                }
                else if (j == 0) {
                    str += '<td class="colored_td">';
                    str += i;
                    str += '</td>';
                }
                else {
                    str += '<td>';
                    str += i * j;
                    str += '</td>';
                }
            }
            str += '</tr>';
        }
        str += '</table>';
        elem.innerHTML = str;
    }
    else {
        str = '<p> Row & Column value must be greater than 0 <\p>';
        elem.innerHTML = str;
    }
}
function rowvalchange() {
    var val = document.getElementById('range_row').value;
    document.getElementById('row_val').innerHTML = val;
}
function colvalchange() {
    var val = document.getElementById('range_column').value;
    document.getElementById('col_val').innerHTML = val;
}
function footertext() {
    var elem = document.getElementById('Footer');
    elem.innerHTML = "<span>&copy; 2021 by</span> Youngjae Yoo<br> <span>Last Modified: " + document.lastModified + "</span>";
}