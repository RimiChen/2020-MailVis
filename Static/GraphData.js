export default class GraphData{
    constructor(){

        // set variables
        this.original_data = [];
        // for in class use
        this.isEmpty = function(obj) {
            return Object.keys(obj).length === 0;
        }

    }
    //outside can see
    testFunction(){
        console.log("This function is to make sure the class GraphData is functional.");
    }
}