let dbUrl = "/~demo/cmpe2000/lab03_webservice.php";
var auto = false;
var timerID = 0;

$(document).ready( function(){
    
    $("#liveCheckbox").click(function(){
       
            if(auto == false){
                auto = true;
                timerID = setInterval(AutoLive,500);
            }
            else{
                auto = false;       
                 clearInterval(timerID);
            }
     
    });

    $("#getAll").click( function(){
        
        let postData ={};
        postData['tagId'] = 'all';
        
        $.ajax({url:dbUrl,
            data:postData,
            type:'POST', 
            dataType:'json',
            success: ShowAllTags, 
            error: ajaxFail});
            
        });
        $("#Tag").click( function(){
            
            let desc = $("#tagName").val();
            let min = $("#tag_min").val();
            let max = $("#tag_max").val();
            
            let postData ={};
            postData['action'] = 'add',
            postData['tagDesc'] =desc,
            postData['tagMin'] = min,
            postData['tagMax'] = max;
            
            
            
            $.ajax({url:dbUrl,
                data:postData,
                type:'POST', 
                dataType:'json',
                success: AddingTags, 
                error: ajaxFail});
                
            });
            
            $("#Live").click(function(){
               
                let inputs = $("#tag_desc").val();
                let postData ={};
                postData['action'] = 'live',
                postData['tagDescription'] =inputs;
                
                $.ajax({url:dbUrl,
                    data:postData,
                    type:'POST', 
                    dataType:'json',
                    success:   Tagdata, 
                    error: ajaxFail});
                  
                    });

            $("#Filter").click(function(){
                
                    let inputs = $("#tag_desc").val();
                    let postData ={};
                    postData['action'] = 'filter',
                    postData['tagDesc'] =inputs;
                    
                    $.ajax({url:dbUrl,
                        data:postData,
                        type:'POST', 
                        dataType:'json',
                        success: FilterData, 
                        error: ajaxFail});
                        
                    });

            $("#History").click(function(){
                
                    let inputs = $("#selectFilter").val();
                    let postData ={};
                    postData['action'] = 'historical',
                    postData['tagId'] =inputs;
                    
                    $.ajax({url:dbUrl,
                        data:postData,
                        type:'POST', 
                        dataType:'json',
                        success:  historicalData, 
                        error: ajaxFail});
                        
                    });
              
                });

   function AutoLive(){
    let inputs = $("#tag_desc").val();
                let postData ={};
                postData['action'] = 'live',
                postData['tagDescription'] =inputs;
                
                $.ajax({url:dbUrl,
                    data:postData,
                    type:'POST', 
                    dataType:'json',
                    success:   Tagdata, 
                    error: ajaxFail});
   }

function historicalData(ajaxData,status){
    console.log(ajaxData);
    // let inputText =$("#results");
    // inputText.html(ajaxData['status']);


    let target = $("#resultTable");
    $("#resultTable").html("");         

    let tr = document.createElement("tr");
    let th = document.createElement("th");
    let thn = document.createTextNode('Minimum');    
    let thn2 = document.createTextNode("Maxmum" );
    let thn4 = document.createTextNode(" Time-Stamp");
    let thn3 = document.createTextNode(" Value ");
    let thn5 = document.createTextNode(" Gauage");
    
    th.appendChild(thn);
    tr.appendChild(th);

    th = document.createElement("th");
    th.appendChild(thn2);
    tr.appendChild(th);

    th = document.createElement("th");
    th.appendChild(thn3);
    tr.appendChild(th);

    th = document.createElement("th");
    th.appendChild(thn4);
    tr.appendChild(th);

    th = document.createElement("th");
    th.appendChild(thn5);
    tr.appendChild(th);

    target.append(tr);
    
for(let i= 0; i< ajaxData.data.length; i++){
    let tr1 = document.createElement("tr");
    let td = document.createElement("td");
    let tdn =document.createTextNode(ajaxData.data[0]['tagMin']);
    
    td.append(tdn);
    tr1.append(td);
    target.append(tr1);
    
    
    //target.append(trMeter);   
    
    
    for(let info in ajaxData.data[i])
    { 

    if(info == 'tagMax')
     {
        let tdMin = document.createElement("td");
        let tnMin = document.createTextNode(ajaxData.data[i]['tagMax']);
        tdMin.appendChild(tnMin);
        tr1.appendChild( tdMin);
        target.append(tr1);   
        
    }
    if(info =='value')
    {
        let tdMax = document.createElement("td")
        let tnMax = document.createTextNode(ajaxData.data[i]['value']);
        tdMax.appendChild(tnMax);
        tr1.appendChild(tdMax);
        target.append(tr1);   
    }
    if(info == "timeStamp"){
        let tdMax3 = document.createElement("td")
        let tnMax3 = document.createTextNode(ajaxData.data[i]['timeStamp']);
        tdMax3.appendChild(tnMax3);
        tr1.appendChild(tdMax3);
        target.append(tr1); 
    
        let trMeter = document.createElement("tr");
        let tdMeter = document.createElement("td");
  
        trMeter.append(tdMeter);
        tr1.append(trMeter);

    
        let tdMax2 = document.createElement("meter")
          tdMax2.setAttribute("id","meter_id")
          tdMax2.setAttribute("min",ajaxData.data[i]['tagMin']);
          tdMax2.setAttribute("max",ajaxData.data[i]['tagMax']);
          tdMax2.setAttribute("value",ajaxData.data[i]['value']);

        let tnMax2 = document.createTextNode(ajaxData.data[i]['meter']);
        tdMax2.append(tnMax2);
        trMeter.append(tdMax2);
    }
  

    
    console.log(ajaxData.data[i][info]);}
  
}
}

     function FilterData(ajaxData)
     {
        console.log(ajaxData);
        // let inputText =$("#results");
        // inputText.html(ajaxData['status']);
        let inputText = $("#results2");
        inputText.html(ajaxData['status']);


        let target = $("#selectFilter")
        //tdMax2.setAttribute("id","meter_id")
        for(let i= 0; i< ajaxData.data.length; i++){
                var options = document.createElement("option");
              //  options.setAttribute()
             options.setAttribute("value",ajaxData.data[i]['tagId'])
                let optionText = document.createTextNode(ajaxData.data[i]['tagDescription']);
              // options.setAttribute("text",)
                options.append(optionText);
                target.append(options);
            
        }
    
    }
 
