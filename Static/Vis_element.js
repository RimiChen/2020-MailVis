export function testFunction() {
    console.log("Test wether the visualization element can be use!")
}
export function drawClickableCanvas(parent_frame, index, width, height, top, left, z, color, clickCallBack, callBackArgs){
    var canvas = document.createElement('canvas');

    canvas.id = "canvas"+index;
    canvas.width = width;
    canvas.height = height;
    canvas.style.top = top;
    canvas.style.left = left;
    canvas.style.zIndex = z;
    canvas.style.position = "absolute";
    canvas.style.border = "1px solid";

    var ctx = canvas.getContext("2d");
    //ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
    
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);

    // Add event listener for `click` events.
    var canvasLeft = canvas.offsetLeft;
    var canvasTop = canvas.offsetTop;
    //var context = canvas.getContext('2d');
   
    canvas.addEventListener('click', function(event) {
        var x = event.pageX - canvasLeft,
            y = event.pageY - canvasTop;

            // var ctx = canvas.getContext("2d");
            // ctx.clearRect(left, top, width, height);
            // ctx.fillStyle = "rgba(255, 0, 255, 0.2)";
            // ctx.fillRect(left, top, width, height);

            //console.log(canvas.id+": ("+x+", "+y+")");
          clickCallBack.apply(this, callBackArgs);
    }, false);    

    var parent = document.getElementById(parent_frame); ;
    parent.appendChild(canvas);
    // below is optional
}
export function drawClickableTextLabel(parent_frame, index, top, left, z, text, textsize, width, clickCallBack, callBackArgs){
    var canvas = document.createElement('canvas');

    canvas.id = "canvas"+index;
    canvas.width = width;
    canvas.height =  textsize;
    canvas.style.top = top;
    //console.log(top)
    canvas.style.left = left;    
    canvas.style.zIndex = z;
    canvas.style.position = "absolute";
    canvas.style.border = "1px solid";

    var ctx = canvas.getContext("2d");
   
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    //var size = textsize +"px";
    //ctx.fontsize = textsize;

    ctx.font = "normal "+textsize+"px Arial";
    var txt = text;
    //canvas.width = ctx.measureText(txt).width +10;
    ctx.fillText(txt, 5, 10);
    //ctx.fillRect(left, top, canvas.width, canvas.height);
    //console.log("w: "+ canvas.width+", h: "+canvas.height);
    
    // Add event listener for `click` events.
    var canvasLeft = canvas.offsetLeft;
    var canvasTop = canvas.offsetTop;
    //var context = canvas.getContext('2d');
   
    canvas.addEventListener('click', function(event) {
        var x = event.pageX - canvasLeft,
            y = event.pageY - canvasTop;

            //console.log(canvas.id+": ("+x+", "+y+")");
          clickCallBack.apply(this, callBackArgs);
    }, false);    

    var parent = document.getElementById(parent_frame); ;
    parent.appendChild(canvas);
}
export function drawClickableTextColorLabel(parent_frame, index, width, height, top, left, z, text, textsize, color, clickCallBack, callBackArgs){
    var canvas = document.createElement('canvas');

    canvas.id = "canvasTextColor"+index;
    canvas.width = width;
    canvas.height =  height;
    canvas.style.top = top;
    //console.log(top)
    canvas.style.left = left;    
    canvas.style.zIndex = z;
    canvas.style.position = "absolute";
    canvas.style.border = "1px solid";

    var ctx = canvas.getContext("2d");
   
    //var size = textsize +"px";
    //ctx.fontsize = textsize;


    ctx.font = "normal "+textsize+"px Arial";

    ctx.fillStyle = color;
    //console.log(color);
    //console.log(typeof(color));
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    var txt = text;
    ctx.fillText(txt, 10, 20);
    //ctx.fillRect(left, top, canvas.width, canvas.height);
    //console.log("w: "+ canvas.width+", h: "+canvas.height);

    // Add event listener for `click` events.
    var canvasLeft = canvas.offsetLeft;
    var canvasTop = canvas.offsetTop;
    //var context = canvas.getContext('2d');
   
    canvas.addEventListener('click', function(event) {
        var x = event.pageX - canvasLeft,
            y = event.pageY - canvasTop;

            //console.log(canvas.id+": ("+x+", "+y+")");
          clickCallBack.apply(this, callBackArgs);
    }, false);    

    var parent = document.getElementById(parent_frame); ;
    parent.appendChild(canvas);
}
export function drawClickableTag(parent_frame, index, width, height, top, z, text, textsize, color, clickCallBack, callBackArgs){
    var canvas = document.createElement('canvas');

    canvas.id = "canvasTextColor"+index;
    canvas.width = width;
    canvas.height =  height;
    canvas.style.top = top;
    canvas.style.zIndex = z;
    canvas.style.display = "inline-block";
    canvas.style.border = "1px solid";

    var ctx = canvas.getContext("2d");
   
    //var size = textsize +"px";
    //ctx.fontsize = textsize;


    ctx.font = "normal "+textsize+"px Arial";

    ctx.fillStyle = color;
    //console.log(color);
    //console.log(typeof(color));
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    var txt = text;
    ctx.fillText(txt, 10, 20);
    //ctx.fillRect(left, top, canvas.width, canvas.height);
    //console.log("w: "+ canvas.width+", h: "+canvas.height);

    // Add event listener for `click` events.
    var canvasLeft = canvas.offsetLeft;
    var canvasTop = canvas.offsetTop;
    //var context = canvas.getContext('2d');
   
    canvas.addEventListener('click', function(event) {
        var x = event.pageX - canvasLeft,
            y = event.pageY - canvasTop;

            //console.log(canvas.id+": ("+x+", "+y+")");
          clickCallBack.apply(this, callBackArgs);
    }, false);    

    var parent = document.getElementById(parent_frame); ;
    parent.appendChild(canvas);
}

