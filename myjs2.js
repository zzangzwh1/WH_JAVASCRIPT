window.onload = function () {
    //bind to the onclick for ColorMeRed
    document.getE("#ColorMeRed").onclick = function () {
       //do the coloring as desired
       //"this" is the object that caused the event
       this.style.backgroundColor = "red";
    };
    document.querySelector("#GreetMe").onclick = function () {
       alert('Hello ' + document.myForm.username.value);
      // alert('Hello ' + document.getElementsByName('username')[0].value);
    };
    document.querySelector("#MakePies").onclick = function () {
       var numPies = document.querySelector("#thenumberofpies").value;
       let text2add = "";
       //let declares a variable - variables are UNTYPED in JS
       //let vs var
       for (let i=0; i<numPies;i++)
       {
           let randnum = Math.floor((Math.random() * 4) + 1);
           text2add += "<img class='chart' height='200px' src='./images/pi" + randnum + ".jpg'>";
   
       }
       document.querySelector("#pies").innerHTML = text2add;
       //https://www.w3schools.com/js/exercise_js.asp?filename=exercise_js_dom_html3
    };
};