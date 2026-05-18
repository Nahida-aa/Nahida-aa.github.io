---
title: CHALRS
description: 中国健康与养老追踪调查（CHARLS）数据
lastUpdated: 2025-04-21T18:58:15Z
tags: [dataset]
---

1. 2011年CHARLS Wave 1
2. 2013年CHARLS Wave 2
3. 2015年CHARLS Wave 3
4. 2018年CHARLS Wave 4
5. 2020年CHARLS Wave 5

由问卷调查、体格测量（体检）和血液检测（血检）三大部分构成

- 问卷调查
  - 模块划分：涵盖家户登记、基本信息、健康状况、医疗保健、工作与退休、收入资产等10个模块（见表1）。
  - 核心内容：
    - 个人健康自评、慢性病诊断、健康行为（吸烟、饮酒、体力活动等）。
    - 社会经济状况（收入、资产、医疗保险、家庭结构）。
    - 心理健康（CES-D抑郁量表）、认知能力测试（记忆、计算等）
  - 个人基本信息：包括性别、年龄、受教育程度、婚姻状况、户口类型、工作状态等
  - 健康状况与行为：如自评健康、慢性病患病情况（高血压、糖尿病等）、吸烟、饮酒、睡眠时长、体力活动等
  - 社会经济与家庭支持：家庭收入、消费、资产、医疗保险、养老保险、家庭结构等
  - 心理健康评估：例如抑郁症状的筛查（CESD-10量表）、认知功能测试（如记忆、计算能力）等
- 体格测量（体检）
  - 基础体征：身高、体重、腰围、血压（收缩压和舒张压）、握力、5次起坐时间（评估肌肉功能）等
  - 功能能力评估：如肌肉减少症、衰弱、跌倒风险等老年综合征的物理测试
  - 指标：身高、体重、血压、肺功能、握力、平衡能力等（见表2）。
  - 特殊测试：针对60岁以上人群的步行速度和平衡测试。
- 血液检测（血检）
  - 生化指标：血糖、血脂（总胆固醇(TC)、HDL-C、LDL-C）, 甘油三酯（TG）、C反应蛋白（CRP,炎症标志物）、肌酐, 尿酸（UA）等
  - 数据发布：血检数据单独发布，与主问卷数据通过唯一标识符关联

### 数据集信息

**2011 CHARLS Wave 1**:

| Biomarkers | 描述 | Method | Coefficient of variation/Within-assay | Coefficient of variation/Between-assay | Detection Limit |
| :--------: | :-: | :----: | :---------: | :-------------: |
| hsCRP | High-sensitivity C-reactive protein (高敏 C 反应蛋白) | Immunoturbidimetric assay | $<1.3%$ | $<5.7%$ | 0.1-20mg/L |
| Glycosylated hemoglobin (HbA1c) | 糖化血红蛋白 | Boronate affinity HPLC | 1.90% | 2.10% | 0-40% |
| Total-C | Total cholesterol (总胆固醇) | Enzymatic colorimetric assay | 0.80% | 1.70% | 3-800mg/dL |

**2020 CHARLS Wave 5**:

本次数据发布 (版本号: 20231106) 一共发布了八个主要数据集以及两个辅助数据集  (样本信息以及横截面权重) 。PSU信息与往期数据相同。下表给出了这十个数据集的详细
说明

| 问卷模块 | dataset | description |
| ------- | ------- | ----------- |
| B. 基本信息 | Demographic_Background | 主要受访者及其配偶的基本人口学信息 |
| C. 家庭信息 | Family_Information | 家庭以及家户成员信息 |
| D. 健康状况与功能 | Health_Status_and_Functioning | 健康状态、健康行为以及认知能力 |
| F. 工作与退休 | Work_Retirement | 工作以及退休状况 |
| G1. 家户收入与支出 | Household_Income | 家户收入、支出以及住房情况 |
| G2. 个人收入 | Individual_Income | 个人收入 |  
| V. 疫情 | COVID_Module | 受访者疫情期间的相关信息 |
| EX. 退出问卷 | EXIT_Module | 去世受访者的信息 |
|  | Weights | 横截面权重 |
| | Sample_Infor | 样本信息 |

所有的数据集均以Stata 14格式存储, 用户可以通过随数据发布的"codebook"获取
数据的基本统计描述。

### codebook

2015 波次3, 但是 显示 document/2015-charls-wave4/application/CHARLS_2015_Codebook.pdf, 猜测是完全兼容的

#### Household Roster (家庭成员名单)

| 变量名称 | 变量描述 | 变量类型 |
| :-----: | :----: | :-----: |
|a009_1_ | Current Hukou Status of This Household Member (现居住地户口类型) | 1 Agricultual Hukou(农业户口) 2 Non-Agricultural Hukou(非农业户口) 3 Unified Residence Hukou(城镇居民户口),4 Do not have Hukou |
|a009_2_ : Current Hukou Status of This Household Member (现居住地户口类型) | 1 Agricultual Hukou(农业户口) 2 Non-Agricultural Hukou(非农业户口) 3 Unified Residence Hukou(城镇居民户口),4 Do not have Hukou |

