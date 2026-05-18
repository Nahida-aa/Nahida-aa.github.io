from ncclient import manager

# def check_device_config(host, port, username, password):
#     with manager.connect(
#         host=host,
#         port=port,
#         username=username,
#         password=password,
#         hostkey_verify=False,
#         timeout=30
#     ) as m:
#         # 检查NETCONF服务配置
#         netconf_config = m.get_config(source='running').data_xml
#         if 'snetconf server enable' not in netconf_config:
#             raise Exception("NETCONF服务未启用")
        
#         # 检查SSH服务配置
#         ssh_config = m.get_config(source='running').data_xml
#         if 'stelnet server enable' not in ssh_config:
#             raise Exception("SSH服务未启用")
        
#         # 检查用户权限配置
#         user_config = m.get_config(source='running').data_xml
#         if 'local-user netconf privilege level 3' not in user_config:
#             raise Exception("用户权限配置不正确")
# # 连接到设备并进行检查
# check_device_config(
#     host='192.168.11.200',  # 替换为你的设备IP地址
#     port=830,
#     username='netconf',  # 替换为你的用户名
#     password='Huawei12#$',  # 替换为你的新密码
# )
# 连接到设备
with manager.connect(
    host='192.168.11.200',  # 替换为你的设备IP地址
    port=830,
    username='netconf',  # 替换为你的用户名
    password='Huawei12#$',  # 替换为你的密码
    hostkey_verify=False,
    device_params={'name': 'huaweiyang'},  # 指定设备类型
    allow_agent=False,
    look_for_keys=False,
    timeout=30,  # 增加超时时间
) as m:
    # 获取设备配置
    # config = m.get_config(source='running').data_xml
    config = m.get().data_xml
    print(config)
    with open('device_config.xml', 'w', encoding='utf-8') as f:
        f.write(config)
    print("配置已保存到 device_config.xml 文件中")