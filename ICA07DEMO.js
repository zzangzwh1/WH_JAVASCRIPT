var nameArray = ["Fennec Fox","Cheetah","Whale","Goat","Camel"];
var myArray = [];
var currentPicIndex = 0;
var auto = false;
var timerID = 0;

var PicFrame = function(name,num){
    this.displayName = name;
    this.viewCount = 0;
    var pathname = "images/";
    var imagename = pathname + "pic_" + num + ".jpg"; 
    this.image = new Image();
    this.image.src = imagename;
}

window.onload=function(){
    fInit();
    showPic();
    footertext();
    document.getElementById("next_btn").onclick = FNext;
    document.getElementById("previous_btn").onclick = FPrev;
    document.getElementById("puase_play_btn").onclick = FAuto;
}
function fInit(){
    for(i=0;i<nameArray.length;i++){
        var picture = new PicFrame(nameArray[i],i+1);
        myArray.push(picture);
    }
}
function showPic(){
    var elem = document.getElementById("section_img");
    elem.setAttribute("src",myArray[currentPicIndex].image.src);

    myArray[currentPicIndex].viewCount = myArray[currentPicIndex].viewCount + 1;
    var count = myArray[currentPicIndex].viewCount;
    
    var elem2 = document.getElementById("lbl_Result");
    elem2.innerText = "Nmae: "+myArray[currentPicIndex].displayName + ", View count:" + count;
}
function FNext(){
    currentPicIndex = (currentPicIndex+1)%5;
    showPic();
}
function FPrev(){
    currentPicIndex = (((currentPicIndex-1)%5)+5)%5;
    showPic();
}
function FAuto(){
    if(auto == false)
    {
    auto = true;
    timerID = setInterval(FNext,500);
    }
    else
    {
    auto = false;
    clearInterval(timerID);
    }
}
function footertext() {
    var elem = document.getElementById("Footer");

    elem.innerHTML = "&copy; 2021 by wonhyuk<br> Last Modified: " + document.lastModified;

    elem.setAttribute("style","text-align:center;");
}