function Tagdata(ajaxData){
    console.log(ajaxData);
    let inputText = $("#results2");
    inputText.html(ajaxData['status']);
    let target = $("#resultTable");
        $("#resultTable").html("");         
   
        let tr = document.createElement("tr");
        let th = document.createElement("th");
        let thn = document.createTextNode('ID');    
        let thn2 = document.createTextNode("Tag Description" );
        let thn3 = document.createTextNode("  Minimum  ");
        let thn4 = document.createTextNode("  Maximum");
        let thn5 = document.createTextNode("  Gauage");
        
        th.appendChild(thn);
        tr.appendChild(th);

        th = document.createElement("th");
        th.appendChild(thn2);
        tr.appendChild(th);

        th = document.createElement("th");
        th.appendChild(thn3);
        tr.appendChild(th);

        th = document.createElement("th");
        th.appendChild(thn4);
        tr.appendChild(th);

        th = document.createElement("th");
        th.appendChild(thn5);
        tr.appendChild(th);

        target.append(tr);
        
for(let i= 0; i< ajaxData.data.length; i++){
        let tr1 = document.createElement("tr");
        let td = document.createElement("td");
        let tdn =document.createTextNode(i);
        
        td.append(tdn);
        tr1.append(td);
        target.append(tr1);
        
        
        //target.append(trMeter);   

        
    for(let info in ajaxData.data[i])
    {
        if(info == 'tagDescription')
           { 
            let trMIN = document.createElement("tr");           
             let td3 = document.createElement("td");             
             let tdn3 = document.createTextNode(ajaxData.data[i]['tagDescription']);
            td3.appendChild(tdn3);
            tr1.appendChild(td3);
        }
  
        if(info == 'tagMin')
         {
            let tdMin = document.createElement("td");
            let tnMin = document.createTextNode(ajaxData.data[i]['tagMin']);
            tdMin.appendChild(tnMin);
            tr1.appendChild( tdMin);
            target.append(tr1);   
            
        }
        if(info =='tagMax')
        {
            let tdMax = document.createElement("td")
            let tnMax = document.createTextNode(ajaxData.data[i]['tagMax']);
            tdMax.appendChild(tnMax);
            tr1.appendChild(tdMax);
            target.append(tr1);   

            let trMeter = document.createElement("tr");
            let tdMeter = document.createElement("td");
      
            trMeter.append(tdMeter);
            tr1.append(trMeter);

        
            let tdMax2 = document.createElement("meter")
              tdMax2.setAttribute("id","meter_id")
              tdMax2.setAttribute("min",ajaxData.data[i]['tagMin']);
              tdMax2.setAttribute("max",ajaxData.data[i]['tagMax']);
              tdMax2.setAttribute("value",ajaxData.data[i]['value']);

            let tnMax2 = document.createTextNode(ajaxData.data[i]['meter']);
            tdMax2.append(tnMax2);
            trMeter.append(tdMax2);
        }
      
  
        
        console.log(ajaxData.data[i][info]);}
      
    }
}
         
 function AddingTags(ajaxData){
     console.log(ajaxData);
    let inputText = $("#results2");
    inputText.html(ajaxData['status']);
        $("#resultTable").html("");         
             let target = $("#resultTable");
    
   
        let tr = document.createElement("tr");
        let th = document.createElement("th");
        let thn = document.createTextNode('ID');    
        let thn2 = document.createTextNode("Tag Description" );
        let thn3 = document.createTextNode("  Minimum  ");
        let thn4 = document.createTextNode("  Maximum");
        
        th.appendChild(thn);
        tr.appendChild(th);

        th = document.createElement("th");
        th.appendChild(thn2);
        tr.appendChild(th);

        th = document.createElement("th");
        th.appendChild(thn3);
        tr.appendChild(th);

        th = document.createElement("th");
        th.appendChild(thn4);
        tr.appendChild(th);

        target.append(tr);
        
for(let i= 0; i< ajaxData.data.length; i++){
        let tr1 = document.createElement("tr");
        let td = document.createElement("td");
        let tdn =document.createTextNode(i);
        
        td.appendChild(tdn);
        tr1.appendChild(td);
        target.append(tr1);
        

    for(let info in ajaxData.data[i])
    {
        if(info == 'tagDescription')
           { 
            let trMIN = document.createElement("tr");           
             let td3 = document.createElement("td");             
             let tdn3 = document.createTextNode(ajaxData.data[i]['tagDescription']);
            td3.appendChild(tdn3);
            tr1.appendChild(td3);
        }
  
        if(info == 'tagMin')
         {
            let tdMin = document.createElement("td");
            let tdMin2 = document.createElement("input");
             tdMin2.setAttribute("type","range")
            // tdMin2.setAttribute("value",ajaxData.data[i]['tagMin']);

           // let tnMin = document.createTextNode(ajaxData.data[i]['tagMin']);
            tdMin.appendChild(tnMin2);
            tr1.appendChild( tdMin);
            target.append(tr1);   
            
        }
        if(info =='tagMax')
        {
            let tdMax = document.createElement("td")
            let tnMax = document.createTextNode(ajaxData.data[i]['tagMax']);
            tdMax.appendChild(tnMax);
            tr1.appendChild(tdMax);
            target.append(tr1);   
        }
        console.log(ajaxData.data[i][info]);}
      
    }
}

