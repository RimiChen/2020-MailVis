import math
import json
import time
from datetime import datetime
from collections import OrderedDict


def testFunction():
    print("Test import work")
    # 915527040
    #print(separateDate(915527040))
    DateTotimeStamp("01/01/1999")
    DateTotimeStamp("01/12/1999")
    
def getOriginData(file_path):
    with open(file_path) as json_file:
        data_list = json.load(json_file)
        
    # return a email list
    return data_list    



def timeStampToDate(timeStamp):
    date = datetime.fromtimestamp(timeStamp)
    #print("date = " + str(date))
    
    return str(date)
def DateTotimeStamp(DateString):
    new_time = time.mktime(datetime.strptime(DateString, "%d/%m/%Y").timetuple())
    #print(new_time)
    
    return new_time

def separateDate(timeStamp):
    date_array = {}
    timeString = timeStampToDate(timeStamp)
    date_time = timeString.split(" ")
    year_month_day = date_time[0].split("-")
    hour_minute_second = date_time[1].split(":")
    
    date_array["year"] = year_month_day[0]
    date_array["month"] = year_month_day[1]
    date_array["day"] = year_month_day[2]
    date_array["hour"] = hour_minute_second[0]
    date_array["minute"] = hour_minute_second[1]
    date_array["second"] = hour_minute_second[2]

    return date_array

def generateTimeColumn(dateAmount, assignedYear, assignedMonth, timeSlot):
    number_row = math.floor(31 / timeSlot) +1
    
    neededYear = dateAmount[assignedYear]
    dateColumn = {}
    
    current_date = 1
    for date_key in neededYear:
        date = date_key.split("-")
        
        # only process date in the assigne month
        if date[0] == assignedMonth:
            if math.floor(int(date[1]) / timeSlot) not in dateColumn:
                dateColumn[math.floor(int(date[1]) / timeSlot)] = 0
                dateColumn[math.floor(int(date[1]) / timeSlot)] = dateColumn[math.floor(int(date[1]) / timeSlot)] + neededYear[date_key]
            else:
                dateColumn[math.floor(int(date[1]) / timeSlot)] = dateColumn[math.floor(int(date[1]) / timeSlot)] + neededYear[date_key]
    
    for no_miss in range(number_row):
        if no_miss not in dateColumn:
            dateColumn[no_miss] = 0

    return dateColumn            
 
 
def generateTimeColumn_V2(date_dictionary, assignedMonth, timeSlot):
    number_row = math.floor(31 / timeSlot) +1
    
    neededYear = date_dictionary
    dateColumn = {}
    
    current_date = 1
    for date_key in neededYear:
        date = date_key.split("-")
        
        # only process date in the assigne month
        if date[0] == assignedMonth:
            if math.floor(int(date[1]) / timeSlot) not in dateColumn:
                dateColumn[math.floor(int(date[1]) / timeSlot)] = {}
                dateColumn[math.floor(int(date[1]) / timeSlot)]["number"] = 0
                dateColumn[math.floor(int(date[1]) / timeSlot)]["number"] = dateColumn[math.floor(int(date[1]) / timeSlot)]["number"] + neededYear[date_key]["number"]
                dateColumn[math.floor(int(date[1]) / timeSlot)]["data"] = []
                dateColumn[math.floor(int(date[1]) / timeSlot)]["data"].extend(neededYear[date_key]["data"])
            else:
                dateColumn[math.floor(int(date[1]) / timeSlot)]["number"] = dateColumn[math.floor(int(date[1]) / timeSlot)]["number"] + neededYear[date_key]["number"]
                dateColumn[math.floor(int(date[1]) / timeSlot)]["data"].extend(neededYear[date_key]["data"])
    
    for no_miss in range(number_row):
        if no_miss not in dateColumn:
            dateColumn[no_miss] = 0

    return dateColumn           
    

