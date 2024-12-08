import GraphData, * as GRAPHDATA from "./GraphData.js"
import * as VIS_E from "./Vis_element.js"



// The main program start in here
// to prevent duplicate index
var element_index_count = 0;



var graphdata = new GraphData();
graphdata.testFunction();

VIS_E.testFunction();
// use number to decide the y value
// drawClickableCanvas(parent_frame, index, width, height, top, left, z, color, clickCallBack, callBackArgs)

var nameList = [
    "Name1",
    "Name2",
    "Name3",
    "Name4",
    "Name5",
    "Name6",
    "Name7",
    "Name8",
    "Name9",
    "Name10",
    "Name11"

];
var labelList = [
    "AAA",
    "BBB",
    "CCC",
    "DDD",
    "EEE",
    "FFF",
    "GGG",
    "HHH",
    "III",
    "JJJ",
    "KKK",
    "LLL",
    "MMM"
];
var numberList = [
    1,
    32,
    24,
    20,
    80,
    100,
    50,
    60,
    70,
    85,
    98,
    64,
    15,
    12,
    57
];
var monthList = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC"
];

//function drawBlock(parent_frame, labelList, title, width, height, z, currentIndex, clickCallBack, callBackArgs)
//normal_blocks

    var partWidth = 1200;
    var partHeight = 180;



// for(var i = 0; i < nameList.length; i++){

    
//     var out = VIS_E.drawBlock("mid_main_frame", labelList, "1/1/2020", partWidth, partHeight, 2, element_index_count, graphdata.testFunction, []);
//     element_index_count = out.index;
//     element_index_count = element_index_count + 1;
//     //console.log(element_index_count);
// }






function loadPage(){
    console.log("test reset");
}

var columnWidth = 80;
var rowHeight = 30;
var labelShift = 100;
var topShift = 200;

function showSelf(index){
    console.log(index);
}

function redirectVIEW(){

    // get the condition list and the selection list and write them to 

    $('#mid_all_frame').load("./layout.html");
}


VIS_E.drawClickableTextLabel("table_left_frame", "_view", 100, 0, 2, "VIEW", 15, 50, redirectVIEW, []);
//drawClickableTextLabel(parent_frame, index, top, left, z, text, textsize, width, clickCallBack, callBackArgs){

$.getJSON('/data_in_year.json', function(data) {
    
    var mail_data = [];
    mail_data = data;
    console.log(mail_data)

    var mail_name_list = [
    ] 

    var mail_label_list = [
    ]
    var mail_number_list ={}

    
    // draw selection table
    numberList = mail_data["01"];
    //console.log(numberList)
    for(var i = 0; i < Object.keys(numberList).length; i++){
        var number = Math.floor(30/Object.keys(numberList).length);
        VIS_E.drawClickableTextLabel("table_main_frame", i+65536, i*rowHeight+topShift, 0, 2, (i*number+1)+"~"+(i*number+number), 15, 50, graphdata.testFunction, [])
    }
    
    
    
    
    
    for(var i = 1; i<= 12; i++){
        var key = "";
        if(i < 10){
            key = "0"+i.toString();
        }
        else{
            key= i.toString();
        }

        //console.log( mail_data[key]);
        var new_numberList = []; 
        for(var iter = 0; iter < Object.keys(mail_data[key]).length; iter++){
            //console.log(mail_data[key][iter]);
            new_numberList.push(mail_data[key][iter]["number"]);
        }
        //console.log(new_numberList);
        
        // to modify the index shift to month number
        var table_index = i+1;
        var main_index = i;
        drawTableColmn("table_main_frame", new_numberList, main_index, 0, 4000, columnWidth, rowHeight, topShift, i*columnWidth+labelShift, [12, 134, 0], monthList[i], showSelf, [table_index]);
    }
    

});



function drawTableColmn(parent_frame, numberList, main_index, min, max, width, height, top, left, basicColor, label, clickCallBack, callBackArgs){
    localStorage.removeItem('MailVis_clickedList');
    var textsize = 15;
    VIS_E.drawClickableTextLabel(parent_frame, 0, top - textsize-5, left, 2, label, textsize, width, clickCallBack, callBackArgs);
    for(var i = 0; i < numberList.length; i++){
        var min = min;
        var max = max;
        var color = VIS_E.mapColorNumber(10, min, max, numberList[i], basicColor);
        VIS_E.drawClickableTextColorLabel(parent_frame, "_"+main_index+"_"+i, width, height, i*height+top, left, 2, numberList[i], 15, color, getIndexForTable, [main_index, i, color, numberList[i]]);        
    }

}

function getIndexForTable(x, y, color, text){
    console.log("canvasTextColor"+"_"+x+"_"+y);
    var clicked = JSON.parse(localStorage.getItem('MailVis_clickedList'));

    if(clicked == null){
        // nothing clicked
        clicked = {};
        localStorage.setItem('MailVis_clickedList', JSON.stringify(clicked));        
    }
    else{
        // previous something clicked
    }

    if(! (clicked.hasOwnProperty(x+"_"+y))){
        // not clicked, then reverse and refill the text
        clicked[x+"_"+y] = 1;
        localStorage.setItem('MailVis_clickedList', JSON.stringify(clicked));
        var new_color = VIS_E.reverseColorRGBA(color);
    }
    else{
        // clicked, back to original color

        delete clicked[x+"_"+y];
        localStorage.setItem('MailVis_clickedList', JSON.stringify(clicked));
        var new_color = color;

    }

    console.log(clicked);
    var canvas = document.getElementById("canvasTextColor"+"_"+x+"_"+y);
    var ctx = canvas.getContext('2d');
    
    // fill the entire canvas with black before drawing the circles

    //console.log(color);

    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = new_color;
    //console.log(color);
    //console.log(typeof(color));
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    var txt = text;
    ctx.fillText(txt, 10, 20);
    // get from local storage

}

//fold blocks
//function drawFoldBlock(parent_frame, labelList, barList, width, height, z, currentIndex, clickCallBack, callBackArgs)
//var out = VIS_E.drawFoldBlock("mid_main_frame", labelList, nameList, partWidth, partHeight, 2, element_index_count, graphdata.testFunction, []);

//VIS_E.mapColorNumber(10, 0, 100, 32, [255, 0, 0]);
//drawTableColmn(parent_frame, numberList, min, max, width, height, top, left, basicColor, label, clickCallBack, callBackArgs)

