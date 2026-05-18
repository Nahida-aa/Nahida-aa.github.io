---
title: paper
description: 关于论文的记录
lastUpdated: 2025-04-17T16:19:32Z
tags: [docs, paper]
---

我有数学建模竞赛经验和开发经验, 会使用 python, ts 等, 也有数学竞赛经验, 机器学习, 深度学习经验, 现在我需要编写本科论文, 在选题和初稿阶段, 就是题目还没选好, 我们的数据集以 Harmonized Data 为主

多模态生物医学数据驱动的老年人健康画像构建与预测

http://vgms.fanyu.com

## 常规生物医学指标与中国老年人健康状况的相关性研究

- 第一章 dataset
  - 第一节 介绍
    - part 1 介绍
    - part 2 Harmonized 概念
    - part 3 Harmonized 问卷
    - part 4 变量查询
  - 第二节 Harmonized Core 问卷 与 选题
    - part 1 问卷模块
    - part 2 变量介绍 与 选题 思路
    - part 3 Harmonized codebook
  - 第三节 Harmonized end of life 问卷 与 选题
    - part 1 临终访谈
    - part 2 临终问卷模块
    - part 3 变量介绍 与 选题 思路
  - 第四节 Harmonized life history 问卷 与 选题
    - part 1 生命历程访谈
    - part 2 生命历程问卷模块
    - part 3 变量介绍 与 选题 思路
- 第二章 各 dataset 及选题
  - 第一节 CHARLS
    - part 1 介绍
    - part 2 采集流程
    - part 3 原始问卷
    - part 4 变量 与 选题
    - part 5 权重介绍
  - 第二节 HRS
  - 第三节 ELSA
  - ...
- 第三章 数据处理与分析
  - 第一节 描述性统计
    - part 1 应用场景
    - part 2 实战
    - part 3 结果解读
  - 第二节 回归分析: 广义线性, logistic, KM曲线+Cox
    - part 1 三大回归分析应用场景
    - part 2 实战
    - part 3 结果解读
  - 第三节 交互作用与中介效应
    - part 1 应用场景
    - part 2 实战
    - part 3 结果解读
  - 第四节 限制性立方样条 RCS
  - 第五节 亚组分析与森林图
    - part 1 介绍
    - part 2 实战
    - part 3 结果解读
  - 第六节 轨迹模型
  - 第七节 混合线性模型
  - 第八节 高分队列研究套路1: 累计平均暴露\累计暴露\累积暴露时间进程
    - part 1 介绍, 文献示例
    - part 2 适用条件
    - part 3 实战
  - 第九节 高分队列研究套路2: 访视期间变异性\年度变化百分比\绝对年变化率
    - part 1 介绍, 文献示例
    - part 2 适用条件
    - part 3 实战
  - 第十节 高分队列研究套路3: 新发年龄\早发人群
    - part 1 介绍, 文献示例
    - part 2 适用条件
    - part 3 实战
  - 第十一节 高分队列研究套路4: 交叉滞后
    - part 1 介绍, 文献示例
    - part 2 适用条件
    - part 3 实战
- 第四章 顶刊论文复现
  - 第一节 如何进行研究设计及数据制备
  - 第二节 如何进行数据分析
  - 第三节 如何完成论文写作
## 数据集 Global Aging

```sh
pip install pandas pyreadstat
```

| 数据集名称 | 数据集描述 | 
| -------- | --------- |
| CHARLS | 中国健康与养老追踪调查 (CHARLS) 是一项全国性、长期的纵向调查，旨在收集中国中老年人群体的健康、经济和社会信息。 |
| Health and Retirement Study, HRS | 健康与退休调查 (HRS) 是一项针对美国中老年人群体的纵向调查，旨在研究健康、经济和社会因素对退休决策的影响。 |
| English Longitudinal Study of Ageing, ELSA | 英国老年人纵向研究 (ELSA) 是一项针对英国中老年人群体的纵向调查，旨在研究健康、经济和社会因素对老年人生活质量的影响。 |
| Survey of Health, Ageing and Retirement in Europe, SHARE | 欧洲健康、老龄化与退休调查 (SHARE) 是一项针对欧洲中老年人群体的纵向调查，旨在研究健康、经济和社会因素对老年人生活质量的影响。 |
| Korea Longitudinal Study of Ageing, KLoSA | 韩国老龄化纵向研究 (KLoSA) 是一项针对韩国中老年人群体的纵向调查，旨在研究健康、经济和社会因素对老年人生活质量的影响。 |
| The Irish Longitudinal Study on Ageing, TILDA | 爱尔兰老龄化纵向研究 (TILDA) 是一项针对爱尔兰中老年人群体的纵向调查，旨在研究健康、经济和社会因素对老年人生活质量的影响。 |
| Mexico Health and Aging Study, MHAS | 墨西哥健康与老龄化研究 (MHAS) 是一项针对墨西哥中老年人群体的纵向调查，旨在研究健康、经济和社会因素对老年人生活质量的影响。 |
| Indonesia Family Life Survey, IFLS | 印尼家庭生活调查 (IFLS) 是一项针对印尼中老年人群体的纵向调查，旨在研究健康、经济和社会因素对老年人生活质量的影响。 |
| Japanese Study of Aging and Retirement, JSTAR | 日本老龄化与退休研究 (JSTAR) 是一项针对日本中老年人群体的纵向调查，旨在研究健康、经济和社会因素对老年人生活质量的影响。 |
| Study on Global Ageing and Adult Health, SAGE | 全球老龄化与成人健康研究 (SAGE) 是一项针对全球中老年人群体的纵向调查，旨在研究健康、经济和社会因素对老年人生活质量的影响。 |
| Global Ageing Data Repository, GADR | 全球老龄化数据存储库 (GADR) 是一项针对全球中老年人群体的纵向调查，旨在研究健康、经济和社会因素对老年人生活质量的影响。 |


### Harmonized Data

#### 队列研究

CHARLS 的 Harmonized Data 包含 4 波数据，从流行病学统计的角度来看，它既可以被视为一个***队列研究***，也可以在某些情况下被视为多个**横断面研究**

**队列研究的角度**
- 定义: 队列研究是指对一组特定人群（队列）进行长期随访，观察其暴露因素与结局之间的关系
- CHARLS 的特点:
  - CHARLS 是一个纵向研究，对同一组受访者在多个时间点（波次）进行随访
  - 通过多波数据，可以分析变量的动态变化（如健康状况、经济状况）以及这些变化与结局（如疾病发生）的关系
  - 例如，研究 TyG-WHtR 的变化与 CVD 风险的关系时，CHARLS 的多波数据可以很好地支持这种动态分析

