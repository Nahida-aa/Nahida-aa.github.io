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

# 重载的例子
from typing import overload

@overload
def add(a: int, b: int) -> int: ...
@overload
def add(a: int, b: int, c:int) -> int: ...

def add(a: int, b: int, c: int = 0):
    return a + b + c

print(add(1, 2))       # 3
print(add(1, 2, 3))    # 6