def countDateAmount(data):
    print("count how many in a date range")
    dateAmount = {}
    for mail in data:
        timeArray = separateDate(mail["time"])
        if timeArray["year"] in dateAmount:
            dic = dateAmount[timeArray["year"]]
            
            date_key = timeArray["month"] + "-"+timeArray["day"]
            if date_key in dic:
                #dic[date_key] =  dic[date_key] + 1
                dic[date_key]["number"] = dic[date_key]["number"] + 1
                dic[date_key]["data"].append(mail)
            else:
                #dic[date_key] = 1
                dic[date_key] = {}
                dic[date_key]["number"] = 1
                dic[date_key]["data"] = []
                dic[date_key]["data"].append(mail)
                
            
            dateAmount[timeArray["year"]] = dic
        else:
            dateAmount[timeArray["year"]] = {}
    
    return dateAmount
        
    


def countDataWithAttritube(data, attritube):
    new_dic = {}
    
    for record in data:
        if type(record[attritube]) is list:
            for sub_part in record[attritube]:
                if sub_part in new_dic:
                    new_dic[sub_part].append(record)
                
                else:
                    new_dic[sub_part] = []
                    new_dic[sub_part].append(record)
        else:
            if record[attritube] in new_dic:
                new_dic[record[attritube]].append(record)
                
            else:
                new_dic[record[attritube]] = []
                new_dic[record[attritube]].append(record)
    
    
    
    print("count with "+str(attritube))
    return new_dic

def countNumber(data):
    number_dic = {}
    
    for record in data:
        number_dic[record] = len(data[record])
    
    return number_dic

def loadPartData(dataPath):
    print("SYSTEM: load all data in here")
    
        

    with open(dataPath) as json_file:
        json_data = json.load(json_file)
        
        dataWithAttritube = countDataWithAttritube(json_data, "tags")
        
        out_file = open("data_with_attritube.json", "w")
        # magic happens here to make it pretty-printed
        out_file.write(json.dumps(dataWithAttritube, indent=4))
        out_file.close()    
        #print(json.dumps(dateAmount, indent=4, sort_keys=True))

        numberAttritube = countNumber(dataWithAttritube)
        #numberAttritube = OrderedDict(sorted(numberAttritube.items(), key=lambda x: x[1]))
        numberAttritube = OrderedDict(sorted(numberAttritube.items(), key=lambda x: x[1], reverse = True))
       
         
        out_file = open("data_with_attritube_number.json", "w")
        # magic happens here to make it pretty-printed
        out_file.write(json.dumps(numberAttritube, indent=4))
        out_file.close()
        
        ranked_data = getRanking(numberAttritube, 10)
        
        out_file = open("data_with_attritube_rank.json", "w")
        # magic happens here to make it pretty-printed
        out_file.write(json.dumps(ranked_data, indent=4))
        out_file.close()        
        
               

    return dataWithAttritube


def getRangeCount(dataArray, min, max, numberSlots):
    ## separate the whole period to small ranges and count the numbers
    print("SYSTEM: cut the ranges")
    
    ## get the labels first
    
    mail_label_list = {}
    
    for count in range(numberSlots):
        range_label = count*(max-min)/numberSlots + min
        mail_label_list[range_label] = 0
    
    #for record in dataArray:

def getRanking(dataArray, top_number):
    ## assume the data is in descending order and return the top_number of items
    ignore_list = [
        "and_that",
        "actually",
        "and_i",
        "1",
        1,
        17,
        "..._you",
    ]
    
    tail = len(dataArray)
    
    rank_data = {}
    
    for record in dataArray:
        if record not in ignore_list and len(rank_data) < top_number:
            rank_data[record] = dataArray[record]
            
    return rank_data
    
