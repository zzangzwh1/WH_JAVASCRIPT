window.onload = MyOnLoad;

function MyOnLoad()
{
    //bind to the onclick for ColorMeRed
    document.querySelector("#ColorMeRed").onclick = ColorRedClick;
    document.querySelector("#GreetMe").onclick = greet;
    document.querySelector("#MakePies").onclick = MakePies;
}

function ColorRedClick()
{
    this.style.backgroundColor = "yellow";
    //do the coloring as desired
    //"this" is the object that caused the event
   // this.style.backgroundColor = "red";
}
function greet(){
    alert('hello ' + document.myForm.username.value);
  
}
function MakePies(){
    let numPies = document.querySelector("#thenumberofpies").value;
    let text2add = "";
    //let declares a variable - variables are untypesd in js
    //let vs var 
    for(let i=0; i<numPies; i++){

        let randNum = Math.floor((Math.random *4) +1);
     text2add += "<img class='chart' src='./images/demo" + randNum + ".jpg'>"; 
    }
    document.querySelector("#pies").innerHTML =text2add;
 
}