import sys
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
import numpy as np
from pymongo import MongoClient

Client = MongoClient('mongodb+srv://sohamjadhav0130:finalyearproject@obesitydetection.eojavmg.mongodb.net/?retryWrites=true&w=majority')
db = Client.get_database('test')
records = db.forms

neww = records
del neww['_id']
del neww['createdAt']
del neww['updatedAt']
del neww['__v']

df1 = pd.DataFrame([neww], columns=neww.keys())

data = pd.read_csv('Dataset.csv')
WeightClasses = {
    "Insufficient_Weight" : 1,
    "Normal_Weight" : 2,
    "Overweight" : 3,
    "Obesity" : 4
}
Gender = {
    "Male" : 1,
    "Female" : 2,
    "Others" : 3
}
FHWOW = {
    "yes" : 1,
    "no" : 2
}
FAVC = {
    "yes" : 1,
    "no" : 2
}
data.WeightClasses = [WeightClasses[item] for item in data.WeightClasses]
data.Gender = [Gender[item] for item in data.Gender]
data.FHWOW = [FHWOW[item] for item in data.FHWOW]
data.FAVC = [FAVC[item] for item in data.FAVC]


y = data['WeightClasses']
x = data.drop('WeightClasses',axis = 1)
X_train,X_test,y_train,y_test = train_test_split(x,y)

knn = KNeighborsClassifier(n_neighbors = 4)
knn.fit(X_train, y_train)
ans = knn.predict(df1)
if(ans == 2):
    neww['WeightClasses'] = 2
    print(2)
if(knn.predict(df1) == 1):
    neww['WeightClasses'] = 1
    print(1)
if(knn.predict(df1) == 3):
    neww['WeightClasses'] = 3
    print(3)
if(ans == 4):
    neww['WeightClasses'] = 4
    print(4)