**横断面研究的角度**
- 定义: 横断面研究是在某一特定时间点对研究对象进行观察，分析暴露因素与结局的关系
- CHARLS 的特点:
  - 每一波数据（如 Wave 1、Wave 2 等）都可以被视为一个独立的横断面数据集
  - 如果只分析某一波的数据（如 Wave 1 的健康状况与经济状况的关系），那么这实际上是一个横断面研究

| 标题 | 翻译标题 | 自变量 | 因变量 | link | dataset | score |
| :-: | :-----: | :---: | :---: | :--: | :-----: | :---: |
| Association between triglyceride glucose body mass index and cardiovascular disease in adults: evidence from NHANES 2011-2020 | 甘油三酯葡萄糖体重指数与成人心血管疾病的关系：来自 NHANES 2011-2020 的证据 | TyG-bmi | CVD | | NHANES | 3.9/Q2 |
| Association between the cumulative average triglyceride glucose-body mass index and cardiovascular disease incidence among the middle-aged and older population: a prospective nationwide cohort study in China | 中老年人群积累平均甘油三酯葡萄糖体重指数与心血管疾病发生率的关系：中国前瞻性全国性队列研究 | cumulative TyG-bmi | CVD | | CHARLS | 8.5/Q1 |

```csv
ID,householdID,communityID,hhid,hhidc,pnc,pn,ID_w1,householdID_w1,s1id,s2id,s3id,s4id,s1pn,s2pn,s3pn,s4pn,raspid1,raspid2,h1coupid,h2coupid,h3coupid,h4coupid,inw1,inw2,inw3,inw4,r1iwstat,r2iwstat,r3iwstat,r4iwstat,s1iwstat,s2iwstat,s3iwstat,s4iwstat,hacohort_c,r1wthh,r2wthh,r3wthh,r4wthh,r2wthhl,r1wthha,r2wthha,r3wthha,r4wthha,r1wtresp,r2wtresp,r3wtresp,r4wtresp,s1wtresp,s2wtresp,s3wtresp,s4wtresp,r2wtrespl,s2wtrespl,r1wtrespa,r2wtrespa,r3wtrespa,s1wtrespa,s2wtrespa,s3wtrespa,r1wtrespb,r2wtrespb,r3wtrespb,r4wtrespb,s1wtrespb,s2wtrespb,s3wtrespb,s4wtrespb,r1wtrespbioa,s1wtrespbioa,r1wtrespbiob,r2wtrespbiob,r3wtrespbiob,s1wtrespbiob,s2wtrespbiob,s3wtrespbiob,h1hhresp,h2hhresp,h3hhresp,h4hhresp,h1cpl,h2cpl,h3cpl,h4cpl,r1famr,r2famr,r3famr,r4famr,s1famr,s2famr,s3famr,s4famr,h1anyfam,h2anyfam,h3anyfam,h4anyfam,r1iwy,r2iwy,r3iwy,r4iwy,s1iwy,s2iwy,s3iwy,s4iwy,r1iwm,r2iwm,r3iwm,r4iwm,s1iwm,s2iwm,s3iwm,s4iwm,rabday,s1bday,s2bday,s3bday,s4bday,rafbday,s1fbday,s2fbday,s3fbday,s4fbday,rabmonth,s1bmonth,s2bmonth,s3bmonth,s4bmonth,rafbmonth,s1fbmonth,s2fbmonth,s3fbmonth,s4fbmonth,rabyear,s1byear,s2byear,s3byear,s4byear,rafbyear,s1fbyear,s2fbyear,s3fbyear,s4fbyear,rafbdate,s1fbdate,s2fbdate,s3fbdate,s4fbdate,raidbyear,s1idbyear,s2idbyear,s3idbyear,s4idbyear,raidbmonth,s1idbmonth,s2idbmonth,s3idbmonth,s4idbmonth,raidbday,s1idbday,s2idbday,s3idbday,s4idbday,rafidbdate,s1fidbdate,s2fidbdate,s3fidbdate,s4fidbdate,radyear,s1dyear,radmonth,s1dmonth,r1agey,r2agey,r3agey,r4agey,s1agey,s2agey,s3agey,s4agey,ragender,s1gender,s2gender,s3gender,s4gender,rafgendr,s2fgendr,s3fgendr,s4fgendr,raeduc_c,s1educ_c,s2educ_c,s3educ_c,s4educ_c,raeducl,s1educl,s2educl,s3educl,s4educl,r1mstat,r2mstat,r3mstat,r4mstat,s1mstat,s2mstat,s3mstat,s4mstat,r1mstath,r2mstath,r3mstath,r4mstath,s1mstath,s2mstath,s3mstath,s4mstath,r1mnev,r2mnev,r3mnev,r4mnev,s1mnev,s2mnev,s3mnev,s4mnev,r1mrct,r2mrct,s1mrct,s2mrct,r1mcurln,r2mcurln,s1mcurln,s2mcurln,rabplace_c,s1bplace_c,s2bplace_c,s3bplace_c,s4bplace_c,r1hukou,r2hukou... (line truncated to 2000 chars)
```

些数据集通常都有 Harmonized Data（标准化数据）。Harmonized Data 是对原始数据进行标准化和一致化处理后的数据集，目的是方便跨国家或跨地区的比较研究。这种数据处理方式特别适用于像你提到的这些关于老龄化、健康和退休的纵向调查数据

Harmonized Data 是通过对不同数据集的变量进行标准化处理后生成的统一数据集。它的主要特点包括：
1. 变量一致性
2. 跨数据集的可比性
3. 便于分析
#### Gateway to Global Aging Data
官网地址：https://g2aging.org/

Gateway to Global Aging Data 是由 加州大学洛杉矶分校（UCLA） 提供的一个平台，专注于全球老龄化相关数据的整合和标准化。它为多个国家的老龄化研究数据（如 CHARLS、HRS、ELSA 等）提供了 Harmonized Data，以便研究者进行跨国家和跨地区的比较研究

#### Preface 前言
The China Health and Retirement Longitudinal Study (CHARLS) is a longitudinal study of
individuals over age 45 in China. It was designed to better understand the socioeconomic
determinants and consequences of aging. The survey includes a rich set of questions
regarding economic standing, physical and psychological health, demographics, and social
networks of aged persons. The survey is designed to ensure comparability with the Health and
Retirement Survey (HRS) in the United States and related aging surveys, such as the English
Longitudinal Study of Aging (ELSA) in England and the Survey of Health, Aging and Retirement
in Europe (SHARE) in Europe and Israel. Part of the reason for the close connection is to allow
cross-country comparisons using these data.
> [!NOTE]- 翻译
> 中国健康与退休纵向研究 (CHARLS) 是一项针对中国 45 岁以上人群的纵向研究。其目的是更好地了解老龄化的社会经济决定因素和后果。调查包括有关经济状况、身体和心理健康、人口统计学和老年人社会网络的一系列丰富问题。该调查旨在确保与美国健康与退休调查 (HRS) 以及相关的老龄化调查（例如英国的老龄化纵向研究 (ELSA) 和欧洲及以色列的健康、老龄化和退休调查 (SHARE)）之间的可比性。密切联系的部分原因是允许使用这些数据进行跨国比较。

