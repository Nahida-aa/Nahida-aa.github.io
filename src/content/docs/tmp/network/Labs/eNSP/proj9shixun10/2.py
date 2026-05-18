# 要写入的Python数据
import yaml

data = {
    'hash': {
        'name': 'Steve',
        'foo': 'bar'
    }
}

# 将Python数据写入到config.yaml文件
with open('config.yaml', 'w', encoding='utf-8') as file:
    yaml.dump(data, file, allow_unicode=True)

print("数据已写入到config.yaml文件中")