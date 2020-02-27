import math
import json
import time
from datetime import datetime


def testFunction():
    print("Test import work")
    # 915527040
    #print(separateDate(915527040))
    DateTotimeStamp("01/01/1999")
    DateTotimeStamp("01/12/1999")
    
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
        
    

def countDateAmount(data):
    print("count how many in a date range")
    dateAmount = {}
    for mail in data:
        timeArray = separateDate(mail["time"])
        if timeArray["year"] in dateAmount:
            dic = dateAmount[timeArray["year"]]
            
            date_key = timeArray["month"] + "-"+timeArray["day"]
            if date_key in dic:
                dic[date_key] =  dic[date_key] + 1
            else:
                dic[date_key] = 1
            
            dateAmount[timeArray["year"]] = dic
        else:
            dateAmount[timeArray["year"]] = {}
    
    return dateAmount
        
    

    
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
        #print(json.dumps(dateAmount, indent=4, sort_keys=True))

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
        
    
    
    
    
    