#### Demographic Background (基本信息)
2011:
| 变量名称 | 变量描述 | 变量类型 |
| :-----: | :----: | :-----: |
| ID | 受访者ID | str |
| householdID | 家庭ID | str |
| communityID | 社区ID | str |
| ba001 | Chinese Zodiac (12生肖) | 1-12 |
| ba002_1 | 受访者出生年份 | 1910-1989 | 
| ba002_2 | 受访者出生月份 | 0-12 |
| ba002_3 | 受访者出生日期 | 0-31 |
| ba003 | Calender Type | 1 Solar calendar, 2 Lunar calendar |
| ba004 | age | int |
| ba005 | Return Home Every Week (每周回家) | 1 Yes, 2 No |
| bb001 | Birth Place (出生地) | 1 This Village/Neighborhood, 2 Another Village/Neighborhood in this County/City, 3 Another County/City in this Province, 4 Another Province, 5 Abroad |
| bb001_1 | City (市) | int Category |
| bb001_2 | County (县) | int Category |
| bb001_3 | Province (省) | int Category |
| bb001_4 | City (市) | int Category |
| bb001_5 | County (县) | int Category |
| bb001_6 | Province (省) | int Category |
| bb002   | Type of Birth Place (出生地类型) | 1 Rural Village, 2 Urban Community |
| bb003 | Year | 1930-2011 |
| bb004 | Whether Live in the Same County/City Where You First Move
To (是否在迁入地生活) | 1 Yes, 2 No |
| bb005 | Year | 1900-2011 |
| bb006 | Where did You Mainly Live before 16 (16岁前主要生活地) | 1 City / Town, 2 Village |
| bb007 | Did You Ever Live Outside Your Present County/City for More
Than 6 Months (是否在现居住地外生活超过6个月) | 1 Yes, 2 No |
| bb008_1 | Years | 0-2011 |
| bb008_2 | Months | 0-11 |
| bb009 |  Did You Ever Lived Outside this County/City for More than 6
Months (是否在现居住地外生活超过6个月) | 1 Yes, 2 No |
| bb010_1 | Years | 0-2011 |
| bb010_2 | Months | 0-1987 |
| bb011 | Most Recent Year Lived in This County/City (最近一次在现居住地生活的年份) | 1920-2011 |
| bb012 | Where Did You Live for at Least Six Months before Moving to
the Current County/C (是否在现居住地外生活超过6个月) | 1 Birth Place, 2 Another County/City in this Province, 3 Another Province, 4 Abroad |
| bb012_1 | City (市) | int Category |
| bb012_2 | County (县) | int Category |
| bb012_3 | Province (省) | int Category |
| bb012_4 | City (市) | int Category |
| bb012_5 | County (县) | int Category |
| **bc001**   | What is Your Current Hukou Status (现居住地户口类型) | 1 Agricultual Hukou(农业户口) 2 Non-Agricultural Hukou(非农业户口) 3 Unified Residence Hukou(城镇居民户口) |
| bc002 | What is Your Hukou Status before You Have the Unified Residence Hukou | 1 Agricultual Hukou, 2 Non-agricultural Hukou, 3 Do not have Hukou |
| bc003_1 | Year | 2000-2011 |
| bc003_2 | Month | 0-12 |
| bc004_1 | Year | 1910-2011 |
| bc004_2 | Month | 0-12 |
| bc005   | Where is Your Current Hukou | 1 Same as Birthplace, 2 This Village/Neighborhood, 3 Another Village/Neighborhood in this County/City, 4 Another County/City in this Province, 5 Another Province |
| bc005_1 | City (市) | int Category |
| bc005_2 | County (县) | int Category |
| bc005_3 | Province (省) | int Category |
| bc005_4 | City (市) | int Category |
| bc005_5 | County (县) | int Category |
| bc006_1 | Years | 0-80 |
| bc006_2 | Months | 0-11 |
| bc007 | Is Your First Hukou Same as Your Current Hukou (你的第一个户口和现在的户口一样吗) | 1 Yes, 2 No |
| bc008 | Any other Hukou between Your First and Current Hukou (你的第一个户口和现在的户口之间有其他户口吗) | 1 Yes, 2 No | 
| **bd001** | Highest Level of Education Attained (最高学历)|1 No formal education illiterate(没有受过教育), 2 Did not finish primary school but capable of reading or writing(小学未毕业但能读写), 3 Sishu, 4 Elementary school(小学), 5 Middle school(初中), 6 High school(高中), 7 Vocational school(职业学校), 8 Two/Three Year College / Associate degree(大专), 9 Four Year College / Bachelor degree(本科), 10 Post-graduate, Masters degree(研究生) |
|bd001_w2_4| Have Your Highest Level of Education Changed? (最高学历是否变化) | 1 No Formal Education (Illiterate), |
|bd001_w3_1: Are You Literate? (是否识字) | 1 Yes, 2 No |
| bd002 | Highest Grade Finished in Primary School (小学最高年级) | 1-6 |
|bd002_w3| How Many Years at School after [BD001_ W2_ 4] (在[BD001_W2_4]后上学多少年) | 0-55 |
| bd006: At What Age Did You Finish Schooling (上学多少岁) | 0-68 |
| **be001** | Marital Status (婚姻状况) | 1 Married with spouse present(配偶在身边),2 Married but not living with spouse temporarily for reasons such as work (配偶不在身边),3 Separated (分居),4 Divorced (离婚),5 Widowed (丧偶),6 Never married (从未结过婚) |
| be002 | Are You Unmarried but Living with a Partner (是否同居) | 1 Yes, 2 No |
| bf001 | Spouse/Partner's Chinese Zodiac (配偶生肖) | 1-12 |
| proxy | Proxy Respondent (代理访谈) | 0 No, 1 Yes |
| **rgender** | Gender | 1 Male, 2 Female |

