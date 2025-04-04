from math import sqrt
def climbStairs(n: int) -> int:
    sqrt5 = sqrt(5)
    phi = (1 + sqrt5) / 2
    return round((phi**n - (1 - phi)**n) / sqrt5)