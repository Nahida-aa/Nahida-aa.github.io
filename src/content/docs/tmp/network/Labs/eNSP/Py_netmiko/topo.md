```yml
SW1:
  interfaces:
    Ethernet0/0/1:
      Cloud2: Ethernet0/0/1
    Ethernet0/0/2:
      CE1: GE1/0/0
    Ethernet0/0/3:
      SW-1: GE0/0/1
    Ethernet0/0/4:
      SW-2: GE0/0/1
    Ethernet0/0/5:
      SW-3: GE0/0/1
    Ethernet0/0/6:
      SW-4: GE0/0/1
    Ethernet0/0/7:
      SW-5: GE0/0/1
  commands:
    - 检查:
      - display interface brief
      - display ip interface brief
    - 配置:
      - interface Ethernet0/0/1
      - port link-type access
      - port default vlan 1
      - undo shutdown
      - interface Ethernet0/0/2
      - port link-type access
      - port default vlan 1
      - undo shutdown
Cloud2: # 192.168.11.1/24
  interfaces:
    Ethernet0/0/3:
      SW1: Ethernet0/0/1
CE1: # 192.168.11.200/24
  interfaces:
    GE1: 
      SW1: Ethernet0/0/2
  commands:
    - 检查:
      - display interface brief
      - display ip interface brief
      - display current-configuration | include netconf
      - display current-configuration | include ssh

SW-1: # 192.168.11.11/24
  interfaces:
    GE0/0/1:
      SW1: Ethernet0/0/3
SW-2: # 192.168.11.12/24
  interfaces:
    GE0/0/1:
      SW1: Ethernet0/0/4
SW-3: # 192.168.11.13/24
  interfaces:
    GE0/0/1:
      SW1: Ethernet0/0/5
SW-4: # 192.168.11.14/24
  interfaces:
    GE0/0/1:
      SW1: Ethernet0/0/6
SW-5: # 192.168.11.15/24
  interfaces:
    GE0/0/1:
      SW1: Ethernet0/0/7
```