export function drawAxis(parent_frame, index, width, top, left, z, color, numberLabel, slotWidth){

    var parent = document.getElementById(parent_frame); ;
    var top = parent.offsetTop;

    var canvas = document.createElement('canvas');

    canvas.id = "line"+index;
    canvas.width = width;
    canvas.height = 1;
    canvas.style.top = top+30;
    canvas.style.left = left;
    canvas.style.zIndex = z;
    canvas.style.position = "absolute";
    canvas.style.border = "1px solid";

    var ctx = canvas.getContext("2d");
    //ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height );



    
    for(var i = 0; i < numberLabel; i++){
        drawLine(parent_frame, i, top+ 30, slotWidth*i+left, z, color)
    }

    parent.appendChild(canvas);
}

export function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function drawLine(parent_frame, index, top, left, z, color){
    var canvas = document.createElement('canvas');

    canvas.id = "line"+index;
    canvas.width = 1;
    canvas.height = 5;
    canvas.style.top= top - canvas.height;
    canvas.style.left = left;
    canvas.style.zIndex = z;
    canvas.style.position = "absolute";
    canvas.style.border = "1px solid";

    var ctx = canvas.getContext("2d");
    //ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var parent = document.getElementById(parent_frame); ;
    parent.appendChild(canvas);
    // below is optional

}

export function drawBlock(parent_frame, labelList, max_number, number_list, color, title, width, height, z, currentIndex, clickCallBack, callBackArgs){

    //console.log(labelList);
    //console.log(number_list);
    var newDiv = document.createElement("div");
    newDiv.id = "div"+currentIndex;
    //console.log(newDiv.id);
    currentIndex = currentIndex + 1;
    newDiv.style.width = width+"px";
    newDiv.style.height = height+"px";
    newDiv.style.zIndex = z;
    newDiv.style.background = "rgba(0, 0, 255, 0.2)";
    newDiv.style.display = "block";
    newDiv.style.border = "1px solid";
    


    var target = document.getElementById(parent_frame); 
    target.appendChild(newDiv);


    // newDiv.addEventListener('click', function(event) {
    //       clickCallBack.apply(this, callBackArgs);
    // }, false);
    
    
    //add axis
    var number = labelList.length;
    var slotWidth = (width-100)/(number);
    var offset = 50;
    var axisHeight = 30;

    var newDiv_top = newDiv.offsetTop;
    //(parent_frame, index, width, top, left, z, color, numberLabel, slotWidth)
    drawAxis(newDiv.id, currentIndex , width-100, newDiv_top+axisHeight, offset, 3, "rgba(0, 0 ,0, 1)", number, slotWidth);
    currentIndex = currentIndex + 1;
    //add labels

// function drawClickableTextLabel(parent_frame, index, top, left, z, text, textsize, clickCallBack, callBackArgs){

    var newDiv_top = newDiv.offsetTop;

    for(var i = 0; i <number; i++){

        //console.log(newDiv_top)
        drawClickableTextLabel(newDiv.id, currentIndex  , newDiv_top+5, i*slotWidth+offset, 2, labelList[i], 15, width/number-10, testFunction, []);
        currentIndex = currentIndex + 1;
    }
    //add bars
//drawClickableCanvas(parent_frame, index, width, height, top, left, z, color, clickCallBack, callBackArgs)
    //var color = getRandomColor();
    for(var i = 0; i <number; i++){
        //var len = Math.floor(Math.random() * 100);
        var len = (height-75)*number_list[i]/max_number;
        drawClickableCanvas(newDiv.id, currentIndex , slotWidth/2, len, newDiv_top+axisHeight, i*slotWidth+(slotWidth/2)-(slotWidth/4)+offset, 2, color, testFunction, []); 
        currentIndex = currentIndex + 1;
    }


    return {
        name: newDiv.id, 
        index: currentIndex
    };
}