In order to make the data more accessible to researchers and to facilitate such comparisons,
we the USC Gateway to Global Aging Data team, created the Harmonized CHARLS, a user-
friendly version of a subset of the CHARLS interviews. The Harmonized CHARLS initiative is
part of a larger set of projects. With funding and support from the National Institute on Aging,
we have also created Harmonized HRS (USA), Harmonized MHAS (Mexico), Harmonized ELSA
(England), Harmonized SHARE (Europe and Israel), Harmonized CRELES (Costa Rica),
Harmonized KLoSA (South Korea), Harmonized JSTAR (Japan), Harmonized TILDA (Ireland),
Harmonized LASI (India), and Harmonized MARS (Malaysia). Further information about these
Harmonized data files with questionnaires and other searchable metadata is available on our
website, https://g2aging.org/.
> [!NOTE]- 翻译
> 为了使数据更易于研究人员访问并促进此类比较，我们 USC 全球老龄化数据门户网站团队创建了 Harmonized CHARLS，这是 CHARLS 访谈子集的用户友好版本。Harmonized CHARLS 计划是更大项目集的一部分。在国家老龄化研究所的资助和支持下，我们还创建了 Harmonized HRS（美国）、Harmonized MHAS（墨西哥）、Harmonized ELSA（英国）、Harmonized SHARE（欧洲和以色列）、Harmonized CRELES（哥斯达黎加）、Harmonized KLoSA（韩国）、Harmonized JSTAR（日本）、Harmonized TILDA（爱尔兰）、Harmonized LASI（印度）和 Harmonized MARS（马来西亚）。有关这些 Harmonized 数据文件及其问卷和其他可搜索元数据的更多信息，请访问我们的网站 https://g2aging.org/。

In creating the Harmonized data files, we have followed the RAND HRS and Harmonized HRS
conventions of variable naming and data structure. The RAND HRS is a user-friendly version of
a subset of the HRS that the RAND Center for the Study of Aging created to increase usability.
The Harmonized HRS is a supplementary dataset to the RAND HRS, which also include a
subset of the HRS data, that the Gateway to Global Aging Data team has created to increase
usability of a greater number of HRS variables. The Harmonized CHARLS includes variables
with a similar naming convention that mimics the RAND HRS, Harmonized HRS, and other
Harmonized variables. This document describes these data.
> [!NOTE]- 翻译
> 在创建 Harmonized 数据文件时，我们遵循了 RAND HRS 和 Harmonized HRS 变量命名和数据结构的约定。RAND HRS 是 RAND 老龄化研究中心创建的 HRS 子集的用户友好版本，以提高可用性。Harmonized HRS 是 RAND HRS 的补充数据集，其中还包括一部分 HRS 数据，全球老龄化数据门户网站团队创建了该数据集，以提高更多 HRS 变量的可用性。Harmonized CHARLS 包括具有类似命名约定的变量，模仿 RAND HRS、Harmonized HRS 和其他 Harmonized 变量。本文档描述了这些数据。

We are grateful for the continuing support of and funding from NIA. In working with the
CHARLS data, we greatly benefited from the help from Dr. Yaohui Zhao, Dr. Yafeng Wang, Dr.
John Strauss, Dr. Albert Park and the CHARLS team members. We have greatly benefited
from discussions with and the suggestions from our colleagues Arie Kapteyn, Marco
Angrisani, Erik Meijer, and Bas Weerman. We would also like to acknowledge our current
and former colleagues at the Gateway to Global Aging Data: Sidney Beaumaster, Sandy
Chien, Samuel Lau, and Ashley Lin.
> [!NOTE]- 翻译
> 我们感谢 NIA 的持续支持和资助。在使用 CHARLS 数据时，我们非常感谢赵耀辉博士、王亚峰博士、约翰·斯特劳斯博士、阿尔伯特·帕克博士和 CHARLS 团队成员的帮助。我们从与我们的同事 Arie Kapteyn、Marco Angrisani、Erik Meijer 和 Bas Weerman 的讨论和建议中受益匪浅。我们还要感谢全球老龄化数据门户网站的现任和前任同事：Sidney Beaumaster、Sandy Chien、Samuel Lau 和 Ashley Lin。

#### Requested Acknowledgment 要求致谢
We ask all users of the Harmonized CHARLS to please inform our team of any written analysis using data from the Harmonized CHARLS or information from the Harmonized CHARLS Codebook by sending an email to papers@g2aging.org. We also ask users to include the following acknowledgement in their written work:
> [!NOTE]- 翻译
> 我们要求所有 使用 《Harmonized CHARLS》 的用户, 请通过发送邮件至 papers@g2aging.org 的方式告知我们的团队任何使用 《Harmonized CHARLS》 数据或《Harmonized CHARLS Codebook》信息的书面分析。我们还要求用户在书面作品中包含以下致谢：

"This analysis uses data or information from the Harmonized CHARLS dataset and Codebook, Version D as of June 2021 developed by the Gateway to Global Aging Data. The development of the Harmonized CHARLS was funded by the National Institute on Aging (R01 AG030153, RC2 AG036619, R03 AG043052). For more information, please refer to https://g2aging.org/."
> [!NOTE]- 翻译
> "本分析使用了全球老龄化数据门户网站开发的截至 2021 年 6 月的 Harmonized CHARLS 数据集和代码手册版本 D 的数据或信息。Harmonized CHARLS 的开发得到了国家老龄化研究所 (R01 AG030153、RC2 AG036619、R03 AG043052) 的资助。有关更多信息，请访问 https://g2aging.org/。"

#### CHARLS Version and Acknowledgment CHARLS 版本和致谢
This document used CHARLS Waves 1 through 4 as of June 2021. CHARLS is supported by Peking University, the National Natural Science Foundation of China, the National Institute on Aging, and the World Bank.
> [!NOTE]- 翻译
> 本文档使用了截至 2021 年 6 月的 CHARLS 第 1 至第 4 波数据。CHARLS 得到了北京大学、中国国家自然科学基金、美国国家老龄化研究所和世界银行的支持。
#### Contents
- PREFACE ........... 1
- REQUESTED ACKNOWLEDGMENT ............ 2
- CHARLS VERSION AND ACKNOWLEDGMENT .... 2
- WHAT'S NEW IN VERSION D OF THE HARMONIZED CHARLS? ................. 5
1. INTRODUCTION AND OVERVIEW ... 9
    - 1.1. Gateway to Global Aging Data ...................10
    - 1.2. Unit of Observation ...........11
    - 1.3. Data File Structure ............11
    - 1.4. Variable Naming Convention .....................11
    - 1.5. Missing Values, Nonresponse, and Imputations .....13
    - 1.6. Weighting and Accounting for Survey Design .................13
    - 1.7. Availability of Stress Measures ..................14
