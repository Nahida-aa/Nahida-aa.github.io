import math

# 等式左边的函数
def f1(x):
    return x - 2
# 等式右边的函数
def f2(x):
    return 2*x + 8

# 解决 eq 的 函数
def solve_eq(f1, f2):
  # 初始值
  x = 0 
  # 学习率
  alpha = 0.01 
  # 精度
  epsilon = 0.00000001 
  # 迭代开始
  while abs(f1(x) - f2(x)) > epsilon:
    x = x + alpha*(f1(x) - f2(x))
  if x != math.inf: 
    return x
  while abs(f1(x) - f2(x)) > epsilon:
    x = x - alpha*(f1(x) - f2(x))
  return x

# 调用函数
result = solve_eq(f1, f2)
print(result) # 输出结果