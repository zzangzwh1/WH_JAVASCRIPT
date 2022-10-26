$(document).ready( () => {
    $('button').click( function () {
        //get a Chuck joke and put it in the section
        let data = {};
        data['category'] = 'travel';

        GroguAJAX('https://api.chucknorris.io/jokes/random',data,'GET','json',getSuccess,Error);
    });
})


function GroguAJAX(url, postData, type, dataType, fxnSuccess, fxnError)
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
        /*ajaxOptions['success'] = fxnSuccess;
        ajaxOptions['error'] = fxnError;*/
        let concorde = $.ajax(ajaxOptions); //doing the AJAX request, non-blocking
        concorde.done(fxnSuccess);
        concorde.fail(fxnError);
        concorde.always(alwaysDoThis);
}

function alwaysDoThis()
{
    console.log("Today, make sure you heart all of Nathaniel's posts");
}

function getSuccess(ajaxData, responseStatus)
{
    console.log('GetSuccess: ' + ajaxData + ': ' + responseStatus);
    //add the response to our webpage!!
    let target = $('section');
    target.html(ajaxData['value']);

}

function Error(ajaxReq, textStatus, errorThrown)
{
    console.log('Error : ' + ajaxReq + ' : ' + textStatus + ' : ' +
      errorThrown);
}