2. WEALTH AND INCOME VARIABLES .................... 15
    - 2.1 Units of Observation and financial respondent......15
    - 2.2. Currency ..................16
3. STRUCTURE OF CODEBOOK ..... 17
4. DISTRIBUTION AND TECHNICAL NOTES ............ 21
5. DATA CODEBOOK ... 22
- SECTION A: DEMOGRAPHICS AND IDENTIFIERS ... 23
- SECTION B: HEALTH .... 76
- SECTION C: HEALTH CARE UTILIZATION AND INSURANCE ..... 173
- SECTION D: COGNITION ............... 203
- SECTION E: FINANCIAL AND HOUSING WEALTH ... 223
- SECTION F: INCOME AND CONSUMPTION ........... 290
- SECTION G: FAMILY STRUCTURE ......................... 383
- SECTION H: EMPLOYMENT HISTORY ................... 496
- SECTION I: RETIREMENT .............. 538
- SECTION J: PENSION .................... 556

#### What's New in Version D of the Harmonized CHARLS?
Version D incorporates the latest released version of CHARLS data, and adds variables for Wave 4. It contains 25,586 observations or rows. It is a Respondent-level file so each row represents a unique Respondent. It also adds new variables and makes adjustments and corrections.
> [!NOTE]- 翻译
> 版本 D 包含 CHARLS 数据的最新发布版本，并添加了第 4 波的变量。它包含 25,586 个观察值或行。它是一个受访者级别的文件，因此每一行代表一个唯一的受访者。它还添加了新变量并进行了调整和更正。
  
We have added the following new sections to the file:
> [!NOTE]- 翻译
> 我们在文件中添加了以下新部分：

**Physical Measures:**
> [!NOTE]- 翻译
> 身体测量

- We created the Physical Measures section, which contains variables pertaining to timed walk measurements, blood pressure measurements, hand grip strength measurements, height and weight measurements, waist measurements, lung function measurements, balance tests, and chair stand tests.
> [!NOTE]- 翻译
> 我们创建了身体测量部分，其中包含与计时步态测量、血压测量、握力测量、身高和体重测量、腰围测量、肺功能测量、平衡测试和椅子站立测试相关的变量。

**Assistance and Caregiving:**
- We created the Assistance and Caregiving section, which contains variables pertaining to receiving any care for individual ADLS, using assistive devices for ADLS, receiving any care for individual IADLS, future ADL needs, receiving any care for ADLs or IADLs, receiving any informal care, receiving informal care from spouse, receiving informal care from children or grandchildren, receiving informal care from non-relatives, receiving any formal care, receiving formal care from paid professionals, receiving formal care from unpaid professionals, paid help, providing care for parents and grandchildren (previously in Family Structure section), and providing informal care to sick or disabled persons.
> [!NOTE]- 翻译
> 我们创建了协助和护理部分，其中包含与接受个人 ADLS 护理、使用 ADLS 辅助设备、接受个人 IADLS 护理、未来 ADL 需求、接受 ADLs 或 IADLs 护理、接受任何非正式护理、接受配偶的非正式护理、接受来自子女或孙子女的非正式护理、接受来自非亲属的非正式护理、接受任何正式护理、接受来自付费专业人员的正式护理、接受来自非付费专业人员的正式护理、付费帮助、为父母和孙子女提供护理（以前在家庭结构部分）以及为生病或残疾人士提供非正式护理相关的变量。

**Stress:**
- We created the Stress section, which contains variables pertaining to
childhood/lifetime stressful events and self-rated childhood health and finances.
> [!NOTE]- 翻译
> 我们创建了压力部分，其中包含与童年/终生压力事件和自我评估的童年健康和财务相关的变量。

**Psychosocial:**
- We created the Psychosocial section, which contains variables pertaining to depressive symptoms using CES-D (previously in the Health section) and single life satisfaction question. This work was done in collaboration with Jacqui Smith and Lindsay Ryan of the University of Michigan.
> [!NOTE]- 翻译
> 我们创建了心理社会部分，其中包含与使用 CES-D 的抑郁症状（以前在健康部分）和单一生活满意度问题相关的变量。这项工作是与密歇根大学的 Jacqui Smith 和 Lindsay Ryan 合作完成的。

We have added the following variables to the file:

**Demographics and Identifiers:**
- We added HACOHORT_C, which is the cohort in which the household was
originally sampled.
- We added **RAFBYEAR**, **RAFBMONTH**, and **RAFBDAY**, indicating the wave at which the respondent reported the values used in **RABYEAR**, **RABMONTH**, and **RABDAY**, respectively.
- We added **RwNHMLIV** for all available waves, indicating whether the respondent lives in an institution.
- We added RwRXHIBP, RwRXHIBP_C, RwRXDIABI, RwRXDIAB, RwRXDIAB_C,
RwCNCRMEDS, RwCNCRMEDS_C, RwCNCRCHEM, RwCNCRSURG,
RwCNCRRADN, RwRXLUNG, RwRXLUNG_C, RwRXHEART, RwRXHEART_C,
RwRXSTROK, RwRXSTROK_C, RwTRPSYCH, RwRXARTHR, RwRXARTHR_C,
RwRXDYSLIP, RwRXDYSLIP_C, RwRXLIVER, RwRXLIVER_C, RwRXKIDNEY,
RwRXKIDNEY_C, RwRXDIGEST, RwRXDIGEST_C, RwRXMEMRY, and
RwRXMEMRY_C for all available waves, indicating whether and how the
respondent was treated for high blood pressure, diabetes, cancer, lung
condition, heart problems, stroke, psychiatric condition, arthritis, dyslipidemia,
liver disease, kidney disease, digestive disease, and memory problems.
- We added RwDRINKR_C at all available waves, indicating the highest range of the number of drinks per day that the respondent reports for any one of three types of alcohol (liquor, beer, or wine).
- We added RwDRINKNR at all available waves, indicating whether the respondent has ever taken a drink first thing in the morning to steady nerves or get rig of a hangover.
> [!NOTE]- 翻译
> **人口统计资料和标识符:**
> - 我们添加了 HACOHORT_C，它是最初抽样的家庭所在的队列。
> - 我们添加了 **RAFBYEAR**、**RAFBMONTH** 和 **RAFBDAY**，分别表示受访者报告用于 **RABYEAR**、**RABMONTH** 和 **RABDAY** 的值的波次。
> - 我们为所有可用波次添加了 **RwNHMLIV**，表示受访者是否住在机构中。
> - 我们添加了 RwRXHIBP、RwRXHIBP_C、RwRXDIABI、RwRXDIAB、RwRXDIAB_C、RwCNCRMEDS、RwCNCRMEDS_C、RwCNCRCHEM、RwCNCRSURG、RwCNCRRADN、RwRXLUNG、RwRXLUNG_C、RwRXHEART、RwRXHEART_C、RwRXSTROK、RwRXSTROK_C、RwTRPSYCH、RwRXARTHR、RwRXARTHR_C、RwRXDYSLIP、RwRXDYSLIP_C、RwRXLIVER、RwRXLIVER_C、RwRXKIDNEY、RwRXKIDNEY_C、RwRXDIGEST 和 RwRXDIGEST_C，表示受访者是否以及如何治疗高血压、糖尿病、癌症、肺部疾病、心脏病、中风、精神病状况、关节炎、高脂血症、肝病、肾病和消化系统疾病。
> - 我们添加了 RwRXMEMRY 和 RwRXMEMRY_C，表示受访者是否以及如何治疗记忆问题。
> - 我们为所有可用波次添加了 RwDRINKR_C，表示受访者报告的三种类型的酒精（烈酒、啤酒或葡萄酒）中任何一种的每日饮酒数量的最高范围。
> - 我们添加了 RwDRINKNR，表示受访者是否曾经在早上第一件事喝酒以稳定神经或摆脱宿醉。

