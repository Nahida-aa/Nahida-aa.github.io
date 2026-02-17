---
title: version
description: 
created_at: 2026-02-17T17:46:37Z
updated_at: 2026-02-17T17:46:37Z
tags: []
---

## SemVer 2.0

| version | meaning |
| --- | --- |
| MAJOR.MINOR.PATCH | |
| 1.0.0 | initial release |
| 1.0.1 | bug fix |
| 1.1.0 | new feature |
| 2.0.0 | breaking change |

| version_requirement | meaning |
| --- | --- |
| ^1.2.3 | [1.2.3, 2.0.0) |
| ~1.2.3 | [1.2.3, 1.3.0) |
| 1.2.* | [1.2.0, 1.3.0) |
| >=1.2, <2.0 | [1.2.0, 2.0.0) |
| * | any |
| 1.2.3 | 1.2.3 |