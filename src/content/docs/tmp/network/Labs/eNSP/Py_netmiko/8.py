import xml.etree.ElementTree as ET

# 解析XML文件
tree = ET.parse('xml1.xml')
root = tree.getroot()

# 打印根元素的标签名
print(f"Root element: {root.tag}")

# 命名空间
namespace = {'ns': 'book'}

# 遍历所有元素并打印书名
for book in root.findall('ns:book', namespace):
    title = book.find('ns:title', namespace).text
    print(f"Book title: {title}")

try:
    from socket import AF_UNIX, SOCK_STREAM
except ImportError:
    AF_UNIX = None

# from pprint import pprint
# from ncclient import manager
# pprint(manager.OPERATIONS)
# 打印ncclient支持的操作信息
# print(dir(manager))