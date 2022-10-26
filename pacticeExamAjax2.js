let flights = [];
let wsUrl = 'http://api.aviationstack.com/v1/flights';
let access_key = '7dd965c19de13716f2ab619497053686'; // will only work for limited time...
//to make a call with this web service, it would look like this (for yeg and WestJet)
//http://api.aviationstack.com/v1/flights?access_key=7dd965c19de13716f2ab619497053686&dep_iata=yeg&airline_iata=WS

$(document).ready( () => {
    //clicking airline symbol populates airline textbox


    $('img').each( function (i,x) {
        $(x).click( function() {
            $("#airline").prop('value', $(x).prop('id'));
            //alert(this);
        });
    });

    // $("#yeg").click( ()=>{
    //     $("#departAirport").prop("value",$("#yeg").prop("id"));
    // });


    //Clicking airport section populates airport code From 
    $('.airport').each( function (i,section) {
        $(section).click (function() {
            //get the two city inputs
            let from = $("#departAirport");
            let city = $(section).prop('id');
            from.prop('value', city);
           
        });
    });

    //clicking the new flight button 
    $("button").click (() => {
        let from = $("#departAirport").prop('value');
        // let from  $("#departAirport").val();
        let airline = $("#airline").prop('value'); 
        let air_iata = $('#'+airline).prop('alt');
        //check for blanks
        if ((from === "") || (airline === ""))
        {
            alert("all selections required");
            return;
        }

        let getData = {};
        getData['access_key'] = '7dd965c19de13716f2ab619497053686';
        getData['dep_iata'] = from;
        getData['airline_iata'] = air_iata;

        //call AJAX to create new flight
        myAjax(wsUrl,getData,'GET','json',Success,jsonError);
    });

    //clicking on an input clears the input
    $("input").each( (i,x) => {
        $(x).click ( () => {
            $(x).prop('value',"");
        });
    });
});

function Success(responseData, responseStatus)
{
    
    console.log(responseData);
    //go through all the returned data and populate Flights
    //get info from responseData
    let flightCode, fromCode, fromCity, toCode, toCity, airline;
    let flightData = responseData['data'];
    for (let flightInfo in flightData)
    {
        flightCode = flightData[flightInfo]['flight']['iata'];
        console.log(flightCode);
        fromCode = flightData[flightInfo]['departure']['iata'];
        fromCity = flightData[flightInfo]['departure']['airport'];
        toCode = flightData[flightInfo]['arrival']['iata'];
        toCity = flightData[flightInfo]['arrival']['airport'];
        airline = flightData[flightInfo]['airline']['name'];
        let newFlight = new Flight(flightCode,fromCode,fromCity,toCode,toCity,airline);
        flights.push(newFlight);
        newFlight.DisplayMe();
    }

    //create Flight
    
}


function Flight (code, fromCode, fromCity, toCode, toCity, airline)
{
    this.FlightNumber = code;
    this.Airline = airline;
    this.DepartAirport = fromCode;
    this.DepartCity = fromCity;
    this.ArriveAirport = toCode;
    this.ArriveCity = toCity;

    this.DisplayMe = () => {
        let myTable = $('#'+this.DepartAirport.toLowerCase()+">figure>table");

        let newrow = document.createElement('tr');

        //flight number
        let newcol = document.createElement('td');
        let thetext = document.createTextNode(this.FlightNumber);
        newcol.appendChild(thetext);
        newrow.appendChild(newcol);

        //airline
        newcol = document.createElement('td');
        thetext = document.createTextNode(this.Airline);
        newcol.appendChild(thetext);
        newrow.appendChild(newcol);

        //destination
        newcol = document.createElement('td');
        thetext = document.createTextNode(this.ArriveCity + ' - ' + this.ArriveAirport.toUpperCase());
        newcol.appendChild(thetext);
        newrow.appendChild(newcol);

        myTable.append(newrow);

    };
}

function myAjax(url, data, type, datatype, success, fail)
{
// Retrieval Done.. populate our AJAX call
    // Ajax - minimum set of properties
    // url = where to send the request
    // type = GET|POST|PUT|DELETE // REST interface
    // data = what do we send ?? match the expected web service
    // dataType = what response are we expecting ? html/json/xml
    // success = callback for successful completion
    // error = callback for error in operation
    let sendData = {}; // object to send
    /*sendData['Name'] = name; // Your webservice will define required fields with NAMES
    sendData['Grades'] = arrData;*/
    //let url = 'https://opentdb.com/api.php?amount=10&category=22'; // where to send request
    let ajaxOptions = {};
    ajaxOptions['url'] = url;
    ajaxOptions['type'] = type; // Webservice will define what type to use !!
    ajaxOptions['dataType'] = datatype; // NOT html, like earlier demo
    ajaxOptions['data'] = data; // data to send
    ajaxOptions['success'] = success;
    ajaxOptions['error'] = fail;
    let ajaxReq = $.ajax( ajaxOptions ); // save request as needed, we don't need it..
}


// responseData will be in the form requested by dataType option : json !!! not html
function jsonSuccess( responseData, responseStatus )
{
    console.log( responseData );
    Dump( responseData );
    $('#divStatus').html('JSON Response : ' + responseStatus );
    let out = $('#divTarget'); // output div, as jQuery collection.. rather than first() to get the node
    /*out.append( 'Name : ' + responseData.Name + "</br>");
    out.append( 'Average : ' + responseData.Avg + "</br>"); // output specific fields
    // check that works to here...
    // Make a ordered list to show the array Grades
    let ol = document.createElement('ol'); // root node for list
    for( let i = 0; i < responseData.Grades.length; ++i ) // iterate ALL valid Grade elements
    {
        let li = document.createElement('li'); // make listitem ( li )
        // populate the li with the data, require a textnode to inject
        //li.appendChild( document.createTextNode( responseData.Grades[i] )); // option for access
        li.appendChild( document.createTextNode( responseData['Grades'][i] ));
        ol.appendChild( li ); // add listitem to the ordered-list
    }
    out.append( ol );*/
}

function jsonError( ajaxReq, textStatus, errorThrown )
{
    console.log( 'jsonError' + textStatus + " : " + errorThrown );
    // reset UI if necessary, alert user, other stuff...
}