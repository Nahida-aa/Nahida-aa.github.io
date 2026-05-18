# 端口聚合

## labs1 端口聚合(链路聚合)




```c
Sw0
Switch>en  //进入特权模式
Switch#conf t  //进入全局模式
Switch(config)#interface range f0/1-2  //进入1-2接口
Switch(config-if-range)#Switchport mode trunk  //将这两个接口切换为trunk模式
Switch(config-if-range)#channel-group 1 mode on  //将这两个接口加入到组1中，组模式为on模式（自适应模式）
Switch(config-if-range)#exit  //退出当前接口
Switch(config)#port-channel load-balance dst-ip  //按照主机ip地址数据分发来实现负载均衡
Switch(config)#exit  //退出全局模式
Switch#sh etherchannel summary  //查看创建好的接口组信息
```































gigabitEthernet 版
```
SW1配置
Switch>en  //进入特权模式
Switch#vl da  //进入vlan数据库
Switch(vlan)#vl 10   //创建vl 10
Switch(vlan)#vl 20   //创建vl 20
Switch(vlan)#exit    //退出vlan数据库
Switch#conf t    //进入全局模式
Switch(config)#ho S1  //更改路由器名字（选做）
S1(config)#in f0/1  //进入f0/1接口
S1(config-if)#sw mo ac  //将此接口切换为access模式
S1(config-if)#sw ac vl 10  //将此接口加入vl 10
S1(config-if)#exit   //退出当前接口
S1(config)#in f0/2   //进入接口2
S1(config-if)#sw mo ac  //将此接口切换为access模式
S1(config-if)#sw ac vl 20  //将此接口加入vl 20
S1(config-if)#exit  退出当前接口
S1(config)#end  //返回特权模式
S1#sh vl    //查看vlan配置信息

S1#conf t  //进入全局模式
S1(config)#in ra g0/1-2  //批量进入1-2接口
S1(config-if-range)#channel-group 3 mode on //将1-2两个接口的性能聚合到一个组中（组编号为3，此处编号1-6随意指定），组模式为on模式（自适应模式）
S1(config-if-range)#exit
S1(config)#in port-channel 3  //进入编号为3的接口组中
S1(config-if)#sw mo tr  //将聚合后的接口组3切换为trunk模式
S1(config-if)#sw tr al vl 10,20  //让接口组3只转发vl10和vl20的数据
S1(config-if)#no sh  //激活该接口组3
S1(config-if)#end   //返回特权模式
S1#sh etherchannel summary  //查看创建好的接口组信息

SW2配置（注释同上）
Switch>
Switch>en
Switch#vl da
Switch(vlan)#vl 10
Switch(vlan)#vl 20
Switch(vlan)#exit
Switch#conf t
Switch(config)#ho S2
S2(config)#in f0/1
S2(config-if)#sw mo ac
S2(config-if)#sw ac vl 10
S2(config-if)#exit
S2(config)#in f0/2
S2(config-if)#sw mo ac
S2(config-if)#sw ac vl 20
S2(config-if)#exit
S2(config)#end
S2#sh vl

S2#conf t
S2(config)#in ra g0/1-2
S2(config-if-range)#channel-group 3 mode on
S2(config-if-range)#exit
S2(config)#in port-channel 3
S2(config-if)#sw mo tr
S2(config-if)#sw tr al vl 10,20
S2(config-if)#no sh
S2(config-if)#end
S2#sh ru
S2#sh etherchannel summary
```


## 相关知识

Copper Cross-Over Cable

在端口聚合（EtherChannel）配置中，选择使用Copper Straight-Through Cable（直通线）还是Copper Cross-Over Cable（交叉线）取决于连接的设备类型。以下是两种电缆的区别及其在端口聚合中的应用：

### Copper Straight-Through Cable（直通线）

- **用途**：通常用于连接不同类型的设备，例如：
  - 交换机到路由器
  - 计算机到交换机
  - 计算机到路由器
- **线序**：两端的线序相同（T568A到T568A或T568B到T568B）。
- **端口聚合应用**：在端口聚合中，如果您连接的是不同类型的设备（例如交换机到路由器），通常使用直通线。

### Copper Cross-Over Cable（交叉线）

- **用途**：通常用于连接相同类型的设备，例如：
  - 交换机到交换机
  - 路由器到路由器
  - 计算机到计算机
- **线序**：两端的线序不同（T568A到T568B）。
- **端口聚合应用**：在端口聚合中，如果您连接的是相同类型的设备（例如交换机到交换机），通常使用交叉线。

### 现代设备的自动MDI/MDIX功能

需要注意的是，许多现代网络设备支持自动MDI/MDIX功能，这意味着它们可以自动检测并调整电缆类型，无论使用直通线还是交叉线都可以正常工作。这使得选择电缆类型变得不那么重要。

### 端口聚合配置示例

假设您有两台交换机S1和S2，并希望在它们之间配置端口聚合。以下是一个简单的配置示例：

#### S1配置：

```plaintext
Switch> enable
Switch# configure terminal
Switch(config)# interface range gigabitEthernet 0/1 - 2
Switch(config-if-range)# channel-group 1 mode active
Switch(config-if-range)# exit
Switch(config)# interface port-channel 1
Switch(config-if)# switchport mode trunk
Switch(config-if)# exit
Switch(config)# end
```

#### S2配置：

```plaintext
Switch> enable
Switch# configure terminal
Switch(config)# interface range gigabitEthernet 0/1 - 2
Switch(config-if-range)# channel-group 1 mode active
Switch(config-if-range)# exit
Switch(config)# interface port-channel 1
Switch(config-if)# switchport mode trunk
Switch(config-if)# exit
Switch(config)# end
```

在这个示例中，假设S1和S2之间使用的是Gigabit Ethernet端口0/1和0/2，并且配置了LACP（链路聚合控制协议）模式为active。根据设备的自动MDI/MDIX功能，您可以使用直通线或交叉线来连接这些端口。

### 总结

- **Copper Straight-Through Cable**：用于连接不同类型的设备。
- **Copper Cross-Over Cable**：用于连接相同类型的设备。
- **自动MDI/MDIX**：现代设备通常支持自动MDI/MDIX功能，使得电缆类型选择变得不那么重要。

希望这些信息能帮助您理解在端口聚合配置中选择电缆类型的区别和应用。