#### Family Information (家庭信息)

#### Health Status and Functioning (健康状况与功能)
| 变量名称 | 变量描述 | 变量类型 |
| :-----: | :----: | :-----: |
| da001  | Self Comment of Your Health (自评健康) | 1 Excellent, 2 Very Good, 3 Good, 4 Fair, 5 Poor |
| da002  | Self Comment of Your Health (自评健康) | 1 Very Good, 2 Good, 3 Fair, 4 Poor, 5 Very Poor |
| da003  | Pain on the Left Side of Your Chest (左胸痛) | 1 Yes, 2 No |
| da004  | Chest Pains When Climbing Stairs/Uphill or Walking Quickly (爬楼梯或快走时胸痛) | 1 Yes, 2 No, 3 Not applicable  |
| da005_1 | Physical Disabilities (身体残疾) | 1 Yes, 2 No |
| da005_2 | Brain Damage/Mental Retardation (脑损伤/智力低下) | 1 Yes, 2 No |
| da005_3 | Vision Problem (视力问题) | 1 Yes, 2 No |
| da005_4 | Hearing Problem (听力问题) | 1 Yes, 2 No |
| da005_5 | Speech Impediment (语言障碍) | 1 Yes, 2 No |
| da006_1 | The Year Becoming Physical Disabilities (身体残疾的年份) | 1918-2011 |
| da007_1 | Hypertension (高血压) | 1 Yes, 2 No |
| da007_2 | Dyslipidemia (血脂异常) | 1 Yes, 2 No |
| da007_3_ | **Disabetes** or High Blood Sugar (糖尿病或高血糖) | 1 Yes, 2 No |
| da007_4 | Cancer or Malignant Tumor (癌症或恶性肿瘤) | 1 Yes, 2 No |
| da007_5 | Chronic Lung Diseases (慢性肺病) | 1 Yes, 2 No |
| da007_6 | Liver Disease (肝病) | 1 Yes, 2 No |
| da007_7 | **Heart Problems** (心脏病) | 1 Yes, 2 No |
| da007_8 | **Stroke** (中风) | 1 Yes, 2 No |
| da007_9 | Kidney Disease (肾病) | 1 Yes, 2 No |
| da007_10 | Stomach or Other Digestive Disease
(胃或其他消化道疾病) | 1 Yes, 2 No |
| da007_11 | Emotional, Nervous, or Psychiatric Problems
(情绪、神经或精神问题) | 1 Yes, 2 No |
| da007_12 | Memory-Related Disease (记忆相关疾病) | 1 Yes, 2 No |
| da007_13 | Arthritis or Rheumatism (关节炎或风湿病) | 1 Yes, 2 No |
| da007_14 | Asthma (哮喘) | 1 Yes, 2 No |
| da008_1 | Do You Konw If You Have Hypertension (你知道自己是否有高血压吗) | 1 Yes, 2 No |
| da008_5 | Do You Konw If You Have Chronic Lung Diseases (你知道自己是否有慢性肺病吗) | 1 Yes, 2 No |
| da008_11 | Do You Konw If You Have Emotional, Nervous,or Psychiatric
Problems (你知道自己是否有情绪、神经或精神问题吗) | 1 Yes, 2 No |
| da009_1 | The Time of Being Diagnosed of Hypertension (被诊断为高血压的时间类型) | 1 Year, 2 Age |
| da009_1_1 | The Year of Being Diagnosed of Hypertension (被诊断为高血压的年份) | 1945-2011 |
| da009_1_2 | The Year of Being Diagnosed of Dyslipidemia (被诊断为血脂异常的年份) | 1965-2011 |
| da009_1_3 | The Year of Being Diagnosed of Disabetes or High Blood
Sugar (被诊断为糖尿病或高血糖的年份) | 1971-2011 |
| da009_1_4 | The Year of Being Diagnosed of Cancer or Malignant Tumor (被诊断为癌症或恶性肿瘤的年份) | 1970-2011 |
| da009_1_5 | The Year of Being Diagnosed of Chronic Lung Diseases (被诊断为慢性肺病的年份) | 1948-2011 |
| da009_1_6 | The Year of Being Diagnosed of Liver Disease
(被诊断为肝病的年份) | 1900-2011 |
| da009_1_7 | The Year of Being Diagnosed of Heart Problems (被诊断为心脏病的年份) | 1940-2011 |
| da009_1_8 | The Year of Being Diagnosed of Stroke (被诊断为中风的年份) | 1937-2011 |
| da009_1_9 | The Year of Being Diagnosed of Kidney Diease (被诊断为肾病的年份) | 1900-2011 |
| da009_1_10 | The Year of Being Diagnosed of Stomach or Other Digestive Disease (被诊断为胃或其他消化道疾病的年份) | 1900-2011 |
| da009_1_11 | The Year of Being Diagnosed of Emotional, Nervous, or
Psychiatric Problems (被诊断为情绪、神经或精神问题的年份) | 1950-2011 |
| da009_1_12 |  The Year of Being Diagnosed of Memory-Related Disease (被诊断为记忆相关疾病的年份) | 1960-2011 |
| da009_1_13 | The Year of Being Diagnosed of Arthritis or Rheumatism (被诊断为关节炎或风湿病的年份) | 1900-2011 |
| da009_1_14 | The Year of Being Diagnosed of Asthma (被诊断为哮喘的年份) | 1948-2011 |
| da009_2 | The Time of Being Diagnosed of Dyslipidemia (被诊断为血脂异常的时间类型) | 1 Year, 2 Age |
| da009_2_1_ | The Year of Being Diagnosed of Hypertension (被诊断为高血压的年份) | 1965-2011 |
| da009_2_2_ | The Age of Being Diagnosed of Dyslipidemia (被诊断为血脂异常的年龄) | 20-79 |
| da009_2_3 | The Age of Being Diagnosed of Disabetes or High Blood
Sugar (被诊断为糖尿病或高血糖的年龄) | |
| da009_2_4 | The Age of Being Diagnosed of Cancer or Malignant Tumor (被诊断为癌症或恶性肿瘤的年龄) | |
| da009_2_5 | The Age of Being Diagnosed of Chronic Lung Diseases (被诊断为慢性肺病的年龄) | |
| da009_2_6 | The Age of Being Diagnosed of Liver Disease (被诊断为肝病的年龄) | |
| da009_2_7 | The Age of Being Diagnosed of Heart Problems (被诊断为心脏病的年龄) | |
| da009_2_8 | The Age of Being Diagnosed of Stroke (被诊断为中风的年龄) | |
| da009_2_9 | The Age of Being Diagnosed of Kidney Disease (被诊断为肾病的年龄) | |
| da009_2_10 | The Age of Being Diagnosed of Stomach or Other Digestive Disease (被诊断为胃或其他消化道疾病的年龄) | |
| da009_2_11 | The Age of Being Diagnosed of Emotional, Nervous, or Psychiatric Problems (被诊断为情绪、神经或精神问题的年龄) | |
| da009_2_12 | The Age of Being Diagnosed of Memory-Related Disease (被诊断为记忆相关疾病的年龄) | |
| da009_2_13 | The Age of Being Diagnosed of Arthritis or Rheumatism (被诊断为关节炎或风湿病的年龄) | |
| da009_2_14 | The Age of Being Diagnosed of Asthma (被诊断为哮喘的年龄) | |
| da009_3 | The Time of Being Diagnosed of Diabetes or High Blood Sugar (被诊断为糖尿病或高血糖的时间类型) | 1 Year, 2 Age |
| da009_4 |  The Time of Being Diagnosed of Cancer or Malignant Tumor (被诊断为癌症或恶性肿瘤的时间类型) | 1 Year, 2 Age |
| da009_5 | The Time of Being Diagnosed of Chronic Lung Diseases (被诊断为慢性肺病的时间类型) | 1 Year, 2 Age |
| da009_6 | The Time of Being Diagnosed of Liver Disease (被诊断为肝病的时间类型) | 1 Year, 2 Age |
| da009_7 | The Time of Being Diagnosed of Heart Problems (被诊断为心脏病的时间类型) | 1 Year, 2 Age |
| da009_8 | The Time of Being Diagnosed of Stroke (被诊断为中风的时间类型) | 1 Year, 2 Age |
| da009_9 | The Time of Being Diagnosed of Kidney Disease (被诊断为肾病的时间类型) | 1 Year, 2 Age |
| da009_10 | The Time of Being Diagnosed of Stomach or Other Digestive Disease (被诊断为胃或其他消化道疾病的时间类型) | 1 Year, 2 Age |
| da009_11 | The Time of Being Diagnosed of Emotional, Nervous, or Psychiatric Problems (被诊断为情绪、神经或精神问题的时间类型) | 1 Year, 2 Age |
| da009_12 | The Time of Being Diagnosed of Memory-Related Disease (被诊断为记忆相关疾病的时间类型) | 1 Year, 2 Age |
| da009_13 | The Time of Being Diagnosed of Arthritis or Rheumatism (被诊断为关节炎或风湿病的时间类型) | 1 Year, 2 Age |
| da009_14 | The Time of Being Diagnosed of Asthma (被诊断为哮喘的时间类型) | 1 Year, 2 Age |
| da010_2_s1|Take Chinese Traditional Medicine for Dyslipidemia (服用中药治疗血脂异常) | 1 Taking Chinese traditional medicine |
|da012 |  Times of Blood Pressure Examination Last Year (去年血压检查次数) | 0-999 |
|da013s4 | Got Any Health Advice from doctor of Smoking Control (医生给的戒烟建议) | 4 Smoking control |
|da016s4 | Got Any Health Advice from doctor of Smoking Control (医生给的戒烟建议) | 4 Smoking control |
|da017s1| The Organ Having Cancer(癌症部位) | 1 Brain  |
|da018s1| Taking Medications to Relieve Cancer Symptoms (癌症症状缓解药物) | 1 Taking Chinese Traditional Medicine(服用中药) |
|da058 | The Number of Times for Eating (吃饭次数) | 1 More than 4 meals per day(每天4餐以上), 2 4 meals per day (每天4餐), 3 3 meals per day (每天3餐), 4 2 meals per day (每天2餐), 5 1 meal per day (每天1餐), 6 Less than 1 meal per day (每天少于1餐) |
| da059| **Smoke** or Not (是否吸烟) | 1 Yes, 2 No |
|da060 | Product Type for Smoking (吸烟产品类型) | 1 Smoking a pipe(吸烟斗), 2 Smoking self-rolled cigarettes(自卷烟), 3 Filtered cigarettes(过滤香烟), 4 Unfiltered cigarettes(非过滤香烟), 5 Cigars(雪茄), 6 Water cigarettes(水烟) |
|da061 | Still **Smoking** or Not (是否仍在吸烟) | 1 Yes, 2 No |
|da066 | How Soon After You Wake Up You Smoke (醒来多久后吸烟) | 1 Within 5 minutes, 2 6-30 minutes, 3 31-60 minutes, 4 More than 1 hour |
|da067 | Did You Drink Any Alcoholic Beverages Last Year (去年喝酒吗) |1 Drink more than once a month(每月喝酒超过一次), 2 Drink but less than once a month (每月喝酒少于一次), 3 None of these (以上都不是) |
|da068s1 : Did You Drink Liqor (喝白酒) | 1 Yes, 2 No |
|**da069** | Did You Drink Alcoholic Beverages Ever (喝酒) | 1 I never had a drink.(我从来没有喝酒), 2 I used to drink less than once a month.(我以前每月喝酒少于一次), 3 I used to drink more than once a month (我以前每月喝酒超过一次) |


