# 端口聚合-F-带外管理

## 实验概述

将 Switch 上多个端口在物理上连接起来，在逻辑上捆绑在一起，形成一个拥有较大宽带的端口，可以实现负载分担，并提供冗余链路

端口聚合使用的是 EtherChannel 特性，在交换机到交换机之间提供冗余的高速的连接方式，将两个设备之间多条 fastEthernet 或者 gigabitEthernet 连接捆绑在一起，组成一条设备链路，从而增强宽带，提供冗余。
两台交换机到计算器的速率都是 100 Mbps 的物理通道相连，可由于生成树的原因，只有 100 Mbps 的链路被使用, 交换机之间的链路很容易形成瓶颈，使用端口聚合技术，把两个100M 链路聚合成一个 200M 的链路，当一个链路出现故障时，另一个链路仍然可以正常工作，从而提高了链路的可靠性。

trunk 表示端口可以转发所有 VLAN 的数据，而 access 表示端口只能转发一个 VLAN 的数据。

要求: 通过交换机的 Console 端口管理交换机属于带外管理；这种管理方式不占用交换机的网络端口，第一次配置交换机必须利用 Console 端口进行配置。通过 Telnet 、拨号等方式属于带内管理

好的，以下是一个详细的任务设计方案，涵盖了实验的准备、配置步骤和验证方法。

## 任务设计方案

### 1. 实验目标

- 配置两台交换机之间的EtherChannel，实现端口聚合。
- 通过Console端口进行初始配置（带外管理）。
- 通过Telnet进行远程管理（带内管理）。
- 验证PC之间的连通性和链路冗余性。

### 2. 实验设备

- **Switch_2960** x2
- **PC** x4
- **直通线（Copper Straight-Through Cable）**
- **Console电缆**

### 3. 实验拓扑

```
PC0 ---- Fa0/5  Switch0  Fa0/1 ---- Fa0/1  Switch1  Fa0/5 ---- PC2
PC1 ---- Fa0/6           Fa0/2 ---- Fa0/2           Fa0/6 ---- PC3
```

### 4. 配置PC的IP地址

- **PC0**:
  - IP地址: 192.168.1.2
  - 子网掩码: 255.255.255.0

- **PC1**:
  - IP地址: 192.168.1.3
  - 子网掩码: 255.255.255.0

- **PC2**:
  - IP地址: 192.168.1.4
  - 子网掩码: 255.255.255.0

- **PC3**:
  - IP地址: 192.168.1.5
  - 子网掩码: 255.255.255.0

### 5. 配置步骤

#### 5.1 配置Switch0

1. **通过Console端口连接Switch0**：
   - 使用Console电缆将PC连接到Switch0的Console端口。
   - 打开PC的桌面视图，选择终端（Terminal）程序(选择正确的串行端口,通常为默认设置,设置波特率为9600)

2. **进行初始配置**：

```c
Switch> enable  // 进入特权模式
Switch# configure terminal  // 进入全局配置模式
Switch(config)# interface range f0/1-2  // 进入接口范围
Switch(config-if-range)# switchport mode trunk  // 将接口切换为trunk模式
Switch(config-if-range)# channel-group 1 mode on  // 将接口加入到组1中，组模式为on模式（静态聚合）
Switch(config-if-range)# exit  // 退出接口配置模式
Switch(config)#port-channel load-balance dst-ip  //按照主机ip地址数据分发来实现负载均衡
Switch(config)#exit  //退出全局模式
Switch#sh etherchannel summary  //查看创建好的接口组信息
```

#### 5.2 配置Switch1

同 Switch0 配置

### 6. 验证配置

1. **查看EtherChannel摘要**：
```c
Switch# show etherchannel summary //查看创建好的接口组信息
```

2. **查看Port-channel接口的详细信息**：
```c
Switch# show interface port-channel 1
```

3. **测试连通性**：
   - 使用`ping`命令测试PC之间的连通性。例如，从PC0 ping PC2，从PC1 ping PC3，确保它们能够通过聚合链路进行通信。

## 总结

通过上述步骤，可以配置和验证两台交换机之间的EtherChannel，实现端口聚合。初始配置通过Console端口进行（带外管理），然后通过Telnet进行远程管理（带内管理）。通过测试PC之间的连通性，可以验证配置是否正确并正常工作。