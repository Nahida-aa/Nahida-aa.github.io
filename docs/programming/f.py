# va = 1
# vb = va
# print(va == vb) # True

# fa = print
# fb = fa
# fb(fa == fb == print) # True

# def add(pa, pb):
#     return pa + pb
# a, b = 1, 2
# add_ret = add(a, b) # 3
# print( add_ret == (a + b) )# 

# rb1 = print(1, 2)
# rb = fb(1, 2)
# print(rb)  # None

# def ff():
#     return fb

# rf = ff()
# ff1 = ff
# ff1()   (rf == ff1) # False
# print   (rf == ff1) # False
# ff1() ( ff1() == print ) # True

# def fff():
#     return ff1

# fff()() ( fff()() == print ) # True
# fff()() (fff()()() == print()) # True

# def ffff():
#     return fff

# ffff()()()(
#     fa ==
#     ff() ==
#     fff()() == 
#     ffff()()() == 
#     print
#     ) # True

# rf2 = ff()(3, 4)

# {
#     12: {
#         "因数": [1, 2, 3, 4, 6, 12],
#         "倍数": [12, 24, 36, 48, 60, 72, 84, ...],
#     },
#     14: {
#         "因数": [1, 2, 7, 14],
#         "倍数": [14, 28, 42, 56, 70, 84, ...],
#     },
# }

# print(2 / 11)

# # 重载的例子
# from typing import overload

# @overload
# def add(a: int, b: int) -> int: ...
# @overload
# def add(a: int, b: int, c:int) -> int: ...

# def add(a: int, b: int, c: int = 0):
#     return a + b + c

# print(add(1, 2))       # 3
# print(add(1, 2, 3))    # 6

# 循环(loop), 迭代(遍历)(for), 一直做(while)

# i = 0
# while i < 5:
#     print(i)
#     i += 1

# while True:
#     print("infinite loop")
#     if i >= 2:
#         break

# for j in range(5):
#     print(j)

# lst = [2, 3, 5, 7, 11]
# for v in lst:
#     print(v)


# def loop(start: int, end: int|None =None):
#     # 参数处理
#     if end is None:
#         end = start
#         start = 0

#     # 业务逻辑
#     print(start)

#     # 循环
#     start += 1
#     if start < end:
#         loop(start, end)


# loop(5)


# def say(name: str, score1: int, score2: int):
#     print(f"{name}的成绩是{score1}和{score2}，总分是{score1 + score2}")

# say("张三", 90, 95)

# type
# print(1 + "2")

def sum(n: int) -> int:
    res = 0
    for i in range(1, n + 1): # 1, 2, 3, ..., n
        res += i
    return res
print(sum(100))  # 5050

from array import array
arr: array[int] = array('int', [1, 2, 3, 4, 5])
lst: list[int] = [1, 2, 3, 4, 5]