Switch1配置
1.	Switch>en  //进入特权模式
2.	Switch#conf t  //进入全局模式
3.	Switch(config)#vl 10  //创建vl10
4.	Switch(config-vlan)#exit  //退出vlan 数据库
5.	Switch(config)#vl 20  //创建vl 20
6.	Switch(config-vlan)exit  //退出vlan数据库
7.	Switch(config)in f0/1  //进入交换机的f0/1接口
8.	Switch(config-if)sw ac vl 10  //将f0/1接口加入vl 10 
9.	Switch(config-if)exit  //退出f0/1接口
10.	Switch(config)in  f0/2  //进入交换机f0/2接口
11.	Switch(config-if)sw ac vl 20  //将f0/2接口加入vl 20
12.	Switch(config-if)#end  //回到特权模式
13.  Switch#sh vl  //使用sh vl br命令查看vlan信息
13.	Switch#conf t  //进入全局模式
14.	Switch(config)in f0/3    //进入交换机f0/3接口
15.	Switch(config-if)sw mo tr 	//设置端口的模式为trunk模式
14. Switch(config-if)#switchport mode trunk 
16.	Switch(config-if)end //返回特权模式
17. Switch#show vlan brief  // 使用show vlan brief命令查看VLAN信息
18. Switch#show running-config  // 查看各接口配置信息（此行选做）
18.	Switch# sh ru  //查看各接口配置信息（此行选做）

Router0
1.	Router>en
2.	Router#conf t
3.	Router(config)#in f0/0  //进入路由器0模块第0端口
4.	Router(config-if)#no sh  //激活开启该端口(此时路由连接交换机的端口从block转到forward)
5.	Router(config-if)#exit	//退出当前接口
6.	Router(config)#in f0/0.1  //进入路由器0模块第0端口第1子接口
7.	Router(config-subif)#encapsulation dot1Q 10  //封装协议设置为dot1q 允许通过的vlan 为10
8.	Router(config-subif)#ip ad 192.168.1.1 255.255.255.0  //为该子接口配置IP地址为192.168.1.1
9.	Router(config-subif)#exit	//退出当前接口
10.	Router(config)#in f0/0.2    //创建并进入路由器0模块第0端口第2子接口
11.	Router(config-subif)#encapsulation dot1q 20//封装协议设置为dot1q 允许通过的vlan 为20
12.	Router(config-subif)#ip ad 192.168.2.1 255.255.255.0 //该子接口配置IP地址为192.168.2.1
13.	Router(config-subif)#end  //返回特权模式
14.	Router#sh ip ro   //查看当前路由器的路由表

要求:

PC1可以ping通PC2