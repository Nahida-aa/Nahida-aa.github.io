import sys
input = lambda: sys.stdin.readline().strip()
from datetime import date, datetime, timedelta

t0 = datetime(1970, 11, 11, 0, 0, 0) # 纪元时间
format = '%Y-%m-%d %H:%M:%S'
def s(time_str, x):
    # 解析时间字符串
    dt = datetime.strptime(time_str, format)
    # 计算最近的闹铃时间
    delta = timedelta(minutes=x)
    # 计算最近的闹铃时间
    last_alarm_time = dt - (dt - t0) % delta
    return last_alarm_time.strftime(format)

n = int(input())
for _ in range(n):
    time_str1, time_str2, x = input().split()
    time_str = time_str1 + ' ' + time_str2
    print(s(time_str, int(x)))
