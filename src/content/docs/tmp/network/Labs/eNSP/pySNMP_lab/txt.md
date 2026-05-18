# PySNMP

## 实训6 PySNMP 获取网络数据
专业:计算机网络技术, 课程: 网络系统运行和维护

### 一 实训目标(实验目的)
- 会使用 JSON 格式的数据
- 会使用 netmiko 模块(库)

### 二 实训内容
前期准备操作:
1、使用eNsp软件打开指导教师提供的项目3网络拓扑图,并启动所有设备(已配置过的可以跳过当前准备)：



2、添加Cloud主机，并配置端口：

此处的VMware Network Adapter VMnet8是当前物理主机的网卡，每个人的主机不同，ip也不完全相同。

3、为路由器GZ添加端口：
首先关闭路由器GZ

右击GZ打开设置界面

手动添加端口

4、将路由器GZ与Cloud主机连接

5、重新启动路由器GZ

6、设置路由器GZ的网关GE2/0/0，将本地主机所在网段添加至路由器GZ的OSPF，并设置GE2/0/0的ip地址和掩码为192.168.226.10 24

配置命令：
sys
ospf 1
a 2
network 192.168.56.0 0.0.0.255
interface GigabitEthernet2/0/0
ip address 192.168.226.10 255.255.255.0 
ospf enable 1 area 0.0.0.2

7、通过命令行及指令route add设置本地主机网段，将后续需要ping通的网段添加至本机路由

注意此处的192.168.226.10应修改为自己主机网络的ip地址即192.168.xxx.10，与前面配置GZ保持一致。

完成配置后，退出GZ视图模式，保存相关配置：

（一）安装pysnmp并验证版本（请按要求填写命令，粘贴结果图）
1.通过Anaconda Prompt在虚拟环境ensp_py下安装pysnmp及pysnmp-mibs包，并验证其版本信息。
执行命令截图：


验证结果图：
（二）综合实践
准备操作：按照前期准备操作中步骤对网络拓扑图增加Cloud主机并配置网段。
1. 参考实验指导说明书，基于指导教师给的网络拓扑图Ensp文件，通过PySNMP获取路由器SZ1和SZ2数据，包括每台路由器的sysname、接口数目、接口类型、接口IP地址和掩码、路由目标、路由下一跳。需要完成的任务如下。 
     （1）配置SNMPv3。
     （2）通过MIB管理工具获取OID。
     （3）编写Python脚本。
     （4）运行Python脚本。
其中，路由器SZ1和SZ2的SNMPv3服务配置及IP地址参见教材5.4章节。
OID信息配置文件：
将5.4.3节中关于读取oid_string.csv的代码改成：
with open("./cfg.txt", "r") as f:
    lines = f.readlines()
    for line in lines:
        temp = line.split('"')
        OID_val = temp[0]
        description_str = temp[1]
        node_flag = temp[2]
        if node_flag == "S":
            use_getCmd(engine, userdata, target, context, OID_val, description_str)
        elif node_flag == "M":
            use_bulkCmd(engine, userdata, target, context, OID_val, description_str)
        else:
            print("something error")



路由器SZ1配置SNMPv3服务的截图：

Python代码截图：

执行结果截图：

