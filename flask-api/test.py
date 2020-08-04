# Unit Testing Module

import os;os.system('cls')
import json
from engine import forms
import unittest



class cases(unittest.TestCase):    
    def test1(self):
        req=json.loads('{"ply":"bot","dim":"3,2","pp":"1,1","tp":"1,1","dist":"4"}') #0
        o1=forms.Compute(req)
        o2=o1.calculate()
        val=o2['no_of_direction']
        self.assertEqual(0,val)
    def test2(self):
        req=json.loads('{"ply":"bot","dim":"3,2","pp":"1,1","tp":"2,1","dist":"4"}') #7
        o1=forms.Compute(req)
        o2=o1.calculate()
        val=o2['no_of_direction']
        self.assertEqual(7,val)
    def test3(self):
        req=json.loads('{"ply":"bot","dim":"300,275","pp":"150,150","tp":"185,100","dist":"500"}') #9
        o1=forms.Compute(req)
        o2=o1.calculate()
        val=o2['no_of_direction']
        self.assertEqual(9,val)
    def test4(self):
        req=json.loads('{"ply":"bot","dim":"2,5","pp":"1,2","tp":"1,4","dist":"11"}') #27
        o1=forms.Compute(req)
        o2=o1.calculate()
        val=o2['no_of_direction']
        self.assertEqual(27,val)


if __name__ == "__main__" :
    unittest.main()


# print('ready')


# req=json.loads('{"ply":"bot","dim":"3,2","pp":"1,1","tp":"1,1","dist":"4"}') #0

# req=json.loads('{"ply":"bot","dim":"300,275","pp":"150,150","tp":"185,100","dist":"500"}') #9
# req=json.loads('{"ply":"bot","dim":"2,5","pp":"1,2","tp":"1,4","dist":"11"}') #27


# req=json.loads('{"ply":"bot","dim":"500,600","pp":"400,400","tp":"321,333","dist":"3"}')
# req=json.loads(f'{"ply":str(input()),"dim":str(input()),"pp":str(input()),"tp":str(input()),"dist":str(input())}')
# print('invoke compute(req)')

# print('invoke v32`1alidate')
# o.validate()
# print('start')

# o.calculate()
# print('end')

# a= [3.605551275463989, 2.23606797749979, 3.605551275463989, 1.0, 3.605551275463989, 2.23606797749979, 3.605551275463989]
# b= [216.86989764584402, 270.0, 303.69006752597977, 270.0, 165.96375653207352, 90.0, 26.56505117707799]

# for i in list(zip(a,b)):
# 	print(i[0],"\t",i[1])


# (1, 0): (True, 1.0), 
# (1.0, 2.0): (True, 2.23606797749979), 
# (1.0, -2.0): (True, 2.23606797749979), 
# (3.0, 2.0): (True, 3.605551275463989)
# (3.0, -2.0): (True, 3.605551275463989), 
# (-3.0, 2.0): (True, 3.605551275463989), 
# (-3.0, -2.0): (True, 3.605551275463989),
#  [1, 0], [1, 2], [1, -2], [3, 2], [3, -2], [-3, 2], and [-3, -2].
