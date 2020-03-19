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

$.getJSON('/data/data_with_attritube_rank_04_12_2001.json', function(data) {
    
    var mail_data = [];
    mail_data = data;
    console.log(mail_data)

    var mail_name_list = [
        "04_2001",
        "05_2001",
        "06_2001",
        "10_2001",
        "11_2001",
        "12_2001"
    ] 

    var mail_label_list = [
    ]
    var mail_number_list ={}


    for(var i = 0; i< mail_name_list.length; i++){
        // collect labels
        for (var item in mail_data[i]) {
            if(mail_label_list.includes(item)){
                //mail_number_list[item] = mail_number_list[item] + mail_data[i][item];

            }
            else{
                mail_label_list.push(item);
                //mail_number_list[item] = mail_data[i][item];
            }

        }
        
    }

    console.log(mail_label_list);
    for(var i = 0; i< mail_name_list.length; i++){
        // create list for each set
        //console.log(mail_data[i])
        var new_list = [];
        for (var item in mail_label_list) {
            //console.log(item);
            if(mail_label_list[item] in mail_data[i]){

                new_list.push(mail_data[i][mail_label_list[item]]);
                //mail_number_list[item] = mail_number_list[item] + mail_data[i][item];

            }
            else{
                new_list.push(0);
                //mail_number_list[item] = mail_data[i][item];
            }

        }
        mail_number_list[mail_name_list[i]] = new_list;
        
    }
    console.log(mail_number_list);


});



//fold blocks
//function drawFoldBlock(parent_frame, labelList, barList, width, height, z, currentIndex, clickCallBack, callBackArgs)
//var out = VIS_E.drawFoldBlock("mid_main_frame", labelList, nameList, partWidth, partHeight, 2, element_index_count, graphdata.testFunction, []);

//VIS_E.mapColorNumber(10, 0, 100, 32, [255, 0, 0]);
//drawTableColmn(parent_frame, numberList, min, max, width, height, top, left, basicColor, label, clickCallBack, callBackArgs)
var columnWidth = 80;
var rowHeight = 30;
var labelShift = 100;
var topShift = 200;


// data processing ahead of visualization


//export function drawClickableTextLabel(parent_frame, index, top, left, z, text, textsize, width, clickCallBack, callBackArgs){

// draw selection table
for(var i = 0; i < numberList.length; i++){
    var number = Math.floor(30/numberList.length);
    VIS_E.drawClickableTextLabel("table_main_frame", i+65536, i*rowHeight+topShift, 0, 2, (i*number+1)+"~"+(i*number+number), 15, 50, graphdata.testFunction, [])
}





for(var i = 0; i< monthList.length; i++){
    VIS_E.drawTableColmn("table_main_frame", numberList, 0, 100, columnWidth, rowHeight, topShift, i*columnWidth+labelShift, [12, 134, 0], monthList[i], graphdata.testFunction, []);
}