function ShowAllTags(ajaxData, status){
    console.log(ajaxData );
     let inputText = $("#results2");
     inputText.html(ajaxData['status']);

    $("#resultTable").html("");    
    // console.log("success :" + ajaxData );
    console.log(ajaxData.data[0]['tagId']);
    let target = $("#resultTable");
    // for(let item in ajaxData.data){

        let tr = document.createElement("tr");
        let th = document.createElement("th");
        let thn = document.createTextNode('ID');    
        let thn2 = document.createTextNode("Tag Descriptio" );
        let thn3 = document.createTextNode("  Minimum  ");
        let thn4 = document.createTextNode("  Maximum");
        
        th.appendChild(thn);
        tr.appendChild(th);

        th = document.createElement("th");
        th.appendChild(thn2);
        tr.appendChild(th);

        th = document.createElement("th");
        th.appendChild(thn3);
        tr.appendChild(th);

        th = document.createElement("th");
        th.appendChild(thn4);
        tr.appendChild(th);

        target.append(tr);
        
for(let i= 0; i< ajaxData.data.length; i++){
        let tr1 = document.createElement("tr");
        let td = document.createElement("td");
        let tdn =document.createTextNode(i);
        
        td.appendChild(tdn);
        tr1.appendChild(td);
        target.append(tr1);
        

    for(let info in ajaxData.data[i])
    {
        if(info == 'tagDescription')
           { 
            let trMIN = document.createElement("tr");           
             let td3 = document.createElement("td");             
             let tdn3 = document.createTextNode(ajaxData.data[i]['tagDescription']);
            td3.appendChild(tdn3);
            tr1.appendChild(td3);
        }
  
        if(info == 'tagMin')
         {
            let tdMin = document.createElement("td")
            let tnMin = document.createTextNode(ajaxData.data[i]['tagMin']);
            tdMin.appendChild(tnMin);
            tr1.appendChild( tdMin);
            target.append(tr1);   
            
        }
        if(info =='tagMax')
        {
            let tdMax = document.createElement("td")
            let tnMax = document.createTextNode(ajaxData.data[i]['tagMax']);
            tdMax.appendChild(tnMax);
            tr1.appendChild(tdMax);
            target.append(tr1);   
        }
        console.log(ajaxData.data[i][info]);}
      
    }
}
function ajaxFail(ajaxReq,textStatus,errorThrown){

    console.log("Error :" + ajaxReq + " : " + textStatus + " : " + errorThrown);
}