#### Health Care and Insurance (医疗保健和保险)
#### Work, Retirement and Pension (工作、退休和养老金)
#### Household Income (家庭收入)
#### Individual Income (个人收入)
#### Housing Characteristics (住房特征)
#### Interviewer Observation (访员观察)
#### Biomarkers (生物标志物) 体检数据
| 变量名称 | 变量描述 | 变量类型 |
| :-----: | :----: | :-----: |
| pa001   | Measure or Not (是否测量) | 1 Yes, 2 No |
| pa002   | Understand Directions or Not (是否理解测量说明) | 1 Yes, 2 No |
| qa001_1 | Other (Specify) (其他) | Chinese Character String |
| qa001s1 | Why didn't Complete (为什么没有完成) | 1 R felt it would not be safe (R认为不安全) |
| qa001s2 | Why didn't Complete (为什么没有完成) | 2 IWER felt it would not be safe (访员认为不安全) |
| qa001s3 | Why didn't Complete (为什么没有完成) | 3 R refused or was not willing to complete the test (R拒绝或不愿意完成测试) |
| qa001s4 | Why didn't Complete (为什么没有完成) | 4 R tried but was unable to complete test (R尝试但无法完成测试) |
| qa001s5 | Why didn't Complete (为什么没有完成) | 5 R did not understand the instructions (R不理解说明) |
| qa001s6 | Why didn't Complete (为什么没有完成) | 6 R had a rash, a cast, edema, etc. on arm; other health reason (R手臂有皮疹、石膏、浮肿等；其他健康原因) |
| qa001s7 | Why didn't Complete (为什么没有完成) | 7 No suitable space 1 (没有合适的空间) |
| qa001s8 | Why didn't Complete (为什么没有完成) | 8 Problem with equipment or supplies (设备或供应问题) |
| qa001s97 | Why didn't Complete (为什么没有完成) | 97 Other Specify (其他) |
| qa002  | Minute (分钟) | int or other |
| qa002_1 | Hour (小时) | int or other |
| qa003 | Systolic Reading (收缩压) | int |
| qa004 | Diastolic Reading (舒张压) | int |
| qa005 | Pulse (脉搏) | int |
| qa006 | Hour (小时) | int |
| qa006_1 | Minute (分钟) | int |
| qa007 | Systolic Reading (收缩压) | int |
| qa008 | Diastolic Reading (舒张压) | int |
| qa009 | Pulse (脉搏) | int |
| qa010 | Hour (小时) | int |
| qa010_1 | Minute (分钟) | int |
| qa011 | Systolic Reading (收缩压) | int |
| qa012 | Diastolic Reading (舒张压) | int |
| qa013 | Pulse (脉搏) | int |
| qa014 | Which Arm (哪个手臂) | 1 Left Arm, 2 Right Arm |
| qa015 | How Compliant (顺从性) | 1 R was fully compliant,2 R was prevented from fully complying due to illness, pain, or other symptoms or discomforts, 3 R was not fully compliant, but no obvious reason for this(R没有完全遵守，但没有明显的原因) |
| qa016 | R's Position (受访者的姿势) | 1 Standing, 2 Sitting, 3 Lying down |
| qa017 | Smoke, Exercise or Consume Alcohol or Food (吸烟、锻炼或食用酒精或食物) | 1 Yes, 5 No, 8 Dont know |
| pb001 | Understand Directions or Not (是否理解测量说明) | 1 Yes, 2 No |
| qb002 | Measurement Reading-1 (测量读数-1) | int |
| qc002 | Dominant Hand (主手) | 1 Right Hand, 2 Left Hand,3 Both hands equally dominant |
| qc003 | Left Hand-1kg (左手-1kg) | int |
| qd002 | How Complete (完成度) |  |
| pe001 |Which Test Item (哪个测试项目) | |                                                                     
| qf004 | Use Any Compensatory Movements (使用任何补偿动作) | 1 Yes, 2 No |
| qf005 | Type of Floor Surface(地面类型) | 1 Linoleum/tile/wood, 2 Carpet, 3 Clay, 4 Concrete, 5 Not sure |
| qg002 | Walking Speed Time-1 (走路速度时间-1) | int |
| qg002_1 | Repeat the Measurement (重复测量) | 1 Yes, 2 No |
| qh002 |Did R Can Stand Up Straight(R能否站直) | 1 Yes, 2 No |
| qi002 | Height | float |
| qj002 | Arm Length (手臂长度) | float |
| qk002 | Knee Height (膝盖高度) | float |
| ql002 | Weight Measurement (体重测量) | float |
| qm002 | Waist Measurement (腰围测量) | float |

