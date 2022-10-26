// Global Variables
let Cells = []; //2 dimentional array contaning cell object
var Pics = new Array(3); // containing 3 arrays that contain image() object
var Master = []; // array of images
var Dim; //dimension size
window.onload = function () {
    LoadImages();
    document.getElementById("options").onchange = NewPuzzle;
    // document.getElementById("puzzle").onkeydown = KeyDown;
    document.onkeydown = KeyDown;
}
function Images(diffLevel, row, col) {
    var pathname = "images/";
    var url = pathname + diffLevel + "-" + row + "-" + col + ".png";
    this.pic = new Image();
    this.pic.src = url;
}
function LoadImages() {
    var diff = document.getElementsByTagName("option");
    // make arrays of different level puzzle images to Pics arrray
    for (var Index = 0; Index < Pics.length; Index++) {
        var picsarray = [];
        var DiffLevel = diff[Index].value;
        for (rowcount = 0; rowcount < DiffLevel; rowcount++) {
            for (colcount = 0; colcount < DiffLevel; colcount++) {
                var picture = new Images(DiffLevel, rowcount, colcount);
                picsarray.push(picture);
            }
        }
        Pics[Index] = picsarray;
    }
}
function NewPuzzle() {
    var images = document.getElementById("puzzle");
    // reset the elements of Cells array to input new puzzle imagespuzzle
    if (images.childElementCount > 1) {
        images.innerHTML = "";
        Cells.splice(0, Cells.length);
    }
    var diff = document.getElementById("options");
    Dim = diff.value;
    // create master array depending on the user's choice of the diff level
    for (i = 0; i < Pics.length; i++) {
        if ((Dim * Dim) == Pics[i].length)
            Master = Pics[i].slice(0, Pics[i].length); // pics[][] ?? master 랑 working array 쓸떄 Image property .pic.scr 않써짐...
    }
    var working = [];
    working = Master.slice(0, Master.length);
    var check = document.getElementById("show.original");
    // suffle the working array if show btn is not clicked
    if (check.checked == false)
        working = shuffle(working);
    // create cell objects and add them to the cells array
    for (i = 0; i < Dim; i++) {
        var rowarray = new Array();
        for (k = 0; k < Dim; k++) {
            var newcell = new Cell();
            newcell.CTOR(i, k, working[i * Dim + k].pic.src);
            rowarray.push(newcell);
        }
        Cells.push(rowarray);
    }
    if (check.checked == false)
    Cells[Dim - 1][Dim - 1].display = false;
    for (i = 0; i < Dim; i++) {
        for (k = 0; k < Dim; k++) {
            var myimage = document.createElement("img");
            images.appendChild(myimage);
            // myimage.setAttribute("src",Cells[i][k].url);
            myimage.setAttribute("id", "i" + i + "_" + k);
        }
    }
    images.setAttribute("style", "display:grid;");
    images.style.setProperty('grid-template-columns', `repeat(${Dim},auto)`);// use `, not ' when using variable value 
    images.style.setProperty('grid-template-rows', `repeat(${Dim},auto)`); 
    for (i = 0; i < Dim; i++) {
        for (k = 0; k < Dim; k++) {
            Cells[i][k].Bind();
        }
    }
    ShowGrid();
}
// Cell Pseudo Class
function Cell(row, col, url)//, display)
{
    this.row = row;
    this.col = col;
    this.url = url;
    this.display = true;
}
// Constructor method 
Cell.prototype.CTOR = function (row, col, url, display) {
    this.row = row;
    this.col = col;
    this.url = url;
    this.display = display;
}
// bind method
Cell.prototype.Bind = function () {
    var mycell = this;
    var mycellid = "i" + mycell.row + "_" + mycell.col; /////////////// this.url
    var elem = document.getElementById(mycellid);
    // add onlick events to the cells
    elem.onclick = function () {
        // find emptycell
        var emptycell = FindEmpty();
        // if user click not emptycell, swap the image
        if (mycell.display != false)//!= emptycell)
        {
            var mycellURL = mycell.url;
            var mycellDisplay = mycell.display;
            var emptycellURL = emptycell.url;
            var emptycellDisplay = emptycell.display;
            mycell.url = emptycellURL;
            mycell.display = emptycellDisplay;
            emptycell.url = mycellURL;
            emptycell.display = mycellDisplay;
            elem.setAttribute('src', '');
            var emptyid = "i" + emptycell.row + "_" + emptycell.col;
            var elem2 = document.getElementById(emptyid);
            elem2.setAttribute('src', emptycell.url);
        }
        ShowStatus();
    }
}
// keyboard usage
function KeyDown(e){
    // up: 38
    // left: 37
    // right: 39
    // down: 40
    var emptycell = FindEmpty();
    switch(e.keyCode){
        case 37 : // left
        if(emptycell.col > 0)
        {
            var leftcell = Cells[emptycell.row][emptycell.col-1];
            var leftcellid = "i" + leftcell.row + "_" + leftcell.col;
            var elem = document.getElementById(leftcellid);
            var leftcellURL = leftcell.url;
            var leftcellDisplay = leftcell.display;
            var emptycellURL = emptycell.url;
            var emptycellDisplay = emptycell.display;
            leftcell.url = emptycellURL;
            leftcell.display = emptycellDisplay;
            emptycell.url = leftcellURL;
            emptycell.display = leftcellDisplay;
            elem.setAttribute('src', '');
            var emptyid = "i" + emptycell.row + "_" + emptycell.col;
            var elem2 = document.getElementById(emptyid);
            elem2.setAttribute('src', emptycell.url);
            ShowGrid();
            ShowStatus();
        };
        break;
        case 39 : //right
        if(emptycell.col < Dim)
        {
            var leftcell = Cells[emptycell.row][emptycell.col+1];
            var leftcellid = "i" + leftcell.row + "_" + leftcell.col;
            var elem = document.getElementById(leftcellid);
            var leftcellURL = leftcell.url;
            var leftcellDisplay = leftcell.display;
            var emptycellURL = emptycell.url;
            var emptycellDisplay = emptycell.display;
            leftcell.url = emptycellURL;
            leftcell.display = emptycellDisplay;
            emptycell.url = leftcellURL;
            emptycell.display = leftcellDisplay;
            elem.setAttribute('src', '');
            var emptyid = "i" + emptycell.row + "_" + emptycell.col;
            var elem2 = document.getElementById(emptyid);
            elem2.setAttribute('src', emptycell.url);
            ShowGrid();
            ShowStatus();
        };
        break;
        case 38 : //up
        if(emptycell.row > 0)
        {
            var leftcell = Cells[emptycell.row-1][emptycell.col];
            var leftcellid = "i" + leftcell.row + "_" + leftcell.col;
            var elem = document.getElementById(leftcellid);
            var leftcellURL = leftcell.url;
            var leftcellDisplay = leftcell.display;
            var emptycellURL = emptycell.url;
            var emptycellDisplay = emptycell.display;
            leftcell.url = emptycellURL;
            leftcell.display = emptycellDisplay;
            emptycell.url = leftcellURL;
            emptycell.display = leftcellDisplay;
            elem.setAttribute('src', '');
            var emptyid = "i" + emptycell.row + "_" + emptycell.col;
            var elem2 = document.getElementById(emptyid);
            elem2.setAttribute('src', emptycell.url);
            ShowGrid();
            ShowStatus();
        };
        break;
        case 40 : //down
        if(emptycell.row < Dim)
        {
            var leftcell = Cells[emptycell.row+1][emptycell.col];
            var leftcellid = "i" + leftcell.row + "_" + leftcell.col;
            var elem = document.getElementById(leftcellid);
            var leftcellURL = leftcell.url;
            var leftcellDisplay = leftcell.display;
            var emptycellURL = emptycell.url;
            var emptycellDisplay = emptycell.display;
            leftcell.url = emptycellURL;
            leftcell.display = emptycellDisplay;
            emptycell.url = leftcellURL;
            emptycell.display = leftcellDisplay;
            elem.setAttribute('src', '');
            var emptyid = "i" + emptycell.row + "_" + emptycell.col;
            var elem2 = document.getElementById(emptyid);
            elem2.setAttribute('src', emptycell.url);
            ShowGrid();
            ShowStatus();
        };
        break;
    }
}
// helper method to find the empty cell
function FindEmpty() {
    var emptycell;
    for (i = 0; i < Cells.length; i++) {
        for (k = 0; k < Cells[i].length; k++) {
            if (Cells[i][k].display == false)
                emptycell = Cells[i][k];
        }
    }
    return emptycell;
}
Cell.prototype.show = function () {
    var mycell = this;
    var mycellid = "i" + mycell.row + "_" + mycell.col;
    elem = document.getElementById(mycellid);
    if (mycell.display == false) {
        elem.setAttribute('src', '');
    }
    else
        elem.setAttribute('src', mycell.url);
}
function ShowGrid() {
    for (i = 0; i < Dim; i++) {
        for (k = 0; k < Dim; k++) {
            Cells[i][k].show();
        }
    }
}
// Fisher - Yates algorithm function
// suffle the all elements in the array except last one
function shuffle(array) {
    var m = array.length - 1, t, i;
    // While there remain elements to shuffle…
    while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);
        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}
function ShowStatus() {
    var win = true;
    // if all puzzle's are matched with master imgs
    // set win to true
    for (i = 0; i < Dim; i++) {
        for (k = 0; k < Dim; k++) {
            if (Master[i * Dim + k].pic.src != Cells[i][k].url)
                win = false;
        }
    }
    // if all cell's are matched
    // show text 'you win' and display last cell
    if (win == true) {
        document.getElementById("display_nav").innerHTML = '<p> You Win!! </p>';
        var lastcell = document.getElementById('i' + `${Dim - 1}` + '_' + `${Dim - 1}`);
        lastcell.setAttribute('src', Master[Dim * Dim - 1].pic.src);
    }
}