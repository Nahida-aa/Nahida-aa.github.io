# 三层交换机配置（一）

## 实验过程

### 交换机配置

```sh
三层交换机S1配置：
Switch>en
Switch#conf t
S1(config)ho S1  //交换机更名
S1(config)#vl 2  //创建VLAN
S1(config-vlan)#vl 3  //创建VLAN3
S1(config-vlan)#vl 6  //创建VLAN6
S1(config-vlan)#exit  //退出VLAN数据库
S1(config)#in r f0/1-2  //批量配置接口1-2
S1(config-if-range)#sw ac vl 2  //将1-2接口加入vlan 2
S1(config-if-range)#exit //退出1-2接口
S1(config)#in r f0/3-4  //批量配置接口3-4
S1(config-if-range)#sw ac vl 3  //将3-4接口加入vlan 3
S1(config-if-range)#exit  //退出3-4接口
S1(config)#in f0/5  //进入接口5
S1(config-if)#sw ac vl 6  //将接口5加入VLAN6
S1(config-if)#end  //返回特权模式
S1#sh vl  //查看Vlan配置信息（选做）
S1(config)#in vl 2    //创建名为vl2的虚拟接口
S1(config-if)#ip ad 192.168.1.254 255.255.255.0  //为vl2虚拟接口配置对应IP地址（网关）和子网掩码
S1(config-if)#exit   //退出当前接口
S1(config)#in vl 3  //创建名为vl3的虚拟接口
S1(config-if)#ip ad 192.168.2.254 255.255.255.0  //为vl2虚拟接口配置对应IP地址和掩码
S1(config-if)#exit  //退出当前接口
S1(config)#in vl 6  //创建名为vl6的虚拟接口
S1(config-if)#ip ad 192.168.5.1 255.255.255.0  //为vl6虚拟接口配置对应IP地址和掩码
S1(config-if)#exit  //退出当前接口
S1(config)#ip routing  //启动三层交换机的路由功能
S1(config)#router rip  //RIP配置
S1(config-router)#network 192.168.1.0  //对外公布直连网络1
S1(config-router)#network 192.168.2.0  //对外公布直连网络2
S1(config-router)#network 192.168.5.0  //对外公布直连网络3
S1(config-router)#end
S1#sh ip ro  //查看路由配置表

三层交换机S2配置（注释同上）：
Switch>en
Switch#conf t
Switch(config)#ho S2//交换机更名
S2(config)#vl 4
S2(config-vlan)#vl 5
S2(config-vlan)#vl 6
S2(config-vlan)#exit
S2(config)#in r f0/1-2
S2(config-if-range)#sw ac vl 4
S2(config-if-range)#exit
S2(config)#in r f0/3-4
S2(config-if-range)#sw ac vl 5
S2(config-if-range)#exit
S2(config)#in f0/5
S2(config-if)#sw ac vl 6
S2(config-if)#end
S2#sh vl
S2#conf t
S2(config)#in vl 4
S2(config-if)#ip ad 192.168.3.254 255.255.255.0
S2(config-if)#exit
S2(config)#in vl 5
S2(config-if)#ip ad 192.168.4.254 255.255.255.0
S2(config-if)#exit
S2(config)#in vl 6
S2(config-if)#ip ad 192.168.5.2 255.255.255.0
S2(config-if)#exit
S2(config)#ip routing
S2(config)#router rip
S2(config-router)#network 192.168.3.0
S2(config-router)#network 192.168.4.0
S2(config-router)#network 192.168.5.0
S2(config)#end
S2#sh ip ro
```

## 实验结果

任意不同vlan下PC可以通信,例如PC1和PC8互相可以ping通
