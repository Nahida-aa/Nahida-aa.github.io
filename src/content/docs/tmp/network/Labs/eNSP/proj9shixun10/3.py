import nmap
import socket
import ipaddress
from tabulate import tabulate

# 格式化并打印扫描结果
def print_scan_results():
    csv_data = nm.csv().strip().split('\n')
    headers = csv_data[0].split(';')
    rows = [row.split(';') for row in csv_data[1:]]
    print(tabulate(rows, headers=headers, tablefmt='grid'))
        
# 初始化nmap扫描器
nm = nmap.PortScanner()

# 获取本机IP地址
def get_local_ip():
    hostname = socket.gethostname()
    local_ip = socket.gethostbyname(hostname)
    return local_ip

# 获取本机网络
def get_local_network():
    local_ip = get_local_ip()
    network = ipaddress.ip_network(local_ip + '/24', strict=False)
    return str(network)

# 获取本机网络中的所有主机
def get_hosts_in_network(network):
    nm.scan(hosts=network, arguments='-sn')
    hosts = [host for host in nm.all_hosts() if nm[host].state() == 'up']
    return hosts

# 1. 在主机上1～4000端口进行TCP SYN扫描
def tcp_syn_scan(target_host):
    nm.scan(target_host, '1-4000', '-v -sS')
    print("TCP SYN扫描结果:")
    print_scan_results()

# 2. 在主机上1～1024端口进行UDP扫描
def udp_scan(target_host):
    nm.scan(target_host, '1-1024', '-v -sU')
    print("UDP扫描结果:")
    print_scan_results()
    
# 3. 在主机上1～4000端口扫描正在运行的服务
def service_scan(target_host):
    print("服务扫描结果:")
    nm.scan(target_host, '1-4000', '-v -sS -sV -sC -A')
    print_scan_results()
    
# 4. 在主机上1～4000端口进行不带参数扫描
def default_scan(target_host):
    nm.scan(target_host, '1-4000')
    print("不带参数扫描结果:")
    print_scan_results()
    
# 5. 探测主机上操作系统版本
def os_detection(target_host):
    print("操作系统版本探测结果:")
    print(nm.scan(target_host, arguments='-O')['scan'][target_host])
    
# 6. 对指定主机进行TCP SYN扫描
def specific_tcp_syn_scan(target_host):
    nm.scan(target_host, arguments='-v -sS')
    print("指定主机TCP SYN扫描结果:")
    print_scan_results()
    
# 7. 对一个网络进行ping扫描
def ping_scan(target_network):
    nm.scan(hosts=target_network, arguments='-n -sP')
    print("网络ping扫描结果:")
    for host in nm.all_hosts():
        print(f"Host: {host}, State: {nm[host].state()}")
    
# 主菜单
def main():
    local_ip = get_local_ip()
    local_network = get_local_network()
    hosts = get_hosts_in_network(local_network)

    print(f"本机IP地址: {local_ip}")
    print(f"本机网络: {local_network}")
    print("网络中的主机列表:")
    for i, host in enumerate(hosts):
        print(f"{i + 1}. {host}")

    while True:
        print("\n请选择要执行的功能:")
        print("1. 在主机上1～4000端口进行TCP SYN扫描")
        print("2. 在主机上1～1024端口进行UDP扫描")
        print("3. 在主机上1～4000端口扫描正在运行的服务")
        print("4. 在主机上1～4000端口进行不带参数扫描")
        print("5. 探测主机上操作系统版本")
        print("6. 对指定主机进行TCP SYN扫描")
        print("7. 对一个网络进行ping扫描")
        print("8. 退出")
        choice = input("请输入选项(1-8): ")
        if choice in ['1', '2', '3', '4', '5', '6']:
            print("请选择目标主机:")
            for i, host in enumerate(hosts):
                print(f"{i + 1}. {host}")
            host_choice = int(input("请输入主机编号: ")) - 1
            target_host = hosts[host_choice]

            if choice == '1':
                tcp_syn_scan(target_host)
            elif choice == '2':
                udp_scan(target_host)
            elif choice == '3':
                service_scan(target_host)
            elif choice == '4':
                default_scan(target_host)
            elif choice == '5':
                os_detection(target_host)
            elif choice == '6':
                specific_tcp_syn_scan(target_host)
        elif choice == '7':
            ping_scan(local_network)
        elif choice == '8':
            print("退出程序")
            break
        else:
            print("无效的选项，请重新输入")

if __name__ == "__main__":
    main()