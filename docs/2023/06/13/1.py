from datetime import date, timedelta
# print((date(2000, 5, 4) - date(2000, 1, 1)).days+1)

# from datetime import date, timedelta
# t0 = date(1901, 1, 1)
# t1 = date(2000, 12, 31)
# res = 0
# while t0 <= t1:
#     if t0.weekday() == 0:  # 0=Monday, 1=Tuesday, ..., 6=Sunday
#         res += 1
#     t0 += timedelta(days=1)
# print(res)
t0 = date(1900, 1, 1)
t1 = date(9999, 12, 31)
delta = timedelta(days=1)
res = 0
while t0 < t1:
    if '2' in str(t0):
        res += 1
    t0 += delta
print(res+1)  # 输出: 1994240