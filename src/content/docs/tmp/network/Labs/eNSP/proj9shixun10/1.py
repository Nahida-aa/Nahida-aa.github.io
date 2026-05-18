import yaml # pip install pyyaml

# 读取YAML文件
with open('test2.yaml', 'r', encoding='utf-8') as file:
    data = yaml.safe_load(file)

# 打印解析结果
print(data)