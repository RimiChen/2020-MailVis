from mpl_toolkits.mplot3d import Axes3D
import matplotlib.pyplot as plt
import random
import json

def drawFigure2D(axis_1, axis_2, json_file_name):
    
    x_axis = []
    y_axis = []
    labels = []
   
    #X
    with open(json_file_name) as json_file:
        json_data = json.load(json_file)
        for data in json_data:
            x_axis.append(data[axis_1])
            y_axis.append(data[axis_2])
            
  
    
        plt.scatter(x_axis, y_axis, c='g', marker='o')
    
        json_file.close() 

    plt.xlabel(axis_1)
    plt.ylabel(axis_2)

    plt.show()

if __name__ == "__main__":
    # record tool log for tracking the system
    json_flie = "./data/filtered_data_buyer.json"
    drawFigure2D("time", "sentiment", json_flie)
    