| 序号 | 项目 | 变量 |
|:-----:|:----:|:-----:|
| 1 | 血压和脉搏 | |
| 2 | 肺功能 | |
| 3 | 握力 | |
| 4 | 平衡测试 | |
| 5 | 步行速度 | qg002 |
| 6 | 上臂长 | |
| 7 | 膝高 | |
| 8 | 重复从椅子上站起的时间 | |
| 9 | 身高 | qi002 |
| 10 | 体重 | ql002 |
| 11 | 腰围 | qm002 |
#### Weight (权重)
#### PSU 
| 变量名称 | 变量描述 | 变量类型 |
| :-----: | :----: | :-----: |
| province | 省 | Chinese Character String |
| city | 市 | Chinese Character String |
| urban_nbs | Urban or Rural according to NBS | Rural, Urban |
| areatype | Area Type according to NBS (NBS区域类型) | 111, 112, 121,122,123,210,220 |

### 2013 wave2 codebook
_w2 in the variable name means that this is a new variable. Variable name with prefix "z"
means this is a preload variable, for example, "zba001" contains the value of ba001 in the
baseline sample. Variable name with prefix "x" mean this is a generated variable by our
CAPI, for example, "xchildage" is generated from the birth year of that child.
> [!NOTE]- 翻译
> 2013年CHARLS数据集的变量命名规则与2011年CHARLS数据集的变量命名规则相同。
> 变量名称中的_w2表示这是一个新变量。变量名称以"z"开头表示这是一个预加载变量，例如"zba001"包含基线样本中ba001的值。以"x"开头的变量名称表示这是我们CAPI生成的变量，例如"xchildage"是根据该孩子的出生年份生成的。


