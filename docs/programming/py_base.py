import math
# 向上取整
def log2(x):
    return math.log2(x)
import random

# 范围
start, end = 0, 100
if start > end:
    start, end = end, start
elif start == end:
    print("开始和结束数字不能相同！")
    exit(1)

number = random.randint(start, end)
count = 0
# 允许的最大猜测次数
max_attempts = 1 + math.ceil(log2(end - start))

while count < max_attempts:
    print(f"你还有 {max_attempts - count} 次。")
    # guess = int(input("请输入你猜的数字（1-100）："))
    guess = (start + end) // 2 
    print(f"我猜的数字是：{guess}")
    count += 1
    if guess < number:
        print("太小了！")
        start = guess + 1
    elif guess > number:
        print("太大了！")
        end = guess - 1
    else:
        print(f"恭喜你，猜对了！你用了 {count} 次机会。")
        break
else:
    print(f"很遗憾，机会用完了。正确的数字是 {number}。")
