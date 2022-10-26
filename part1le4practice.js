let dbUrl = "https://opentdb.com/api.php?";
$(document).ready( function(){

    $("#butIntel").click( function (){
        $("#SmartDump").html("");
    
                let getData = {};
                getData['amount'] =10;
                getData['category'] = 28;
                getData['type'] = 'multiple';

                $.ajax({
                    url: dbUrl,
                    data: getData,
                    type: 'GET',
                    datatype : 'json',
                    success:  SuccessAjax,
                    fail : FailAjax });
        
    });

    $("#butPlay").click(function(){
        $("#Display").html("");
        let getData ={};
        getData['amount'] = $("#HowMany").prop('value');
        getData["category"] = 28;
        getData["type"] = "multiple";

        $.ajax({
            url: dbUrl,
            data: getData,
            type : 'GET',
            datatype: "json",
            success: PlaySuccess,
            fail : FailAjax
        });
  
    });
    
});
function PlaySuccess(ajaxData){
    console.log(ajaxData);
    let where = $("#Display");
    for(let info in ajaxData['results']){
        let qs = document.createElement('div');
        $(qs).append(document.createTextNode(ajaxData['results'][info]['question']) );

        let rd = document.createElement('input');
        rd.setAttribute("type","radio");
        rd.setAttribute("id","correct"+info)
       let lbl = document.createElement("label");
       lbl.setAttribute("for","correct"+info);
       $(rd).click(() =>{
        alert("correct!");
        
    });
    

       for(let w in ajaxData['results'][info]['incorrect_answers']){
           let rdWrong = document.createElement("input");
           rdWrong.setAttribute("type","radio");
           rdWrong.setAttribute("id","incorrect"+info+w);
           
           let lblWrong = document.createElement("label");
           lblWrong.setAttribute("for","incorrect"+info+w);
           $(lblWrong).append(document.createTextNode(ajaxData['results'][info]['incorrect_answers'][w]));
          $(lbl).append(document.createTextNode(ajaxData['results'][info]['correct_answer']));
           qs.append(rdWrong);
           qs.append(lblWrong);

           $(rdWrong).click(() =>{
               alert("incorrect!");
           });
        }
     
       qs.append(rd);
       qs.append(lbl);
        where.append(qs);
    }
}
function ForEachDan(where,ajaxData){

    let ul = document.createElement("ul");
    where.append(ul);
    for(let item in ajaxData){
        let li = document.createElement('li');
        let tn = document.createTextNode(item);
        li.appendChild(tn);
        ul.appendChild(li);        

        if(typeof(ajaxData[item]) == "object"){
            ForEachDan($(li),ajaxData[item]);
        }
        else{
                   console.log(ajaxData);
            let li2 = document.createElement('li');
            let tn2 = document.createTextNode(ajaxData[item]);
            li2.appendChild(tn2);
            li.appendChild(li2); 
           
        }
     

    }
}

function SuccessAjax(ajaxData){

    console.log(ajaxData);
    ForEachDan($("#SmartDump"),ajaxData);
 

}
function FailAjax(ajaxReq,textStatus,errorThrown)
{
    console.log("Error :" + ajaxReq + " : " + textStatus + " : " + errorThrown);
}

