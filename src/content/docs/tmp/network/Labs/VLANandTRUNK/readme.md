# VLAN&TRUNK

abbr. 虚拟局域网（Virtual Local Area Network）

TRUNK: 交换机之间的连接方式，可以传输多个VLAN的数据

```sh
VLAN和TRUNK实验配置过程：
S1
# 进入enable模式(特权模式, en, enable)
1.Switch>enable
# 进入VLAN数据库模式
2.Switch#vlan database
# 创建VLAN 2和VLAN 3
3.Switch(vlan)#vlan 2
4.Switch(vlan)#vlan 3
5.Switch(vlan)#exit
# 进入全局配置模式(config terminal, conf t)
6.Switch#config terminal
# 进入接口配置模式
7.Switch(config)#interface f0/2
# 将f0/2接口分配给VLAN 2
Switch(config-if)#switchport mode access
8.Switch(config-if)#switchport access vlan 2
# 进入接口配置模式
9.Switch(config)#interface f0/3
# 将f0/3接口分配给VLAN 3
Switch(config-if)#switchport mode access
10.Switch(config-if)#switchport access vlan 3
# 将f0/24接口配置为 trunk 模式
11.Switch(config)#interface f0/24
12.Switch(config-if)#switchport  mode  trunk
# 检查
13.Switch#show vlan brief
14.Switch#show interfaces status

S2
1.Switch>enable
2.Switch#vlan database
3.Switch(vlan)#vlan 2
4.Switch(vlan)#vlan 3
5.Switch(vlan)#exit
6.Switch#config terminal
7.Switch(config)#interface f0/2
Switch(config-if)#switchport mode access
8.Switch(config-if)#switchport access vlan 2
9.Switch(config)#interface f0/3
Switch(config-if)#switchport mode access
10.Switch(config-if)#switchport access vlan 3
11.Switch(config)#interface f0/24
12.Switch(config-if)#switchport  mode  trunk

实验验证
1.PC1 ping PC4 Reply
2.PC2 ping PC5 Reply
3.PC3 ping PC6 Reply
```

配置VLAN和TRUNK的实验过程，在Cisco的网络设备上进行的配置。这个过程中创建了两个VLAN（VLAN 2和VLAN 3），并将不同的接口分配给了不同的VLAN。同时，f0/24接口被配置为trunk模式，用于在两台交换机之间传输多个VLAN的数据。

1. 进入enable模式，这个模式允许你执行所有的命令。

2. 进入VLAN数据库模式，这个模式允许你创建和管理VLAN。

3. 创建VLAN 2和VLAN 3。

4. 退出VLAN数据库模式，返回到enable模式。

5. 进入全局配置模式，这个模式允许你配置交换机的全局设置。

6. 进入接口配置模式，这个模式允许你配置特定的接口。

7. 将f0/2接口分配给VLAN 2，将f0/3接口分配给VLAN 3。

8. 将f0/24接口配置为trunk模式，这样它就可以在两台交换机之间传输多个VLAN的数据。

在实验验证部分，通过ping命令测试PC1、PC2和PC3是否能够与PC4、PC5和PC6进行通信。如果能够收到Reply，说明配置是正确的，VLAN和TRUNK都工作正常。

## Switch

交换机（Switch）是一种网络设备，主要用于连接和管理局域网中的设备，如计算机、打印机、服务器等。交换机可以根据接收到的数据包的目标地址，将数据包转发到正确的端口，从而实现网络设备之间的通信。

1. 数据转发：交换机可以根据数据包的目标地址，将数据包转发到正确的端口。

2. VLAN管理：交换机可以创建和管理虚拟局域网（VLAN），将一个物理网络划分为多个逻辑网络，从而提高网络的安全性和效率。

3. 带宽聚合：交换机可以通过将多个物理链路聚合成一个逻辑链路，提高网络的带宽。

4. 负载均衡：交换机可以根据网络的负载情况，自动调整数据的转发路径，实现负载均衡。

5. QoS服务质量管理：交换机可以根据数据包的优先级，提供不同的服务质量。

6. 安全管理：交换机可以提供各种安全功能，如MAC地址过滤、端口安全、ACL访问控制列表等，保护网络的安全。

7. 网络管理：交换机可以提供各种网络管理功能，如SNMP网络管理协议、RMON远程监控、Syslog系统日志等，方便网络管理员管理和维护网络
