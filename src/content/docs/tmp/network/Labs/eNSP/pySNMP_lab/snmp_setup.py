from pysnmp.hlapi import *
import csv

def use_getCmd(engine, userdata, target, context,oid_str,desc_oid):
    oid = ObjectIdentity(oid_str)
    obj= ObjectType(oid)
    g= getCmd(engine, userdata, target, context, obj)
    errorindication,errorStatus, errorindex, varBinds = next(g)
    for i in varBinds:
        print(desc_oid,i)#i是 ObjectType 对象
# 通过函数 use_bukCmd()获取的节点下有叶子节点或一个叶子节点有许多值，需要遍历
def use_bulkCmd(engine, userdata, target, context,oid_str,desc_oid):
    oid = ObjectIdentity(oid_str)
    obj = ObjectType(oid)
    g = bulkCmd(engine, userdata, target, context, 0, 50, obj, lexicographicMode=False)# 设置循环次数，足够将 OID 下的值取完
    MAX_REPS = 500
    count=0
    while (count < MAX_REPS):
        try:
            errorindication, erorStatus, errorindex, varBinds = next(g)
            for i in varBinds:
                print(desc_oid,i)   # 取完 OID 值，停止迭代
        except StopIteration:
            break
        count += 1
def SNMP_Init(ip):
    engine = SnmpEngine()
    userdata = UsmUserData("user01",
                            authKey="Huawei@123",
                            privKey = "Huawei@123",
                            authProtocol = usmHMACSHAAuthProtocol,
                            privProtocol = usmAesCfb128Protocol)
    target = UdpTransportTarget((ip, 161))
    context = ContextData()
    return engine, userdata, target, context

if __name__ == "__main__":
    # 输入设备管理 IP 地址
    mgmt_ip = input("请输入设备管理 IP 地址:")
    # 初始化 PySNMP 的参数
    engine, userdata, target, context = SNMP_Init(mgmt_ip)
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
    except FileNotFoundError:
        print("the file does not exist.")