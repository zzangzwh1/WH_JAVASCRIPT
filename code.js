$(document).ready( () => {
    
    //.css applies to ALL elements that match!
    //multiple CSS in one line!!
    $('button').css({'transform': 'scale(1,1)','background-color':'blue'});
    //single CSS in one line!!
    $('button').css('opacity','1.0');

    $('#btnGet').click( () => {
        //web service - we will call one repeats the data that you send it,
        //but formatted as a table

        //first create some data
        let Game = "minecraft";
        let Experience = Math.floor(Math.random() * 100);

        //create a data object
        let getData = {};
        getData['getGame'] = Game;
        getData['getExperience'] = Experience;

        for (item in getData)
            console.log(item + ': ' + getData[item]);

        //we created and logged data, so let's now call the webservice with AJAX!
        let url = '/~demo/cmpe2000/ica10_formtest.php';

        let ajaxOptions = {}; //init options object
        //AJAX! This the minimum set of properties to send
        //url - where to send the request
        //type - GET(select)/POST(update)/PUT(insert)/DELETE(delete) -> this is a REST interface
        //data - what data are we sending? MUST MATCH WEB SERVICE SPEC
        //dataType - what response do we want back from the WS? html/json/xml
        //success - callback for successful completion
        //error - callback for error in operation
        ajaxOptions['url'] = url;
        ajaxOptions['data'] = getData;
        ajaxOptions['dataType'] = 'html';
        ajaxOptions['success'] = getSuccess;
        ajaxOptions['error'] = Error;
        $.ajax(ajaxOptions); //doing the AJAX request, non-blocking

    });

    $('#btnPost').click( () => {
        let Name = 'Steven';
        let Scores = [];
        for (let index=0; index < 10; index++)
            Scores.push(index*index);
        
        //populate our ajaxData to send
        let postData = {};
        postData['postName'] = Name;
        postData['theScores'] = Scores;

        //we created and logged data, so let's now call the webservice with AJAX!
        let url = '/~demo/cmpe2000/ica10_formtest.php';
        GroguAJAX(url,postData,'POST','html',getSuccess,Error);
    

    });
});

function GroguAJAX(url,postData,type,dataType,fxnSuccess,fxnError)
{
    let ajaxOptions = {}; //init options object
        //AJAX! This the minimum set of properties to send
        //url - where to send the request
        //type - GET(select)/POST(update)/PUT(insert)/DELETE(delete) -> this is a REST interface
        //type DEFAULTS to GET
        //data - what data are we sending? MUST MATCH WEB SERVICE SPEC
        //dataType - what response do we want back from the WS? html/json/xml
        //success - callback for successful completion
        //error - callback for error in operation
        ajaxOptions['url'] = url;
        ajaxOptions['data'] = postData;
        ajaxOptions['type'] = type;
        ajaxOptions['dataType'] = dataType;

        // ajaxOptions['success'] = fxnSuccess;
        // ajaxOptions['error'] =fxnError;
        let concorde = $.ajax(ajaxOptions); //doing the AJAX request, non-blocking
        concorde.done(fxnSuccess);
        concorde.fail(fxnError);
        concorde.always(alwaysDoThis);
}
function alwaysDoThis(){
    console.log("today , make sure you heart all of posts!");
}

function getSuccess(ajaxData, responseStatus)
{
    console.log('GetSuccess: ' + ajaxData + ': ' + responseStatus);
    //add the response to our webpage!!
    let target = $('#divTarget');
    target.html(ajaxData);

}

function Error(ajaxReq, textStatus, errorThrown)
{
    console.log('Error : ' + ajaxReq + ' : ' + textStatus + ' : ' +
      errorThrown);
}