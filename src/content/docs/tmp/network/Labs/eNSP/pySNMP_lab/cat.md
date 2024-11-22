```yml name='eNSP'
ISP(R:AR3):
	GE0/0/1:  # 218.1.1.0/29
		SZ2: GE0/0/1
	GE0/0/2: # 61.1.1.0/30
		SZ2: GE0/0/2
	command:
		- system-view
		- sysname ISP
		- interface g0/0/1
		- ip add 218.1.1.1 29
		- int g0/0/2
		- ip add 61.1.1.1 30
SZ2(R:AR1):
  GE0/0/0: # 10.2.12.0/24
    SZ1: GE0/0/0
	GE0/0/1: # 218.1.1.0/24
		ISP: GE0/0/1
	GE0/0/2: # # 61.1.1.0
		ISP: GE0/0/2
  GE1/0/0: # 10.2.16.0/24
    S4: GE0/0/1
	command:
		- system-view
		- sysname SZ2
		- interface g1/0/0
		- ip add 10.2.16.1 24 # 现在 可以 在 SZ2 上ping通
		- int g0/0/0
		- ip add 10.2.12.1 24
		- int g0/0/1 
		- ip add 218.1.1.2 29
		- int g0/0/2
		- ip add 61.1.1.2 30

# 服务器区
S4(S:LSW1):
  GE0/0/1:
    SZ2: GE1/0/0
	GE0/0/3:
		FTP1: E0/0/1
	GE0/0/4:
		FTP2: E0/0/1
	GE0/0/5:
		WEB: E0/0/1
	GE0/0/6:
		MAIL: E0/0/1
	command:
	  <Huawei>system-view
		[Huawei]sysname S4
		[S4]interface GigabitEthernet0/0/1
		[S4-GigabitEthernet0/0/1]port link-type trunk
		[S4-GigabitEthernet0/0/1]port trunk allow-pass vlan all
		[S4-GigabitEthernet0/0/1]quit
		[S4]interface GigabitEthernet0/0/3
		[S4-GigabitEthernet0/0/3]port link-type access
		[S4-GigabitEthernet0/0/3]port default vlan 1
		[S4-GigabitEthernet0/0/3]quit
		[S4]interface GigabitEthernet0/0/4
		[S4-GigabitEthernet0/0/4]port link-type access
		[S4-GigabitEthernet0/0/4]port default vlan 1
		[S4-GigabitEthernet0/0/4]quit
		[S4]interface GigabitEthernet0/0/5
		[S4-GigabitEthernet0/0/5]port link-type access
		[S4-GigabitEthernet0/0/5]port default vlan 1
		[S4-GigabitEthernet0/0/5]quit
		[S4]interface GigabitEthernet0/0/6
		[S4-GigabitEthernet0/0/6]port link-type access
		[S4-GigabitEthernet0/0/6]port default vlan 1
		[S4-GigabitEthernet0/0/6]quit
FTP1("PC:PC1"):
  E0/0/1:
    S4: GE0/0/3
	IP: 10.2.16.2/24
	Gateway: 10.2.16.1
	command:
		- ipconfig
		- ping 10.2.16.2
		- ping 10.2.16.3
		- ping 10.2.16.1 # Gateway, 预计ping不通
FTP2("PC:PC2"):
	E0/0/1:
		S4: GE0/0/4
	IP: 10.2.16.3/24
	Gateway: 10.2.16.1
WEB("PC:PC3"):
	E0/0/1:
		S4: GE0/0/5
	IP: 10.2.16.4/24
	Gateway: 10.2.16.1
MAIL("PC:PC4"):
	E0/0/1:
		S4: GE0/0/6
	IP:	10.2.16.5/24
	Gateway: 10.2.16.1

# 总部
SZ1(R:AR2):
	GE0/0/0: # 10.2.12.0/24
		SZ2: GE0/0/0
	GE0/0/1: # 10.2.24.0/24
		S1: GE0/0/1
	GE0/0/2: # 10.2.25.0/24
		S2: GE0/0/1
	GE1/0/0: # 10.2.26.0/24
		S4: GE0/0/2
	GE2/0/0: # 10.2.23.0/24
		GZ: GE0/0/2
	command:
	<Huawei>system-view
	[Huawei]sysname SZ1
	[SZ1]interface GigabitEthernet0/0/0
	[SZ1-GigabitEthernet0/0/0]ip address 10.2.12.2 24
	[SZ1-GigabitEthernet0/0/0]quit
	[SZ1]interface GigabitEthernet0/0/1
	[SZ1-GigabitEthernet0/0/1]ip address 10.2.24.1 24
	[SZ1-GigabitEthernet0/0/1]quit
	[SZ1]interface GigabitEthernet0/0/2
	[SZ1-GigabitEthernet0/0/2]ip address 10.2.25.1 24
	[SZ1-GigabitEthernet0/0/2]quit
	[SZ1]interface GigabitEthernet1/0/0
	[SZ1-GigabitEthernet1/0/0]ip address 10.2.26.1 24
	[SZ1-GigabitEthernet1/0/0]quit
	[SZ1]interface GigabitEthernet2/0/0
	[SZ1-GigabitEthernet2/0/0]ip address 10.2.23.1 24
	[SZ1-GigabitEthernet2/0/0]quit
S1(S:LSW2):
  GE0/0/1: # 10.2.24.0/24
    SZ1: GE0/0/1
  GE0/0/23:
    S2: GE0/0/23
  GE0/0/24:
    S2: GE0/0/24
	command:
	<Huawei>system-view
[Huawei]sysname S1
[S1]interface GigabitEthernet0/0/1
[S1-GigabitEthernet0/0/1]port link-type trunk
[S1-GigabitEthernet0/0/1]port trunk allow-pass vlan all
[S1]interface GigabitEthernet0/0/23
[S1-GigabitEthernet0/0/23]port link-type trunk
[S1-GigabitEthernet0/0/23]port trunk allow-pass vlan all
[S1]interface GigabitEthernet0/0/24
[S1-GigabitEthernet0/0/24]port link-type trunk
[S1-GigabitEthernet0/0/24]port trunk allow-pass vlan all
S2(S:LSW3):
	GE0/0/1: # 10.2.25.0/24
		SZ1: GE0/0/2
	GE0/0/23:
		S1: GE0/0/23
	GE0/0/24:
		S1: GE0/0/24
	command:
	<Huawei>system-view
[Huawei]sysname S2
[S2]interface GigabitEthernet0/0/1
[S2-GigabitEthernet0/0/1]port link-type trunk
[S2-GigabitEthernet0/0/1]port trunk allow-pass vlan all
[S2]interface GigabitEthernet0/0/23
[S2-GigabitEthernet0/0/23]port link-type trunk
[S2-GigabitEthernet0/0/23]port trunk allow-pass vlan all
[S2]interface GigabitEthernet0/0/24
[S2-GigabitEthernet0/0/24]port link-type trunk
[S2-GigabitEthernet0/0/24]port trunk allow-pass vlan all

# 分公司
GZ(R:AR4):
	GE0/0/0: # 172.16.13.0/24
		S6: GE0/0/1
	GE0/0/1: # 172.16.12.0/24
		S5: GE0/0/1
	GE0/0/2: # # 10.2.23.0/24
		SZ1: GE2/0/0
<Huawei>system-view
[Huawei]sysname GZ
[GZ]int g0/0/0
[GZ-GigabitEthernet0/0/0]ip add 172.16.13.1 24
[GZ]int g0/0/1
[GZ-GigabitEthernet0/0/1]ip add 172.16.12.1 24
[GZ]int g0/0/2
[GZ-GigabitEthernet0/0/2]ip add 10.2.23.2 24
S5(S:LSW5):
	GE0/0/1: # 172.16.12.0/24
		GZ: GE0/0/1
	GE0/0/2: # 172.16.23.0/24
		S6: GE0/0/2
	GE0/0/4:
		PC41: E0/0/1
	GE0/0/5:
		PC51: E0/0/1
<Huawei>system-view
[Huawei]sysname S5
[S5]interface GigabitEthernet0/0/1
[S5-GigabitEthernet0/0/1]port link-type trunk
[S5-GigabitEthernet0/0/1]port trunk allow-pass vlan all
[S5]interface GigabitEthernet0/0/2
[S5-GigabitEthernet0/0/2]port link-type trunk
[S5-GigabitEthernet0/0/2]port trunk allow-pass vlan all
[S5]interface GigabitEthernet0/0/4
[S5-GigabitEthernet0/0/4]port link-type access
[S5-GigabitEthernet0/0/4]port default vlan 1
[S5]interface GigabitEthernet0/0/5
[S5-GigabitEthernet0/0/5]port link-type access
[S5-GigabitEthernet0/0/5]port default vlan 1
S6(S:LSW4):
	GE0/0/1: # 172.16.13.0/24
		GZ: GE0/0/0
	GE0/0/2: # 172.16.23.0/24
		S5: GE0/0/2
	GE0/0/6:
		PC61: E0/0/1
	GE0/0/7:
		PC71: E0/0/1
		<Huawei>system-view
[Huawei]sysname S6
[S6]interface GigabitEthernet0/0/1
[S6-GigabitEthernet0/0/1]port link-type trunk
[S6-GigabitEthernet0/0/1]port trunk allow-pass vlan all
[S6]interface GigabitEthernet0/0/2
[S6-GigabitEthernet0/0/2]port link-type trunk
[S6-GigabitEthernet0/0/2]port trunk allow-pass vlan all
[S6]interface GigabitEthernet0/0/6
[S6-GigabitEthernet0/0/6]port link-type access
[S6-GigabitEthernet0/0/6]port default vlan 1
[S6]interface GigabitEthernet0/0/7
[S6-GigabitEthernet0/0/7]port link-type access
[S6-GigabitEthernet0/0/7]port default vlan 1
PC41("PC:PC5"):
	E0/0/1:
		S5: GE0/0/4
	IP: 172.16.12.2 
	subnet mask: 255.255.255.0
	Gateway: 172.16.12.1 
# 在 PC51(CP6) 上配置
172.16.12.3 
255.255.255.0
172.16.12.1
# 在 PC61(PC7) 上配置
172.16.13.2
255.255.255.0
172.16.13.1
# 在 PC71(PC8) 上配置
172.16.13.3 
255.255.255.0
172.16.13.1
```