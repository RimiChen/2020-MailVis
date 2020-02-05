from flask import Flask, flash, redirect, render_template, request, session, abort, send_file, send_from_directory
from datetime import datetime
import time
import json
from collections import namedtuple
import sys
import re


app = Flask(__name__)



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

@app.route("/")
def index():
    print("Start from filter")
    return render_template(
        'out_frame.html')  

## route images and data
@app.route("/images/<path:path>")
def send_images(path):
    return send_from_directory('Images', path)

@app.route("/data/<path:path>")
def send_data(path):
    return send_from_directory('Data', path)



# app starts from here
if __name__ == "__main__":
    # record tool log for tracking the system
    
    app.run(host='0.0.0.0', port=int(sys.argv[1]))
