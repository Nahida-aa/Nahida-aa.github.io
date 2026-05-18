# import pysnmp
# pysnmp.__version__

from pysnmp.hlapi import *
import csv

# 通过函数 use_getCmd() 获取的 OID 值是 一个叶子节点
def use_getCmd(engine, userdata, target, context, oid_str, desc_oid):
    oid = ObjectIdentity(oid_str)
    obj = ObjectType(oid)
    g = getCmd(engine, userdata, target, context, obj)
    errorIndication, errorStatus, errorIndex, varBinds = next(g)
    for i in varBinds:
        print(desc_oid, i) # i 是 ObjectType 对象
    
# 通过 use_bulkCmd() 获取的节点下有 叶子节点 或 一个叶子节点有多个值，需要遍历
def use_bulkCmd(engine, userdata, target, context, oid_str, desc_oid):
    oid = ObjectIdentity(oid_str)
    obj = ObjectType(oid)
    g = bulkCmd(engine, userdata, target, context, 0, 50, obj, lexicographicMode=False)
    MAX_REPES = 500
    count = 0
    while (count<MAX_REPES):
        try:
            errorIndication, errorStatus, errorIndex, varBinds = next(g)
            for i in varBinds:
                print(desc_oid, i)
        # 取完 OID 值后，停止迭代
        except StopIteration:
            break
        count += 1

# 函数 SNMP_init() 用于初始化 SNMP
def SNMP_init(ip):
    snmpEngine = SnmpEngine()
    userdata = UsmUserData('use01', 
                           authKey='Huawei@123',
                           privKey='HuaWei@123',
                            authProtocol=usmHMACSHAAuthProtocol,
                            privProtocol=usmAesCfb128Protocol
                           )
    target = UdpTransportTarget((ip, 161))
    context = ContextData()
    return snmpEngine, userdata, target, context

if __name__ == '__main__':
    # 输入设备管理
    mgmt_ip = input('请输入设备管理 IP 地址：')
    # 初始化 PySNMP 参数
    engine, userdata, target, context = SNMP_init(mgmt_ip)
    try:
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
    except Exception as e:
        print(e)