**Financial and Housing Wealth:**
- We added HwABORR at all available waves, indicating the total amount of
personal loans owed to others by the respondent and spouse.
> [!NOTE]- 翻译
> **金融和住房财富:**
> - 我们在所有可用波添加了 HwABORR，表示受访者和配偶欠他人的个人贷款总额。

**Family Structure:**
- We added RAMOMEDUCL and RADADEDUCL, indicating the highest level of
education completed by the respondent's mother and father. These variables
use a harmonized scale that is a simplified version of the 1997 International
Standard Classification of Education (ISCED) codes.
- We added RAMOMOCCUP_C and RADADOCCUP_C, indicating the occupation of
the respondent's mother and father before the respondent was age 17.
> [!NOTE]- 翻译
> **家庭结构:**
> - 我们添加了 RAMOMEDUCL 和 RADADEDUCL，表示受访者母亲和父亲完成的最高教育水平。这些变量使用的是一个协调的量表，这是 1997 年国际教育分类标准 (ISCED) 代码的简化版本。
> - 我们添加了 RAMOMOCCUP_C 和 RADADOCCUP_C，表示受访者 17 岁之前母亲和父亲的职业。

**Employment History:**
- We added RwJHOURTOT at all available waves, indicating the total number of
hours the respondent works per week on their main job and other jobs.
- We added RwJGOVTEMP at all available waves, indicating whether the
respondent is employed by the government.
- We added RwJSALARY_C at all available waves, indicating whether the
respondent is paid salary or wages in their current job.
- We added RwJBONUS at all available waves, indicating the amount of bonuses
the respondent received in the past year.
- We added RwJMSICK at all available waves, indicating whether the respondent
missed work in the past year due to health problems.
- We added RwJNSICKAGR, RwJNSICKEMP, and RwJNSICKSF at all available
waves, indicating the number of days of agricultural work, employed work, and
self-employed work the respondent missed in the past year due to health
problems.
- We added RwJBGYR and RwJBGMO at all available waves, indicating the year
and month the respondent began their current job.
- We added RwJRSLEFT and RwJRSLEFT_C at all available waves, indicating the
reason the respondent left their last employer, if they are currently not working.
> [!NOTE]- 翻译
> **就业历史:**
> - 我们在所有可用波次添加了 RwJHOURTOT，表示受访者每周在主要工作和其他工作上工作的总小时数。
> - 我们在所有可用波次添加了 RwJGOVTEMP，表示受访者是否受雇于政府。
> - 我们在所有可用波次添加了 RwJSALARY_C，表示受访者在当前工作中是否领取薪水或工资。
> - 我们在所有可用波次添加了 RwJBONUS，表示受访者在过去一年中获得的奖金金额。
> - 我们在所有可用波次添加了 RwJMSICK，表示受访者在过去一年中因健康问题缺勤。
> - 我们在所有可用波次添加了 RwJNSICKAGR、RwJNSICKEMP 和 RwJNSICKSF，表示受访者因健康问题在过去一年中缺勤的农业工作、雇佣工作和自雇工作的天数。
> - 我们在所有可用波次添加了 RwJBGYR 和 RwJBGMO，表示受访者开始当前工作的年份和月份。
> - 我们在所有可用波次添加了 RwJRSLEFT 和 RwJRSLEFT_C，表示受访者离开上一个雇主的原因（如果他们目前没有工作）。

**Retirement:**
- We added RwFRETF_C at all available waves, indicating whether the
respondent's previous report that they completed retirement or receding
position procedures is disputed at the current interview or a later interview.
- We added RwWKAFTRET at all available waves, indicating whether the
respondent worked after they completed the retirement process.
- We added RwRETRS_C at all available waves, indicating the respondent's main
reason for processing early or internal retirement.
> [!NOTE]- 翻译
> **退休:**
> - 我们在所有可用波次添加了 RwFRETF_C，表示受访者之前报告的完成退休或退位程序在当前访谈或后续访谈中是否存在争议。
> - 我们在所有可用波次添加了 RwWKAFTRET，表示受访者在完成退休程序后是否工作。

We have made the following adjustments, improvements, and corrections to the data and
>  [!NOTE]- 翻译
> 我们对数据和文档进行了以下调整、改进和更正：

documentation:

**All Sections:**
- In version C of the Harmonized CHARLS, we had named the 2015 wave of
CHARLS Wave 4, coinciding with that wave's naming in the CHARLS
documentation. Since CHARLS now refers to the 2015 wave as Wave 3 of
CHARLS, we have renamed all variables for this wave to pertain to Wave 3, and
now refer to the 2018 wave as Wave 4.
> [!NOTE]- 翻译
> **所有部分:**
> 在 Harmonized CHARLS 的版本 C 中，我们将 2015 年的 CHARLS 第 4 波命名为与该波在 CHARLS 文档中的命名相一致。由于 CHARLS 现在将 2015 年的波称为 CHARLS 的第 3 波，我们已将该波的所有变量重命名为与第 3 波相关，并且现在将第 2018 波称为第 4 波。