Health Care and Insurance (医疗保健和保险)



### 2015 codebook
```py
XChroDisType = ["高血压病", 
"血脂异常（高血脂或低血脂）", 
"糖尿病或血糖升高（包括糖耐量异常和空腹血糖升高）", 
"癌症等恶性肿瘤（不包括轻度皮肤癌）",
"慢性肺部疾患如慢性支气管炎或肺气肿、肺心病（不包括肿瘤或癌）", 
"肝脏疾病（除脂肪肝、肿瘤或癌外）",
"心脏病（如心肌梗塞、冠心病、心绞痛、充血性心力衰竭和其他心脏疾病）", 
"中风", 
"肾脏疾病（不包括肿瘤或癌）", 
"胃部疾病或消化系统疾病（不包括肿瘤或癌）", 
"情感及精神问题", 
"与记忆有关的疾病（老年痴呆症、脑萎缩）", 
"帕金森症",
"关节炎或风湿病", 
"哮喘（非肺部疾病）"]
```

DA003[𝑖] 是否有医生曾经告诉过 [XRName] 有 [XChroDisType[𝑖]] ？

da003_7_: Diagnosed Disease [7] 心脏病
da003_8_: Diagnosed Disease [8] 中风

_w3 in the variable name means that this is a new variable. Variable name with prefix "z"
means this is a preload variable, for example, "zba001" contains the value of ba001 in the
2013 wave. Variable name with prefix "x" mean this is a generated variable by our CAPI,
for example, "xchildage" is generated from the birth year of that child.
> [!NOTE]- 翻译
> 2015年CHARLS数据集的变量命名规则与2013年CHARLS数据集的变量命名规则相同。
> 变量名称中的_w3表示这是一个新变量。变量名称以"z"开头表示这是一个预加载变量，例如"zba001"包含2013年波段的ba001的值。以"x"开头的变量名称表示这是我们CAPI生成的变量，例如"xchildage"是根据该孩子的出生年份生成的。

