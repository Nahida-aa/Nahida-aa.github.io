# 实 训 报 告

专业：计算机网络技术       课程：网络系统运行与维护

|实训序号：8 | 实训名称：使用telemetry实时监控CPU和内存使用率 | 成绩： |
|---|---|---|
|班级:|学号:|姓名:|

## 一、实训目标：

- 会使用YANG建模语言
- 会配置Telemetry订阅数据
- 会使用Telemetry技术

## 二、实训内容及操作步骤：

### （一）使用pyang模块检查YANG文件树结构（请按要求填写命令，粘贴结果图）

1、在YANG模块中，声明其他模块的引用应该使用哪个关键字？

A. import\
B. include\
C. module\
D. belongs-to

正确答案： A

2、在YANG中，leaf语句定义的是什么？

A. 单个数据值\
B. 容器\
C. 列表项\
D. 数据类型

正确答案： A

3、XML文档的第一行通常是什么？

A. `<root>` \
B. `<?xml version="1.0" encoding="UTF-8"?>` \
C. `<!DOCTYPE>`

正确答案： B

4、YANG模型由一个模型和无数的叶子节点、（  ）组成的描述整个设备的一棵树？（多选题）

A. 节点列表\
B. 叶子列表\
C. 容器节点\
D. 根节点

正确答案： B、C、D

5、目前华为设备支持的YANG模型有（  ）？

A. HUAWEI-YANG\
B. OPEN-YANG\
C．IETF-YANG\
D．OPENCONFIG-YANG

正确答案： A、C、D

6.通过Anaconda Prompt在虚拟环境ensp_py下安装pyang包，并查看帮助说明：

执行命令截图：
```sh
conda activate ensp_py
pip install pyang
pyang --help
```

验证结果图：

![图 0](images/a0afe262b9819e72b988dd20e6d5580205cbfc01306cf7b25e78c6f057cc338b.png)  


7.通过pyang包，输出下列 config-interface.yang 文件的Tree结构并将其转换为yin文件。

Tree结构截图：
```sh
pyang -f tree config-interface.yang
```
![图 11](images/5cb53586db7dc8ed3e52cc7307c9764af4d149e7214d66cce5cd4cc7f785cc3e.png)  

Yin文件截图：
```sh
pyang -f yin -o config-interface.yin config-interface.yang
```
![图 12](images/ce87be46b3de1d2dade42ae77bff4ec699b74f13cb84f03c4444222ed384b022.png)  

### （三）综合实践
1. 参考实验指导说明书，基于指导教师给的网络拓扑图截图，配置局域网，并通过telemetry静态订阅方式监控CE12800设备的CPU使用率。需要完成的任务如下。 

- （1）创建网络拓扑图并配置参数。
- （2）配置CE12800设备SSH服务及Telemetry静态订阅服务。
- （3）编写Python脚本。
- （4）运行Python脚本。
其中，拓扑图如下：
![图 1](images/34a4136015772b4d3cf69ee894b16ce19ef0024e7118f7699853dc457b45208e.png)  

```sh
# 
sys
sysname CE1
vlan 10
commit
q
#
interface Vlanif10
ip address 192.168.226.220
commit
interface GigabitEthernet1/0/0
undo shutdown
port default vlan 10
commit
q
```
第一次配置时忘了配置ip, 之后通过检查发现问题并修改配置。
![图 2](images/f459e84b1db3bdeffa4b2b99cbb5a28f461538e17174bce4a7a4ba233942e30f.png)  
![图 3](images/cba44239dfd49304b8aa26f1c494939afddf73d01551d0579ad791e53def5b9f.png)  
本地主机 ping CE1 的截图：
![图 4](images/ce3f82459b98e781274bd2ba104325ea0e34503acdd61ed3c5fb88348c8042d5.png)  

交换机CE1配置动态订阅服务的截图：
```sh
sys
telemetry
destination-group dst1
ipv4-address 192.168.226.1 port 30000 protocol grpc no-tls
commit
display telemetry destination
```
![图 5](images/7706194b8622959fbd7de0d19d2793e55eb1b08e3e4ba23322c5cc58823b0a4d.png)  
```sh
# 创建传感器组
sensor-group ssr1
sensor-path huawei-devm:devm/cpuInfos/cpuInfo
commit
display telemetry sensor
display telemetry sensor-path
```
![图 6](images/3909e1995b0bfcdd4f0468fd1daa9c6d1ccb0cc48a2d2b7c310f519f18fad826.png)  
```sh
#静态订阅
subscription sbc1
sensor-group ssr1 sample-interval 1000
destination-group dst1
commit
display telemetry subscription
display telemetry destination
```
![图 7](images/068312992dd98ec6dedb01b1382e93556b05df114631e9cc84a62162a5e15688.png)  
![图 8](images/de11d0b9cd8410af1b9b37c9405102f1c0e693264df7fed354b65fad8923f740.png)  

Python代码截图：
![图 10](images/e7ade13f6142d3a5779d22ddf56abd183a6ea98dceadb9c46fd5d73f9b90d9c2.png)  


执行结果截图：

![图 9](images/1b02d7526cecc8242bf877d3e7417e49ffe80c49015ebb5d8f24b4e9467f404a.png)  
