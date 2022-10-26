$(function () {
    $("#getAll").on("click", function () {
        let myURL = '/~demo/cmpe2000/lab03_webservice.php';
        let getData = {};
        getData['tagId'] = 'all';
        $.ajax({
            url: myURL, type: 'POST', data: getData,
            dataType: 'json', success: ShowAllTags,
            error: ajaxFail
        });
    });
})
function ShowAllTags(responseData, status) {
    console.log(responseData);
}
function ajaxFail(ajaxReq,textStatus,errorThrown){

    console.log("Error :" + ajaxReq + " : " + textStatus + " : " + errorThrown);
}