#### Demographic Background
| 变量名称 | 变量描述 | 变量类型 |
| :-----: | :----: | :-----: |
| ba000_w2_3 | Gender|
|da007_1_| Have Been Diagnosed of Disease(已经被诊断为疾病) | 1 Yes, 2 No |
| da007_3_| Have Been Diagnosed of Disease(已经被诊断为疾病) | 1 Yes, 2 No |
|zda007_3_| Chronic Disease

#### Health Status and Functioning
|da010_2_s1| Taking Any Medication or Other Treatments (服用任何药物或其他治疗) | 1 Taking Chinese Traditional Medicine (服用中药) |
|da010_2_s2| Taking Any Medication or Other Treatments (服用任何药物或其他治疗) | 2 Taking Western Morden Medicine (服用西药) |
| da010_2_s3| Taking Any Medication or Other Treatments (服用任何药物或其他治疗) | 3 Other Treatments (其他治疗) |
| da010_2_s4: Taking Any Medication or Other Treatments (服用任何药物或其他治疗) | 4 No Treatment (没有治疗) |
| da010_5
| da010_6
| da010_7
| da010_9
| da010_10
| da010_12
| da010_13

### 2020 
| 变量名称 | 变量描述 | 变量类型 |
| :-----: | :----: | :-----: |
| exda003| Had Heart Attack since Last ZIWTime (自上次调查以来是否心脏病发作) | 1 Yes, 2 No |
| exda007| Had Stroke since Last ZIWTime (自上次调查以来是否中风) | 1 Yes, 2 No |

### 血检数据

一般:
| 变量名称 | 变量描述 | 变量单位 |
| :-----: | :----: | :-----: |
| wbc | White Blood Cell (WBC) (白细胞计数) | 10^9/L |
| hgb | Hemoglobin (Hb) (血红蛋白) | g/dL |
| hct | Hematocrit (HCT) (血细胞比容) | % |
| mcv | Mean Corpuscular Volume (MCV) (平均红细胞体积) | fl |
| plt | Platelets (血小板计数) | 10^9/L |
| tg | Triglycerides (甘油三酯) | mg/dL |
| hdl | High Density Lipoprotein Cholesterol (高密度脂蛋白胆固醇) | mg/dL |
| ldl | Low Density Lipoprotein Cholesterol (低密度脂蛋白胆固醇) | mg/dL |
| TC\cho | Total Cholesterol (总胆固醇) | mg/dL |
| glu | Glucose (葡萄糖) | mg/dL |
| bun | Blood Urea Nitrogen (BUN) (血尿素氮) | mg/dL |
| crea | Creatinine (肌酐) | mg/dL |
| ua | Uric Acid (尿酸) | mg/dL |
| crp | C-Reactive Protein (CRP) (C反应蛋白) | mg/L |
| hbalc | Glycated Hemoglobin (糖化血红蛋白) | % |
| cystatin_c | Cystatin C (胱抑素C) | mg/L |

