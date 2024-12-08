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
var partWidth = 1200;
var partHeight = 180;

//document.addEventListener("DOMContentLoaded", loadPage);


$.getJSON('./data/data_with_attritube_rank_04_12_2001.json', function(data) {
    console.log(data);
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


    var color = VIS_E.getRandomColor();   
    for(var i = 0; i < mail_name_list.length; i++){

        //console.log(mail_number_List[i]);
 
        var out = VIS_E.drawBlock("mid_main_frame", mail_label_list, 3300, mail_number_list[ mail_name_list[i]], color, "Years", partWidth, partHeight, 2, element_index_count, graphdata.testFunction, []);
        element_index_count = out.index;
        element_index_count = element_index_count + 1;
        //console.log(element_index_count);
    }
   
});




