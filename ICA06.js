window.onload =() =>{
    document.myForm.B_Select.onchange = UpdateBrand;
   
    for(let i =0; i< document.myForm.Model.length; ++i){
        document.myForm.Model[i].onclick =  UpdateModel;
     
    }
 
    var elem = document.querySelector("#section_option");
    var chk = elem.getElementsByTagName('input');

    for(var i = 0; i <chk.length; i++){
        if(chk[i].type === 'checkbox'){
  
            chk[i].onclick =UpdateModel;
       
        }
    }
    document.myForm.downPayment.onchange = UpdateModel;
 
    document.myForm.onsubmit = Validate;

    function UpdateBrand(){
        var selectValue = document.myForm.B_Select.value;
        if(selectValue == ""){
           UpdateStatus("Brand is not selected");
           return;
    
        }
        else{
            UpdateStatus("Model is not selected");
            return;
        }
  
    
    }
    function UpdateModel(){
    
      var brandResult = document.myForm.B_Select.value;
      var radioResult = document.myForm.Model.value ;

    //   "brake" name="checkBox" value="200" ><label for="brake">Automatic Braking System</label> <br>
    //             <input type="checkbox" id="control" name="checkBox" value="300" ><label for="control">Traction Control System</label><br>
    //             <input type="checkbox" id="flight" 
        if(radioResult <10000){
             document.querySelector("#control").checked = false;
             document.querySelector("#flight").checked = false;
             document.querySelector("#brake").checked = false;
        }
        let cnt = 0;
        var abs = document.querySelector("#brake");
         var control = document.querySelector("#control");
         var flight = document.querySelector("#flight");
         let totalCost =parseFloat(radioResult); 
         let optionCost = 0;
         var payment =  document.querySelector("#payment");
    
      UpdateStatus("");
      if( brandResult == "Honda" && radioResult == "5000" )
         {    
          document.querySelector('#imgResult').src = "./images/JapaneseScooter.jpg";
     
       }
        if( brandResult == "Honda" && radioResult == "10000"){
             document.querySelector('#imgResult').src = "./images/JapaneseNaked.jpg";     
       }
       if( brandResult == "Honda" && radioResult == "15000")
        {
            document.querySelector('#imgResult').src = "./images/JapaneseSport.jpg";
         
        }
        if( brandResult == "Ducati" && radioResult == "5000"){
            document.querySelector('#imgResult').src = "./images/EuroNaked.jpg";
       
        }
        if(brandResult == "Ducati" && radioResult == "10000"){
            document.querySelector('#imgResult').src = "./images/EuroScooter.jpg";
        
        }
        if(brandResult == "Ducati" && radioResult == "15000"){
            document.querySelector('#imgResult').src = "./images/EuroSport.jpg";
          
        }
        if(brandResult == "Harley" && radioResult == "5000"){
            document.querySelector('#imgResult').src = "./images/AmericanScooter.jpg";
        
        }
        if(brandResult == "Harley" && radioResult == "10000"){
            document.querySelector('#imgResult').src = "./images/AmericanNaked.jpg";
          
        }
        if(brandResult == "Harley" && radioResult == "15000"){
            document.querySelector('#imgResult').src = "./images/AmericanSport.jpg";
       
        }
        if(brandResult == "" || radioResult == ""){
            document.querySelector('#imgResult').src = "./images/empty_Motor.jpg";
             
        }
        var resultValue =  parseFloat(payment.value);

        if(isNaN( resultValue))
        resultValue = "0";
        
        if(abs.checked){
            ++cnt;         
            var absValue = " $ "+abs.value;     
            totalCost += parseFloat(abs.value)
            optionCost +=  parseFloat(abs.value);
        }
        if(!abs.checked)
         absValue = " $ 0. 00 ";  
        if(control.checked){
            ++cnt;
            optionCost +=parseFloat(control.value);
            totalCost+= parseFloat(control.value);
            var controlValue = " $ "+control.value;  
        }
        if(!control.checked){
            controlValue = " $ 0. 00 ";  
        }
        if(flight.checked){
            ++cnt;
            var flightValue = " $ "+flight.value;  
            optionCost +=parseFloat(flight.value);
            totalCost +=parseFloat(flight.value);
        }
        if(!flight.checked){
            flightValue =" $ 0. 00 ";
        }
        totalCost -= resultValue;
        let minDownPayment =0;
        minDownPayment = (parseFloat(radioResult)+parseFloat(optionCost))/2;
        if(minDownPayment > resultValue){
           MinValueStatus("--MIN "+minDownPayment);
        }
        if(minDownPayment < resultValue){
            MinValueStatus("");
        }
        
        UpdateStatus("Selection: "+brandResult +":" +" $"+ radioResult+ ".00" + " :"+cnt+ " Options Selected "+ "<br>"
            +" $ "+radioResult+ ".00" + " + $ "+ optionCost+ ".00" +" - "+  " $ " +resultValue + ".00" + "   = " +"   $ " + totalCost+ ".00");    


        }
        return(totalCost);
}

function UpdateStatus(msg){
    document.querySelector('#textValue').innerHTML = msg;
}
function MinValueStatus(msg){
    document.querySelector('#textValue2').innerHTML = msg;
}

function Validate(){
    var selectValue = document.myForm.B_Select.value;    
     var optionValue =document.myForm.checkBox.value;
    var radioResult = document.myForm.Model.value ;
    var payment =  parseInt(document.querySelector("#payment").value);
  
    if(selectValue == ""){  
       return false;
    }
    else if(radioResult ==""){
        return false;
    }

    else{       
        return true;
    }


 
}