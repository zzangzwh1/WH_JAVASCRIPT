$(document).ready(function(){
        let dbUrl = "https:opentdb.com/api.php?";

   // amount=10&category=28&type=multiple)

    $("#butIntel").click(function(){
        alert(1);
        let getData ={};
        getData['amount'] =10;
        getData['category'] =28;
        getData['type'] = multiple;
        $.ajax({
            url : dbUrl,
            data : getData,
            type : "GET",
            datatype: "json",
            success: PlaySuccess,
             fail : FailAjax
    });


    });

});
function ajaxSuccess(ajaxData){
    console.log(ajaxData);
    //$("#SmartDump")

}
function FailAjax(ajaxReq,textStatus,errorThrown)
{
    console.log("Error :" + ajaxReq + " : " + textStatus + " : " + errorThrown);
}