**Demographics and Identifiers:**
- We renamed HHID_W1 to HOUSEHOLDID_W1, indicating the 9-character
household identifier at Wave 1.
- We adjusted RABYEAR, RABMONTH, and RABDAY so that Chinese lunar
calendar birth dates are converted to solar (Gregorian) calendar birth dates. This
change impacts the value of RwAGEY.
- We adjusted RADYEAR and RADMONTH so that Chinese lunar calendar death
dates are converted to solar (Gregorian) calendar death dates.
> [!NOTE]- 翻译
> **人口统计资料和标识符:**
> - 我们将 HHID_W1 重命名为 HOUSEHOLDID_W1，表示第 1 波的 9 位字符家庭标识符。
> - 我们调整了 RABYEAR、RABMONTH 和 RABDAY，以便将农历出生日期转换为阳历（公历）出生日期。此更改会影响 RwAGEY 的值。
> - 我们调整了 RADYEAR 和 RADMONTH，以便将农历死亡日期转换为阳历（公历）死亡日期。

**Health:**
- We moved RwBMI, RwHEIGHT, and RwWEIGHT, indicating the respondent's
body mass index, height in meters, and weight in kilograms, respectively, to the
new Physical Measures section. Also, we renamed RwBMI to RwMBMI,
RwHEIGHT to RwMHEIGHT, and RwWEIGHT to RwMWEIGHT to identify that
these values were derived from measurements conducted by CHARLS as
opposed to self-reported values.
- We renamed RwDRINK to RwDRINKEV to align better with ever drinking
variables in other Harmonized dataets.
> [!NOTE]- 翻译
> **健康:**
> - 我们将 RwBMI、RwHEIGHT 和 RwWEIGHT 移动到新的身体测量部分，分别表示受访者的身体质量指数、以米为单位的身高和以千克为单位的体重。此外，我们将 RwBMI 重命名为 RwMBMI，将 RwHEIGHT 重命名为 RwMHEIGHT，将 RwWEIGHT 重命名为 RwMWEIGHT，以识别这些值是由 CHARLS 进行测量得出的，而不是自我报告的值。
> - 我们将 RwDRINK 重命名为 RwDRINKEV，以更好地与其他 Harmonized 数据集中的饮酒变量对齐。

**Health Care Utilization and Insurance:**
- We renamed RwORDOC1M to RwTRDMED1M, indicating whether the
respondent visit a Chinese medicine hospital in the past month.
- We renamed RwORDTIM1M to RwTRDMED1M, indicating the number of times
the respondent visited a Chinese medicine hospital in the past month.
> [!NOTE]- 翻译
> **医疗保健利用和保险:**
> - 我们将 RwORDOC1M 重命名为 RwTRDMED1M，表示受访者在过去一个月是否去过中医医院。
> - 我们将 RwORDTIM1M 重命名为 RwTRDMED1M，表示受访者在过去一个月内去中医医院的次数。

**Financial and Housing Wealth:**
- We updated the values of CyyyyCPINDEX based on updated values from the
OECD. We continue to use 2010 as the base year.
> [!NOTE]- 翻译
> **金融和住房财富:**
> - 我们根据 OECD 的最新值更新了 CyyyyCPINDEX 的值。我们继续使用 2010 年作为基年。

**Family Structure:**
- We renamed HwPCNTF to HwPCNT, indicating whether the respondent and
spouse had any weekly contact with parents/parents-lin-law in person, to avoid
confusion with non-comparable HwPCNTF variables in other Harmonized
datasets.
- We moved HwGRCARE and HwGKCARE, indicating whether the respondent gave
care to parents/parents-in-law and grandchildren, respectively, to the new
Assistance and Caregiving section. Also, we renamed HwGRCARE to HwGPCARE.
- Financial support to and from others at Wave 3, H3FOAMT, H3FOANY,
H3TOAMT, and H3TOANY (previously named H4FOAMT, H4FOANY, H4TOAMT,
and H4TOANY), were adjusted to also include support to and from siblings.
> [!NOTE]- 翻译
> **家庭结构:**
> - 我们将 HwPCNTF 重命名为 HwPCNT，表示受访者和配偶是否与父母/岳父母有任何面对面的每周联系，以避免与其他 Harmonized 数据集中不可比较的 HwPCNTF 变量混淆。
> - 我们将 HwGRCARE 和 HwGKCARE 移动到新的协助和护理部分，分别表示受访者是否照顾父母/岳父母和孙子女。此外，我们将 HwGRCARE 重命名为 HwGPCARE。
> - 第 3 波对他人提供和接受的经济支持 H3FOAMT、H3FOANY、H3TOAMT 和 H3TOANY（以前命名为 H4FOAMT、H4FOANY、H4TOAMT 和 H4TOANY）进行了调整，以包括对兄弟姐妹的支持。

**Employment History:**
- We adjusted RwLBRF_C at all waves, indicating the respondent's labor force
status, to include both an agricultural employed work and an agricultural self-
employed work category instead of one general agricultural work category.
> [!NOTE]- 翻译
> **就业历史:**
> - 我们在所有波次调整了 RwLBRF_C，表示受访者的劳动参与状态，以包括农业雇佣工作和农业自雇工作类别，而不是一个一般的农业工作类别。

**Retirement:**
- We removed RwRPLYNR, indicating the year when the respondent plans to stop
working.
> [!NOTE]- 翻译
> **退休:**
> - 我们删除了 RwRPLYNR，表示受访者计划停止工作的年份。

#### Introduction and Overview (介绍和概述)
This report documents the Harmonized CHARLS data files, a streamlined collection of
variables derived from the China Health and Retirement Longitudinal Study (CHARLS).
CHARLS is a panel survey of people aged 45 and over and their partners regardless of age in
China. The main goal is to provide a high quality nationally representative sample of
Chinese residents' data to serve the needs of scientific research on health, economic
position, and quality of life as people age. The survey elicits information about
demographics, income, assets, health, cognition, family structure and connections, health
care use and costs, housing, job status and history, expectations, biomarkers, and insurance.
> [!NOTE]- 翻译
> 本报告记录了 Harmonized CHARLS 数据文件，这是从中国健康与退休纵向研究 (CHARLS) 派生的变量的精简集合。CHARLS 是一项针对 45 岁及以上人群及其伴侣（无论年龄）的面板调查。主要目标是提供高质量的全国代表性样本，以满足科学研究对健康、经济状况和生活质量的需求。调查收集有关人口统计、收入、资产、健康、认知、家庭结构和联系、医疗保健使用和成本、住房、工作状态和历史、预期、生物标志物和保险的信息。

