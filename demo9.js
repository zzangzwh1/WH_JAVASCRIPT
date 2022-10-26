let preload;

//timer to make the airplane fly
let timerID = -1; //assume a negative timer value is not active



//array declarations
let arrN = null;  //create a null something
let arrE = [];  //create an empty array
let arr = ['Kalpan','David','Nathaniel','Samuel','Eric','Liu']; //declare and inialized elements

//js objects - use {} and property_identifier : property_value
let obj = {}; // empty objects
let objToBeCalled = {};
obj.favCity = 'Edmonton';
console.log(obj); // coolest things about the console.


//JSON format - standard obj format to transfer data around the internet 

let objB = {prop_name: 'Jason', Grade: 88, 'Max Score': 100}; //mixing quotes and not quotes
// because JS doesnt seem to care...
let objC = {'prop_name': 'Bourne',Grade: 99, 'Max Score: ': '100'}; //notice 100 is qutoes changes

// the data type in the JSON object
console.log(objB);
console.log(objC);

//how do you log properties directly to the console not the whole object
console.log("objC Grade = "+ objC.Grade );
console.log("objC% = " + Number(objC['Grade']/objC["Max Score: "] * 100).toFixed(2)+ '%');

/*************************** */


//this is an obj constructor 

function ClassName(name,grade)
{
    this.name = name;
    this.grade = grade;
    this.Max = 100;

    //can create Methods for the obj
    this.Show = function()
    {
        console.log(this.name);
        return this.name + ": " + this.grade;

    }
    
}

ClassName.prototype.UpBy = function(byHowMuch){
    if(isNaN(byHowMuch)) return;
    this.grade += Number(byHowMuch);
}

let student = new ClassName('Steven',78);
student.Show();
let student2 = new ClassName('Mike',51);
student2.UpBy(49);
let student2Info = student2.Show();


//combine array and obj together!
let classNames = [];

window.onload = function() {
    //add more students to the array
    arr.push('Sam');
    arr.push('Shane');
    arr.push('Terry');

    //iterate by itme using for of operation no index available
    //like c# foreach()
    for(let item of arr)
        console.log(item += "*"); // copies of items they are not actually altered
    
    for(let i =0; i<arr.length; i++)
    console.log('['+i+'] : ' +arr[i]);

    arr.forEach(function(item){
        console.log("forEach: " + item);
    });

    //tie img change to a button
    document.querySelector("#btnLoad").onclick = () =>{
        document.querySelector('#flyImage').src=  preload.src;
    };
    //how toe preload img

    preload = new Image();
    preload.src = "./images/macaron.jpg";

    //hook up the start 
    document.querySelector("#btnStart").onclick = fStart;
    document.querySelector("#btnStop").onclick = fStop;
};

function Move()
{
    // we will call this on every timer event

    let flyer = document.querySelector("#fly"); // this is the fly div
    let curLeft = flyer.offsetLeft;  // offsetLeft for the div
    curLeft += 5;
    if(curLeft > window.innerWidth) // is our airplane out of sight 
        curLeft = -Number(flyer.offsetWidth); // make the plane go just the left of the screen

        flyer.style.setProperty('left',curLeft +'px');

}

//timer needs a start and a stop!!

function fStart(){

    if(timerID >= 0) return; //already running
    //timer is not running
    timerID = window.setInterval(Move,1)        //setinterval how often  run move every 1ms

    //let combine array and object handling
    //arr of students name 
    // we want to create objects of for each students
    // for each 
    //let i = 
    // arr.forEach()
    let allStudent = []; //array to contain the objects that we create

    //create an objecdts for each student and put into all students array
    arr.forEach((name,i)=> {
       let x = new ClassName(name,99);
       allStudent.push(x);
        
    });
    //create the show() method for each of the students in classname that were created above
    allStudent.forEach((theObject) =>{
        theObject.Show();
    });
    console.log(allStudent);
    
    //add click evnet to btnX
    document.querySelector("#btnX").addEventListener("click",function(){
        // lets increase everyone grades first
        for(let i=0; i< classNames.length; i++){
           allStudent.UpBy(i);

        }
        statusUpdate(allStudent);
       // ClassName.UpBy()
        // show them 
    });
    
    //demo area for annoymous function vs arrow function

    //arrow operator this = window
    // document.querySelectorAll(".btn").forEach((b) =>{
    //     b.onclick = (ev) => {alert(this)};
    // });

    //annonymous function : this = object orinated the event
    document.querySelectorAll(".btn").forEach((b) =>{
            b.onclick = function(ev) {alert(this)};
     });
};

function fStop(){
    if(timerID >=0) window.clearInterval(timerID);
    
    timerID = -1;
}
function statusUpdate(arr)
{
    //pass in an array and this will create some html on the page to display to the screen
    //after this momonet no more hardcoding html in a string

    let status = document.querySelector("#status");
    status.innerHTML = ""; //clear contents
    let list = document.createElement("ul"); // create a new UL HTML element
    for(let item of arr){
        let li = document.createElement('li');
        li.classList.add("boldie"); // add class bolidie to the element we created
        // equilvalent <li class = "boldie">
        let tn = document.createTextNode(item.name + ": "+ Number(item.grade *100.0/item.Max).toFixed(2));

        //how to relate these create things together 
        li.append(tn); // append the text node to the list item
        list.append(li); // append toe the li to the ul
    }
    status.append(list); // append all the created html to the status div
}

