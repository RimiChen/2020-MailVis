import GraphData, * as GRAPHDATA from "./GraphData.js"
import * as VIS_E from "./Vis_element.js"


console.log("test filter loading");


// the default setting of the filter

var recordConditionText = {}

function updateCondition(){
    localStorage.setItem('MailVis_ConditionList', JSON.stringify(recordConditionText));
    //var retrievedObject = localStorage.getItem('testObject');
    var conditions = JSON.stringify(recordConditionText);
    $.post( "/postmethod", {
        javascript_data: conditions 
    });
}

function testCallBack(content){
    console.log(recordConditionText[content]);
    var theParent = this.parentNode;
    delete recordConditionText[content];
    updateCondition();
    this.parentNode.removeChild(this);

    // if (theParent.hasChildNodes()) {
    //     var children = theParent.childNodes;
      
    //     for (var i = 0; i < children.length; i++) {
    //       // do something with each child as children[i]
    //       // NOTE: List is live! Adding or removing children will change the list's `length`
    //       //console.log(children[i]);
    //     }
    // }

}
// on change event
$( "#fcondition" ).change(function() {
    //console.log("text on change");
    // add new text label
    console.log($("#fcondition").val());
    var width = 100;
    var height = 50;
    var top = 10;
    var z = 2;
    var text = $("#fcondition").val();
    var textsize = 15;
    var color = VIS_E.getRandomColor();
    recordConditionText[text] = text;
    updateCondition();
    VIS_E.drawClickableTag("top_main_frame", text, width, height, top, z, text, textsize, color, testCallBack, [text]);

});
