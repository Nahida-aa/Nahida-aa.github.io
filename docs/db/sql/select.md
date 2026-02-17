---
title: select by sql
description: 
created_at: 2022-8-26T14:25:26Z
updated_at: 2026-02-17T10:17:55Z
tags: [db, sql]
---

1. FROM / JOIN：确定数据来源并连接表，形成一个庞大的虚拟中间结果集。
2. WHERE：对上一步的虚拟结果集进行行级过滤。
3. GROUP BY：将过滤后的行进行分组。
4. HAVING：对分组后的组进行过滤（因此可以用聚合函数，如 COUNT(*) > 1）。
5. SELECT：计算具体的列表达式（包括聚合函数）。
6. DISTINCT：去重。
7. ORDER BY：排序。
8. LIMIT / OFFSET：截取最终结果