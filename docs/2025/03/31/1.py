import sys
input = lambda: sys.stdin.readline().strip()

from datetime import date, timedelta
# 计算两个日期之间的天数
start_date = date(2025, 4, 1)
end_date = date(2025, 4, 17)
delta = end_date - start_date
print(delta)  # 输出: 16 days, 0:00:00
print(delta.days) # 输出: 16