export function drawFoldBlock(parent_frame, labelList, barList, numberList, width, height, z, currentIndex, clickCallBack, callBackArgs){

    var newDiv = document.createElement("div");
    newDiv.id = "div"+currentIndex;
    //console.log(newDiv.id);
    currentIndex = currentIndex + 1;
    newDiv.style.width = width+"px";
    newDiv.style.height = height+"px";
    newDiv.style.zIndex = z;
    newDiv.style.background = "rgba(0, 0, 255, 0.2)";
    newDiv.style.display = "block";
    newDiv.style.border = "1px solid";
    


    var target = document.getElementById(parent_frame); 
    target.appendChild(newDiv);


    // newDiv.addEventListener('click', function(event) {
    //       clickCallBack.apply(this, callBackArgs);
    // }, false);
    
    
    //add axis
    var number = labelList.length;
    var slotWidth = (width-100)/(number);
    var offset = 50;
    var axisHeight = 30;

    var newDiv_top = newDiv.offsetTop;
    //(parent_frame, index, width, top, left, z, color, numberLabel, slotWidth)
    drawAxis(newDiv.id, currentIndex , width-100, newDiv_top+axisHeight, offset, 3, "rgba(0, 0 ,0, 1)", number, slotWidth);
    currentIndex = currentIndex + 1;
    //add labels

// function drawClickableTextLabel(parent_frame, index, top, left, z, text, textsize, clickCallBack, callBackArgs){

    var newDiv_top = newDiv.offsetTop;

    for(var i = 0; i <number; i++){

        //console.log(newDiv_top)
        drawClickableTextLabel(newDiv.id, currentIndex  , newDiv_top+5, i*slotWidth+offset, 2, labelList[i], 15,  testFunction, []);
        currentIndex = currentIndex + 1;
    }
    //add bars
//drawClickableCanvas(parent_frame, index, width, height, top, left, z, color, clickCallBack, callBackArgs)

    for(var j = 0; j < barList.length; j++){
        
        var color = getRandomColor();
        for(var i = 0; i <number; i++){
            //var len = Math.floor(Math.random() * 100);
            var len = (height-75)*numberList[j][i]/21000;
            var barWidth =  slotWidth/barList.length;
            drawClickableCanvas(newDiv.id, currentIndex , barWidth, len, newDiv_top+axisHeight, i*slotWidth+offset+barWidth*j, 2, color, testFunction, []); 
            currentIndex = currentIndex + 1;
        }

    }
    return {
        name: newDiv.id, 
        index: currentIndex
    };
}

export function mapColorNumber(numberOfChunk, minNumber, maxNumber, number, basicColor){
    // we basicly change the alpha value
    var chunk = Math.floor((maxNumber - minNumber)/numberOfChunk);
    var alphaValue = 1/numberOfChunk;
    var color = basicColor;
    // R G B
    if(basicColor.length >=3){
        var R = color[0];
        var G = color[1];
        var B = color[2];
    }
    else{
        console.log("not correct color format");
    }

    var value = minNumber;
    var count = 0;
    while((value+chunk) <= number){
        value = value+chunk;
        //console.log(value);
        count = count +1;
    }

    var computedColorAlpha = alphaValue * count;
    var computedColor = "rgba("+R+", "+G+", "+B+", "+computedColorAlpha+")";
    ///console.log(computedColor);

    return computedColor;
}


export function reverseColorRGBA(colorString){

    
    var new_color_s = colorString.replace("rgba(", "");
    new_color_s = new_color_s.replace(")", "");
    var splitColor = new_color_s.split(",");
    splitColor[0] = 256 - splitColor[0];
    splitColor[1] = 256 - splitColor[1];
    splitColor[2] = 256 - splitColor[2];
    splitColor[3] = splitColor[3];

    var newColor = "rgba("+splitColor[0]+","+splitColor[1]+","+splitColor[2]+","+splitColor[3]+")";
    return newColor
}

export function getNumberKey(number){
    
    var newKey = "0";
    if(number < 10){
        newKey = "0" + number.toString();
    }
    else{
        newKey = number.toString();
    }
    
    return newKey
}