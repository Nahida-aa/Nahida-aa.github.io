# 星期日, 星期一, 星期二, 星期三, 星期四, 星期五, 星期六
# Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday
# week-0, week-1, week-2, week-3, week-4, week-5, week-6

a = 1

data = {
  "name": None,
  "changelog": None #null, None, void, empty
}

print(data)
print(type(data)) # <class 'dict'>

obj = object()
print(obj) # <object object at 0x...>
print(type(obj)) # <class 'object'>

第一个人 = {
    "name": "小明",
    "age": 18
}

def print_info(人):
    print(f"name: {人['name']}, age: {人['age']}")

func1 = print_info

# 面向对象 阶段1
class 人():
    def __init__(self, name, age=None):
        self.name = name
        self.age = age

    def print_info(self):
        print(f"姓名: {self.name}, 年龄: {self.age}")

第一个人 = 人("小明", 18) # self
第一个人.name
第一个人.age
第一个人.print_info() # 姓名: 小明, 年龄: None

# 面向对象阶段2
class 数据():
    def __init__(self, name=None, age=None):
        self.name = name
        self.age = age

class 行为():
    def __init__(self, data: 数据):
        self.data = data
    
    def print_info(self):
        print(f"姓名: {self.data.name}, 年龄: {self.data.age}")

第一个人的数据 = 数据("小明", 18)
第一个人的行为 = 行为(第一个人的数据)
第一个人的行为.print_info() # 姓名: 小明, 年龄: 18


print(type(数据)) # type