def loadAllData(dataPath, filterString):
    print("SYSTEM: load all data in here")
    
        

    with open(dataPath) as json_file:
        
        condition_list = parseFilter(filterString)
        
        
        out_file = open("filter_conditions.json", "w")
        # magic happens here to make it pretty-printed
        out_file.write(json.dumps(condition_list, indent=4, sort_keys=True))
        out_file.close()   
        
        
        json_data = json.load(json_file)
        
        print("SYSTEM: total records are " + str(len(json_data)))
        
        test_count = 0
        dateAmount = countDateAmount(json_data)

        out_file = open("date_with_email_number.json", "w")
        # magic happens here to make it pretty-printed
        out_file.write(json.dumps(dateAmount, indent=4, sort_keys=True))
        out_file.close()    
        

     
        
        ## use to generate data for table
        
        total_time = {}
        for month in range(12):
            if month<9:
                month = month +1
                month = "0"+str(month)
            else:
                month = month +1
                month = str(month)
                
            timeColumn = generateTimeColumn(dateAmount, "2004", month, 32)
            total_time[month] = timeColumn
        
        out_file = open("data_in_year.json", "w")
        # magic happens here to make it pretty-printed
        out_file.write(json.dumps(total_time, indent=4, sort_keys=True))
        out_file.close()            
        #print(json.dumps(timeColumn, indent=4, sort_keys=True)) 
                   
        
        ## use to show current data form
        for mail in json_data:
            if test_count < 3:
                #print(json.dumps(mail, indent=4, sort_keys=True))
                timeString = timeStampToDate(mail["time"])
                #print(timeString)
                test_count = test_count +1
        new_data = getConstraint_Data(condition_list, json_data)
        
        out_file = open("filtered_data.json", "w")
        # magic happens here to make it pretty-printed
        out_file.write(json.dumps(new_data, indent=4, sort_keys=True))
        out_file.close()    

    return new_data
    

def generateTable(y_number, date_dictionary, year):
    #### need a dictionary use date as key, number as value
    
    #### set default
    total_time = {}
    target_year = date_dictionary[year]
    for month in range(12):
        #### month string
        if month<9:
            month = month +1
            month = "0"+str(month)
        else:
            month = month +1
            month = str(month)

        timeColumn = generateTimeColumn_V2(target_year, month, y_number)
        total_time[month] = timeColumn

    
    
    
    ##### DEBUG: to see whether the table column is correct
    out_file = open("data_in_year.json", "w")
    # magic happens here to make it pretty-printed
    out_file.write(json.dumps(total_time, indent=4, sort_keys=True))
    out_file.close()     
    
    return total_time      
    

def loadAllData_V2(original_data, filterString):
    print("SYSTEM: load all data in here")
    
        

    condition_list = parseFilter(filterString)
        
        
    #### DEBUG: check conditions
    out_file = open("filter_conditions.json", "w")
    # magic happens here to make it pretty-printed
    out_file.write(json.dumps(condition_list, indent=4, sort_keys=True))
    out_file.close()   
        
    json_data = original_data
    
    print("SYSTEM: number of total records is " + str(len(json_data)))
    
    test_count = 0
    
    ### a dictionary using date as keys, number of emails as values, and separate by years
    dateAmount = countDateAmount(json_data)

    ##### DEBUG: separate data by date 
    # out_file = open("date_with_email_number.json", "w")
    # # magic happens here to make it pretty-printed
    # out_file.write(json.dumps(dateAmount, indent=4, sort_keys=True))
    # out_file.close()    

    ## use to generate data for table
    
    #generateTable(y_number, date_dictionary, year, month):
    total_time = generateTable(3, dateAmount, "2001")
                
    
    ## use to show current data form
    for mail in json_data:
        if test_count < 3:
            #print(json.dumps(mail, indent=4, sort_keys=True))
            timeString = timeStampToDate(mail["time"])
            #print(timeString)
            test_count = test_count +1
    new_data = getConstraint_Data(condition_list, json_data)
    
    out_file = open("filtered_data.json", "w")
    # magic happens here to make it pretty-printed
    out_file.write(json.dumps(new_data, indent=4, sort_keys=True))
    out_file.close()    

    return new_data