CHARLS is supported by Peking University, the National Natural Science Foundation of
China, the Behavioral and Social Research Division of the National Institute on Aging, and
the World Bank. CHARLS shares the same basic guidelines as the Health and Retirement
Study (HRS) and related aging surveys, (such as the English Longitudinal Study of Aging (ELSA) in England) and the Survey of Health, Aging and Retirement in Europe (SHARE) in
Europe and Israel.
> [!NOTE]- 翻译
> CHARLS 得到了北京大学、中国国家自然科学基金、中国国家老龄化研究所行为与社会研究部和世界银行的支持。CHARLS 与健康与退休研究 (HRS) 和相关的老龄化调查（例如，英国的老龄化纵向研究 (ELSA) 和欧洲和以色列的健康、老龄化和退休调查 (SHARE)）具有相同的基本准则。

The first wave of CHARLS was conducted between June 2011 and March 2012. The sample
population was selected as part of a stratified, multistage probability design. The first
component of this sampling framework was the probability proportion to size (PPS)
sampling of all county-level unit except for Tibet after stratifying by region, characteristic of
the county (urban or rural), and per-capita gross domestic product (GDP). Households were
selected within PSUs using a CHARLS-designed mapping/listing software (CHARLS-GIS) that
uses Google Earth images to list all dwelling units in all residential buildings to create
sampling frames. If the sampled household had occupants older than 40, one of them was
randomly selected. If the selected person was aged 45 or older, they became a respondent.
If the selected person was between age 40 and 44, they were reserved as a refreshment
sample. This initial sample included 17,708 respondents in 10,257 households in 450
villages/urban communities in 150 counties/districts in 28 provinces. The second wave was
conducted between July 2013 and January 2014 and included a refreshment sample
consisting of individuals aged between 43 and 44 at Wave 1 and their partners. The third
wave was conducted between July 2015 and January 2016 and included a refreshment
sample consisting of individuals aged between 41 and 42 at Wave 1 and their partners. The
fourth wave was conducted between July and November 2018 and included a refreshment
sample consisting of individuals who were 40-years-old at Wave 1 and their partners.
> [!NOTE]- 翻译
> CHARLS 的第一波调查于 2011 年 6 月至 2012 年 3 月进行。样本人口是分层的多阶段概率设计的一部分。该抽样框架的第一个组成部分是在按地区、县的特征（城市或农村）和人均国内生产总值 (GDP) 分层后，对除西藏以外的所有县级单位进行按规模概率比例 (PPS) 抽样。使用 CHARLS 设计的映射/列表软件 (CHARLS-GIS) 在 PSU 内选择家庭，该软件使用 Google 地球图像列出所有住宅建筑中的所有居住单元以创建抽样框架。如果抽样家庭中有 40 岁以上的居民，则随机选择其中一人。如果选定的人年龄在 45 岁或以上，则他们成为受访者。如果选定的人年龄在 40 岁到 44 岁之间，则他们被保留为补充样本。该初始样本包括来自 28 个省份的 150 个县/区的 10,257 个家庭中的 17,708 名受访者。第二波调查于 2013 年 7 月至 2014 年 1 月进行，并包括由第 1 波中年龄在 43 岁和 44 岁之间的个人及其伴侣组成的补充样本。第三波调查于 2015 年 7 月至 2016 年 1 月进行，并包括由第 1 波中年龄在 41 岁和 42 岁之间的个人及其伴侣组成的补充样本。第四波调查于2018年7月至11月进行，包括由第1波中40岁的人及其伴侣组成的补充样本。

The data include any individual interviewed at least once. This includes respondents and
current and former spouses regardless of age.
> [!NOTE]- 翻译
> 数据包括至少接受过一次采访的任何个人。这包括受访者和当前和前配偶（无论年龄）。

The Harmonized CHARLS data file incorporates the demographic background data, family
information data, family transfer data, health care and insurance data, health status and
function data, household income data, household roster data, housing characteristics data,
individual income data, weight data, and work, retirement and pension data. It does not
include any data which is not for public release.
> [!NOTE]- 翻译
> Harmonized CHARLS 数据文件包含人口统计背景数据、家庭信息数据、家庭转移数据、医疗保健和保险数据、健康状况和功能数据、家庭收入数据、家庭名册数据、住房特征数据、个人收入数据、权重数据以及工作、退休和养老金数据。它不包括任何不公开发布的数据。
##### Gateway to Global Aging Data
The Health and Retirement Study (HRS) has achieved remarkable scientific success, as
demonstrated by an impressive number of users, research studies, and publications using it. Its
success has generated substantial interest in collecting similar data as population aging has
progressed in every region of the world.
> [!NOTE]- 翻译
> 健康与退休研究 (HRS) 取得了显著的科学成功，这一点通过大量用户、研究和使用它的出版物得到了证明。随着世界各地人口老龄化的加剧，它的成功引起了人们对收集类似数据的极大兴趣。

The result has been a number of surveys designed to be comparable with the HRS: the Mexican
Health & Aging Survey (MHAS), the English Longitudinal Study of Ageing (ELSA), the Survey of
Health, Ageing and Retirement in Europe (SHARE), the Korean Longitudinal Study of Aging
(KLoSA), the Japanese Study on Aging Retirement (JSTAR), the Irish Longitudinal Study on
Ageing (TILDA), the China Health and Retirement Longitudinal Study (CHARLS), Health and
Aging in Africa: A Longitudinal Study of an INDEPTH Community in South Africa (HAALSI), the
Brazilian Longitudinal Study of Ageing (ELSI), Healthy Ageing in Scotland (HAGIS), the Northern
Ireland Cohort Longitudinal Study of Ageing (NICOLA), the Longitudinal Aging Study in India
(LASI), and the Malaysia Ageing and Retirement Survey (MARS). The overview of this family of
surveys, including their research designs, samples, and key domains can be found in Lee,
Phillips, and Wilkens (2019).
> [!NOTE]- 翻译
> 结果是一些旨在与 HRS 可比的调查：墨西哥健康与老龄化调查 (MHAS)、英国老龄化纵向研究 (ELSA)、欧洲健康、老龄化和退休调查 (SHARE)、韩国老龄化纵向研究 (KLoSA)、日本老龄化退休研究 (JSTAR)、爱尔兰老龄化纵向研究 (TILDA)、中国健康与退休纵向研究 (CHARLS)、南非 INDEPTH 社区的健康与非洲老龄化：纵向研究 (HAALSI)、巴西老龄化纵向研究 (ELSI)、苏格兰健康老龄化 (HAGIS)、北爱尔兰队列纵向研究 (NICOLA)、印度老龄化纵向研究 (LASI) 和马来西亚老龄化与退休调查 (MARS)。有关这组调查的概述，包括它们的研究设计、样本和关键领域，请参见 Lee、Phillips 和 Wilkens（2019 年）。

