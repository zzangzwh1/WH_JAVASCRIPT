var customers =[];
function Customer(name,brand,options){
    this.name = name;
    this.brand = brand;
    this.options = options;
    this.print = PrintMe;
}
function PrintMe(){
    let nameLine = "Name :"+this.name +"\n";
    let brandLine = "Brand :" +this.brand +"\n";
    let optionLine = "options"+ this.options +"\n";
    console.log(nameLine,brandLine,optionLine);
}

window.onload = function(){
    
   let table = document.createElement("table");

    for(var row =0; row<5; row++){
      let tr= document.createElement("tr"); 
      table.appendChild(tr);
      for(var col =0; col<10; col++){
          let td = document.createElement("td");
          let addText = document.createTextNode("Row : "+row+ " Col: "+col);
          td.id ="Row :"+row +" Col:"+col;
          td.appendChild(addText);
          tr.appendChild(td);
      }
    }


    var body = document.querySelector("body");
     body.appendChild(table);

     var btn = document.createElement("button");
     btn.type ="button";
     btn.id = "addTableBorder";
     btn.onclick = AddBorder;
     btn.appendChild(document.createTextNode("Add the Border"));
    document.querySelector("body").appendChild(btn);

    //label
    var inputText = document.createElement("label");
    var lblText =document.createTextNode("Hightlight Which row? ");

    var txtRow = document.createElement("input");
    txtRow.type = "text";
    txtRow.id ="rowNum";
    inputText.appendChild(lblText);
    document.querySelector("body").appendChild(inputText );
    document.querySelector("body").appendChild(txtRow);
  
    //var input = document.createElement("")
    //button
    var btnHightlight = document.createElement("button");
    btnHightlight.type ="button";
    btnHightlight.id = "addhightlightBtn";
   btnHightlight.onclick = HighlightBtn;
     btnHightlight.appendChild(document.createTextNode("HightLight Button"));
    document.querySelector("body").appendChild( btnHightlight);




    ///objects
    document.querySelector("#btnAdd").onclick = () =>{
        let tempContact;
        let options ="";
        document.querySelectorAll('[type=checkbox]:checked').forEach((x) =>{
            options += x.name +",";
        });
        tempContact = new Customer(
            document.car.custname.value,
            document.car.brand.value,
            options);
        customers.push(tempContact);
    };
    document.querySelector("#btnDisplay").onclick =() =>{
        customers.forEach((x) =>{
            x.print();
        });
    };


}
function AddBorder(){
    //table
    let tableBtn = document.querySelector("table");
    tableBtn.style.border ="3px solid red";

    //td all
    let tr = document.querySelectorAll("td");
    for(i=0; i<tr.length; i++){
        
        tr[i].style.border = "1px solid black";
    }
}
function HighlightBtn(){
    let rowNum = document.querySelector("#rowNum").value
    console.log("What is this in the HighlightRow function?:");
    console.log(this);
    console.log("What is this in the arrow function?:");

    //table high light
    let tableRows = document.querySelector("body").querySelectorAll("tr").forEach ((value,i) => {
        if(i ===Number(rowNum)){
            value.style.backgroundColor = "yellow";
        }    
        else{
            value.style.backgroundColor ="";
        }
        console.log(this);
    });
}