def conditionChecking(condition_list, data):
    check_flags = []
    # if pass all the constraint return true, else return false
    for condition in condition_list:


        now_checking = data[condition["label"]]
        if type(now_checking) is list:
            #print("***list checking")
            if condition["not_flag"] == True:
                #print("***** list not ")
                ## NOT!
                if condition["operator"] == "=":
                    if condition["value"] in now_checking:
                        check_flag = False
                        check_flags.append(check_flag)
                    else:
                        check_flag = True
                        check_flags.append(check_flag)
            else:
                #print("***** list yes ")
                if condition["operator"] == "=":
                    if not condition["value"] in now_checking:
                        check_flag = False
                        check_flags.append(check_flag)
                    else:
                        check_flag = True
                        check_flags.append(check_flag)
            
        else:                
            if isinstance(now_checking, int) == True or isinstance(now_checking, float) == True:
                # it is a numeric data, process =, >, <
                # print("***numberic checking")

                        
                if condition["label"] == "time":
                    condition_value = float(DateTotimeStamp(condition["value"]))
                else:
                    condition_value = float(condition["value"])                    
                    
                if condition["not_flag"] == True:
                    ## NOT!
                    # print("***** numeric not ")
                    if condition["operator"] == "=":
                        if now_checking == condition_value:
                            check_flag = False
                            check_flags.append(check_flag)
                        else:
                            check_flag = True
                            check_flags.append(check_flag)
                        
                    elif condition["operator"] == ">":
                        if now_checking > condition_value:
                            check_flag = False
                            check_flags.append(check_flag)
                        else:
                            check_flag = True
                            check_flags.append(check_flag)                  
                    elif condition["operator"] == "<":
                        if now_checking < condition_value:
                            check_flag = False
                            check_flags.append(check_flag)
                        else:
                            check_flag = True
                            check_flags.append(check_flag)                    
                else:
                    # print("***** numeric yes ")
                    if condition["operator"] == "=":
                        if not now_checking == condition_value:
                            check_flag = False
                            check_flags.append(check_flag)
                        else:
                            check_flag = True
                            check_flags.append(check_flag)
                    elif condition["operator"] == ">":
                        if not now_checking > condition_value:
                            check_flag = False
                            check_flags.append(check_flag)
                        else:
                            check_flag = True
                            check_flags.append(check_flag)                 
                    elif condition["operator"] == "<":
                        if not now_checking < condition_value:
                            check_flag = False
                            check_flags.append(check_flag)
                        else:
                            check_flag = True
                            check_flags.append(check_flag)                  
                    
            else:
                # print("*** not list, not numeric")
                if condition["not_flag"] == True:
                    ## NOT!
                    if condition["operator"] == "=":
                        if condition["value"] == now_checking:
                            check_flag = False
                            check_flags.append(check_flag)
                        else:
                            check_flag = True
                            check_flags.append(check_flag)
                else:
                    if condition["operator"] == "=":
                        if not condition["value"] == now_checking:
                            check_flag = False
                            check_flags.append(check_flag)
                        else:
                            check_flag = True
                            check_flags.append(check_flag)
        
        # print("============================")
        # print(condition)
        # print(data)
        # print(check_flags)
    
    
    if False in check_flags:
        return False
    else:
        return True        
            # not numeric, ignore >, <
def getConstraint_Data(condition_list, original_data):
    constraint_data = []
    for data in original_data:
        if conditionChecking(condition_list, data):
            constraint_data.append(data)
        
    return constraint_data  
def parseFilter(filterString):
    # tag 1: | tag 2:  |
    # <label name>:<operator>:<value>
    # value < A, value > A, value = 0
    # value = A, value ~= A
    # value <> A, value ~<> A 
    
    filters = filterString.split("|")
    
    condition_list = []
    for condition in filters:
        new_condition = {}
        condition_separate = condition.split(":")
        
        new_condition["label"] = condition_separate[0]
        new_condition["operator"] = condition_separate[1]
        new_condition["value"] = condition_separate[2]
        if new_condition["operator"].find("~") >= 0:
            # contain a not
            new_condition["not_flag"] = True
            new_condition["operator"] = new_condition["operator"].replace("~","")
        else:
            new_condition["not_flag"] = False
        
        condition_list.append(new_condition)
    
    return condition_list
        
    
    
    
    
    