2011\2012 CHARLS Wave 1:
| 变量名称 | 变量描述 | 变量单位 | N | Mean(SD) |
| :-----: | :----: | :-----: |:-:| :-----: |
|qc1_vb002| White Blood Cell(WBC)(in thousands)(白细胞计数)|11528 |1000| 6.17(2.06) |
|qc1_vb004|Hemoglobin (Hb) (血红蛋白) | g/dL |11530| 14.28(2.16) |
|qc1_vb005|Hematocrit (HCT) (%) | % | 11839 | 41.20(6.23) |
|qc1_vb006|Mean Corpuscular Volume (MCV) | fl | 11532 | 90.40(8.43) |
|qc1_vb009|Platelets (血小板计数) | 10^9/L | 11531 | 208.71(72.06) |
| newbun  | Blood Urea Nitrogen (BUN) (血尿素氮) | mg/dl |
| **newglu**  | Glucose (葡萄糖) | mg/dl | 11636 | 
| newcrea | Creatinine (肌酐) | mg/dl |
| newcho  | Total Cholesterol (总胆固醇) | mg/dl |
| **newtg**   | Triglycerides (甘油三酯) | mg/dl | 11656 |
| newhdl  | High Density Lipoprotein Cholesterol (高密度脂蛋白胆固醇) | mg/dl |
| newldl  | Low Density Lipoprotein Cholesterol (低密度脂蛋白胆固醇) | mg/dl |
| newcrp  | C-Reactive Protein (CRP) (C反应蛋白) | mg/l |
| newhba1c | Glycated Hemoglobin (糖化血红蛋白) | % |
| newua | Uric Acid (尿酸) | mg/dl |
|cystatinc | Cystatin C (胱抑素C) | mg/l | 8878 | 1.03 (0.32) |

2013 CHARLS Wave 2:
貌似没有血检

2015 CHARLS Wave 3:
| 变量名称 | 变量描述 | 变量单位 |
| :-----: | :----: | :-----: |
| bl_fasting | Fasting Blood Sample or not(空腹血样本) | — |
| bl_wbc | White Blood Cell (白细胞计数) | 1000 |
| bl_hgb | Hemoglobin (血红蛋白) | g/dl |
| bl_hct | Hematocrit (血细胞比容) | % |
| bl_mcv | Mean Corpuscular Volume (平均红细胞体积) | fl |
| **bl_plt** | Platelets (血小板计数) | 10^9/L |
| **bl_tg** | Triglycerides (甘油三酯) | mg/dl |
| bl_top_coding_tg | Whether top-coding Triglycerides values to 500 if orginal Triglycerides values more than 500 (是否将甘油三酯值超过500的值设为500) | — |
| bl_crea | Creatinine (肌酐) | mg/dl |
| bl_bun | Blood Urea Nitrogen (BUN) (血尿素氮) | mg/dl |
| **bl_hdl** | High Density Lipoprotein Cholesterol (高密度脂蛋白胆固醇) | mg/dl |
| bl_ldl | Low Density Lipoprotein Cholesterol (低密度脂蛋白胆固醇) | mg/dl |
| bl_cho | Total Cholesterol (总胆固醇) | mg/dl |
| **bl_glu** | Glucose (葡萄糖) | mg/dl |
| bl_ua | Uric Acid (尿酸) | mg/dl |
| bl_cysc | Cystatin C (胱抑素C) | mg/l |
| bl_crp | C-Reactive Protein (CRP) (C反应蛋白) | mg/l |
| bl_hbalc | Glycated Hemoglobin (糖化血红蛋白) | % |

## 参考

### 字母顺序表
| 字母 | 数字 | 序号 | 大写 | 大写数字 |
| :-: | :-: | :--: | :-: | :-: |
| a   | 97 | 1 | A   | 65 |
| b   | 98 | 2 | B   | 66 |
| c   | 99 | 3 | C   | 67 |
| d   | 100 | 4 | D   | 68 |
| e   | 101 | 5 | E   | 69 |
| f   | 102 | 6 | F   | 70 |
| g   | 103 | 7 | G   | 71 |
| h   | 104 | 8 | H   | 72 |
| i   | 105 | 9 | I   | 73 |
| j   | 106 | 10 | J   | 74 |
| k   | 107 | 11 | K   | 75 |
| l   | 108 | 12 | L   | 76 |
| m   | 109 | 13 | M   | 77 |
| n   | 110 | 14 | N   | 78 |
| o   | 111 | 15 | O   | 79 |
| p   | 112 | 16 | P   | 80 |
| q   | 113 | 17 | Q   | 81 |
| r   | 114 | 18 | R   | 82 |
| s   | 115 | 19 | S   | 83 |
| t   | 116 | 20 | T   | 84 |
| u   | 117 | 21 | U   | 85 |
| v   | 118 | 22 | V   | 86 |
| w   | 119 | 23 | W   | 87 |
| x   | 120 | 24 | X   | 88 |
| y   | 121 | 25 | Y   | 89 |
| z   | 122 | 26 | Z   | 90 |
