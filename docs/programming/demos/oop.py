import settings

print(settings.管理员密码)
print(settings.版本)

def 第一个参数是第二个参数的实例(obj, cls):
    return isinstance(obj, cls)

变量名1 = 1
变量名1 = 2

学生1 = {
    "名字": "John",
    "名字": "tt",
    "年龄": 20,
    "性别": "Male",
    '成绩': {
        '语文': 80,
        '数学': 90,
    },
    '爱好': ['篮球', '足球', '乒乓球'],
} # kv表, dict, map(映射), hash表, object(对象), 结构体, schema(模式), 记录
# key: 键, 唯一的, 标识符, 名字, 钥匙, 密钥, 身份证

# a egg, three eggs
print(学生1.keys())
print(学生1.values())

if 第一个参数是第二个参数的实例(学生1, dict):
    print('学生1是dict类型', f'学生1的名字是{学生1["名字"]}')
    学生1["名字"] = "bb"
    print(f'学生1的名字是{学生1["名字"]}')
class Student:
    类名 = '学生'
    def __init__(自己, 名字, 年龄, 性别):
        自己.名字 = 名字
        自己.年龄 = 年龄
        自己.性别 = 性别

学生2 = Student("Jane", 21, "Female")
学生2.类名 = '女生'

if 第一个参数是第二个参数的实例(学生2, Student):
    print('学生2是Student类型', f'学生2的名字是{学生2.名字}')

    学生2.名字 = 'aa'
    print(f'学生2的名字是{学生2.名字}')