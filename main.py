from flask import Flask, flash, redirect, render_template, request, session, abort, send_file, send_from_directory
from datetime import datetime
import time
import json
from collections import namedtuple
import sys
import re
import DataProcessing as DATA_P


app = Flask(__name__)

current_conditions = ""

# URL routing
## root directory:  /
## clear chache
@app.after_request
def add_header(r):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers['Cache-Control'] = 'public, max-age=0'
    return r


"""
 RENDER WEBPAGES
"""
## render webpages

def processData(original_data, conditionString):
    #data = DATA_P.loadAllData(filePath,conditionString)    
    data = DATA_P.loadAllData_V2(original_data,conditionString)
    


@app.route("/")
def index():
    print("Start from filter")
    #DATA_P.testFunction()
    
    ### load data and save to local  and return the data
    original_data = DATA_P.getOriginData("./Real/enron_mail_20150507.json")
    ### get filtered data from original data
    conditions = "time:>:01/06/2001|time:<:30/06/2001"
    filtered_data = processData( original_data , conditions)
    
    #### count data for selection columns
    # open("data_in_year.json", "w")
    
    #### filtered data with conditions
    # open("filtered_data.json", "w")
    
                                
    #### save the the column to get selection table                            
    #selection_table_columns = loadDatafromfiltered(filtered_data)
    
    ### write the selected table to json
    
            
    #part_data =  DATA_P.loadPartData("./data/filtered_data_12_2001.json")
    
    
    
    #data = DATA_P.loadAllData("./data/filtered_data_11_2001.json", "")
    #DATA_P.loadAllData("./Real/enron_mail_test.json", "tags:=:and_that|time:<:967008240|sentiment:>:0.5")

    # passing data
    return render_template(
        'out_frame.html')
    ### in out_frame.html, render order htmls
      
    
@app.route("/layout.html")  
def layout():
    print("Start layout")
    # passing data
    return render_template(
        'layout.html')  

@app.route("/filter.html")  
def filter():
    print("Start filter")
    
    #open("filter_conditions.json", "w")
    
    ##### load conditions json to get current conditions
    # passing data
    return render_template(
        'filter.html')
    
@app.route("/table.html")  
def table():
    print("Start from table view")
    # passing data
    # open("data_in_year.json", "w")
    
    #### load selected column from json and show the result
    
    return render_template(
        'table.html')        

## route images and data
@app.route("/images/<path:path>")
def send_images(path):
    return send_from_directory('Images', path)

@app.route("/data/<path:path>")
def send_data(path):
    return send_from_directory('Data', path)

@app.route("/<path:path>")
def send_json(path):
    return send_from_directory('', path)

@app.route('/postmethod_condition', methods = ['POST'])
def get_post_javascript_data():
    jsdata = request.form['javascript_data']
    print("=====================")
    print(jsdata)
    print("=====================")

    ###preprocessing_text_file(input_file)
    
    conditionString = "time:>:01/11/2001|time:<:30/11/2001|tag:=:buyer"
    filePath = "./Real/enron_mail_20150507.json"
    #data = processData(filePath, conditionString)
    return render_template(
        'out_frame.html')

@app.route('/postmethod_selected', methods = ['POST'])
def get_selected_data():
    jsdata = request.form['javascript_data']
    current_conditions = jsdata
    print("=====================")
    print(jsdata)
    print("=====================")
    print(current_conditions)

    ###preprocessing_text_file(input_file)
    
    conditionString = "time:>:01/11/2001|time:<:30/11/2001|tag:=:buyer"
    filePath = "./Real/enron_mail_20150507.json"
    #data = processData(filePath, conditionString)
    return render_template(
        'filter.html')


# app starts from here
if __name__ == "__main__":
    # record tool log for tracking the system
    
    app.run(host='0.0.0.0', port=int(8080))