As these surveys were designed with harmonization as a goal, they provide remarkable
opportunities for cross-country studies. The value of comparative analyses, especially the
opportunities they offer for learning lessons resulting from policies adopted elsewhere, is
widely recognized. Yet there are only a limited number of empirical studies exploiting such
opportunities. This is partly due to the difficulty associated with learning multiple surveys and
the policies and institutions of each country.
> [!NOTE]- 翻译
> 由于这些调查的设计目标是协调，因此它们为跨国研究提供了显着的机会。比较分析的价值，尤其是它们为从其他地方采用的政策中吸取教训所提供的机会，得到了广泛认可。然而，利用这些机会的实证研究数量有限。这在一定程度上是由于学习多项调查以及每个国家的政策和制度所带来的困难。

Identifying comparable questions across surveys is the first step toward cross-country analyses.
The Gateway to Global Aging Data (Gateway) helps users understand and use these large-scale
population surveys on health and retirement. The Gateway includes several tools to facilitate
cross-national health and retirement research. It includes a digital library of survey questions
for all participating surveys. Its search engine enables users to find relevant survey questions.
The Gateway also includes a concordance with information comparing measures within and
across surveys over time. Using these tools, researchers can identify all questions related to
particular key words or within a domain. The Gateway also includes population and sub-
population estimates for key harmonized variables and presents them in graphs and tables that
can be downloaded.
> [!NOTE]- 翻译
> 确定调查中可比较的问题是跨国分析的第一步。全球老龄化数据门户 (Gateway) 帮助用户理解和使用这些大规模人口调查数据。该门户包括几个工具来促进跨国健康和退休研究。它包括所有参与调查的调查问题的数字图书馆。其搜索引擎使用户能够找到相关的调查问题。该门户还包括一个一致性表，其中包含有关随时间推移在调查中和调查之间比较措施的信息。使用这些工具，研究人员可以识别与特定关键字或领域相关的所有问题。该门户还包括关键协调变量的人口和子群体估计，并以图形和表格的形式呈现，可以下载。

The Gateway can be accessed at https://g2aging.org/. For more information about using the
Gateway visit the Help page. For more information about obtaining the Harmonized CHARLS or
downloading the Stata file used to create the Harmonized CHARLS using the Gateway see
"Chapter 4.Distribution and Technical Notes."
> [!NOTE]- 翻译
> 可以通过 https://g2aging.org/ 访问 Gateway。有关使用 Gateway 的更多信息，请访问帮助页面。有关获取 Harmonized CHARLS 或下载用于使用 Gateway 创建 Harmonized CHARLS 的 Stata 文件的更多信息，请参阅"第 4 章。分发和技术说明。"
##### Unit of Observation 
Like in the HRS, an age-eligible individual is sampled and then this individual and their spouse or
partner regardless of age is interviewed, but no other household members, even if they are
age-eligible. We distinguish between three units of observation: individual, couple, and
household. A "couple" is a "single individual or individual with his/her spouse. A "household"
includes the single individual, spouse, and all other household members.
> [!NOTE]- 翻译
> 像 HRS 一样，选择一个符合年龄要求的个人进行抽样，然后采访该个人及其配偶或伴侣（无论年龄如何），但不采访其他家庭成员，即使他们符合年龄要求。我们区分三种观察单位：个人、夫妻和家庭。"夫妻"是"单个个人或与其配偶的个人"。"家庭"包括单个个人、配偶和所有其他家庭成员。
##### Data File Structure
The Harmonized CHARLS data contain four waves of CHARLS. The data are stored in a "fat
format" where each observation represents one respondent. The unit of observation is the
individual. Each individual is uniquely identified by the unique identifier "ID". Households are
identified by HHID. Couples are identified by wave-specific HwCOUPID where "w" refers to the
specific wave. Households are identified by the unique identifier "HOUSEHOLDID". It is
important to note that unlike the HRS, households in the CHARLS might include multiple
couples and other household members.
> [!NOTE]- 翻译
> Harmonized CHARLS 数据包含四波 CHARLS。数据以"胖格式"存储，其中每个观察值代表一个受访者。观察单位是个人。每个个体都由唯一标识符"ID"唯一标识。家庭由 HHID 标识。夫妻由特定波次的 HwCOUPID 标识，其中"w"指的是特定波次。家庭由唯一标识符"HOUSEHOLDID"标识。重要的是要注意，与 HRS 不同，CHARLS 中的家庭可能包括多个夫妻和其他家庭成员。
##### Variable Naming Convention
With few exceptions, variable names in the Harmonized CHARLS Data follow a consistent
pattern. The first character indicates whether the variable refers to the reference person ("R"),
spouse ("S"), a financial unit couple ("H"), and the full household ("HH").1 2 The second
character indicates the wave to which the variable pertains: "1", "2", "3", "4", or "A". The "A"
indicates "all," i.e., the variable is not specific to any single wave. An example is RABDATE, the
birth date of the respondent. The remaining characters describe the concept that the variable
captures. For example:
> [!NOTE]- 翻译
> 变量命名约定
> 除少数例外，Harmonized CHARLS 数据中的变量名称遵循一致的模式。第一个字符表示变量是指参考人（"R"）、配偶（"S"）、财务单位夫妻（"H"）还是整个家庭（"HH"）。第二个字符表示变量所涉及的波次："1"、"2"、"3"、"4"或"A"。 "A"表示"全部"，即该变量不特定于任何单一波次。一个例子是 RABDATE，受访者的出生日期。其余字符描述变量捕获的概念。例如：

S1HLTHLM
> S: Spouse <br/>
> 1: Wave 1 (2011) <br/>
> HLTHLM: Health problem limiting work

Variable S1HLTHLM captures whether the spouse of the reference person experiences an
impairment or health problem that limits the kind or amount of paid work he/she can do. The
name of the variable does not indicate who provided the information. For example, the
spouse's health problem may have been reported by the spouse himself or herself, or it may
have been reported by the reference person as a proxy.
> [!NOTE]- 翻译
> 变量 S1HLTHLM 捕获参考人配偶是否经历了限制他/她可以做的有偿工作的种类或数量的损伤或健康问题。变量的名称没有指明谁提供了信息。例如，配偶的健康问题可能是由配偶本人报告的，也可能是由参考人作为代理人报告的。

In the text below, we may refer to variables such as SwHLTHLM for example, without specifying
the wave. This reference points at the group of variables S1HLTHLM, S2 HLTHLM, S3 HLTHLM,
and S4 HLTHLM.
