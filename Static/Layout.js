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


//function drawBlock(parent_frame, labelList, title, width, height, z, currentIndex, clickCallBack, callBackArgs)
//normal_blocks

    var partWidth = 1200;
    var partHeight = 150;
// for(var i = 0; i < nameList.length; i++){

    
//     var out = VIS_E.drawBlock("mid_main_frame", labelList, "1/1/2020", partWidth, partHeight, 2, element_index_count, graphdata.testFunction, []);
//     element_index_count = out.index;
//     element_index_count = element_index_count + 1;
//     //console.log(element_index_count);
// }

//fold blocks
//function drawFoldBlock(parent_frame, labelList, barList, width, height, z, currentIndex, clickCallBack, callBackArgs)
var out = VIS_E.drawFoldBlock("mid_main_frame", labelList, nameList, partWidth, partHeight, 2, element_index_count, graphdata.testFunction, []);

