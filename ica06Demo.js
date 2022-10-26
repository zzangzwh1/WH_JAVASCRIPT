/* must wait for the person to come back from the store before
eating chocolate chips!!!
AKA: the HTML page must finish loading before you bind events */

window.onload= () => {
    document.myForm.NumUnits.onblur = UpdateCost;
    // add onclick event to all builing
   for(let i=0; i< document.myForm.Building.length; ++i){
       document.myForm.Building[i].onclick = UpdateCost;
   }
   document.myForm.onsubmit = Validate;

   let pic = document.querySelector("#iPic");
   pic.style.setProperty('position','relative');

   pic.style.setProperty('position','relative');
   pic.style.setProperty('left','50px');
   pic.myPicValue = 0;

   pic.onclick = () =>{
       let newLeft = pic.style.getPropertyValue('left');
       newLeft = parseInt(newLeft) +10;
       pic.style.setProperty('left',newLeft+'px');
       pic.myPicValue += newLeft;
       console.log(pic.myPicValue);
   }

};

// move the "code above" into a function called "UpdateCost"... done
//back at 2:15 :)
function UpdateCost()
{
    if (isNaN(document.myForm.NumUnits.value))
    {
        //document.myForm.NumUnits.style.backgroundColor = "red";
        document.myForm.NumUnits.style.setProperty("background-color","red");
        return;
    }
    //reset the background color to what it used to be
    //document.myForm.NumUnits.style.backgroundColor = "";
    document.myForm.NumUnits.style.setProperty("background-color","");

    // retrieve the radio button value to calculate cost from
    // error checking: has the user clicked a button, and is the value 
    // numeric... if not, return, and display a message in the #status
    // div
    let radioValue = document.myForm.Building.value;

    if (radioValue === "" || isNaN(radioValue))
    {
        /* NOTE == is VALUE compare only... 1 == '1' => TRUE
                === is VALUE and TYPE compare... 1 === '1' => FALSE (faster)
        */
        UpdateStatus("Please choose a building type");
        document.myForm.Cost.value = "0";
        return;
    }
    //get rid of the message 
    UpdateStatus("");


    let totalCost = parseFloat(radioValue) *Number(document.myForm.NumUnits.value);
    document.myForm.Cost.value = totalCost.toFixed(2);
    //perform calculation
    // let totalCost = parseFloat(radioValue) * Number(document.myForm.NumUnits.value);
    // document.myForm.Cost.value = totalCost.toFixed(2); // convert to 2 decimal text format
}

function UpdateStatus(msg)
{
    document.querySelector("#status").innerHTML = msg;
}
function Validate(){
    if( !UpdateCost()) 
    return false;
   
    if(!document.myForm.Tip.checked){
        UpdateStatus("NO-tip == NO service");
        return false;
    }

    if(document.myForm.Parking.value == "0"){
        UpdateStatus("No Street Parking Allowed");
        return false;
    }

    return true;

}
