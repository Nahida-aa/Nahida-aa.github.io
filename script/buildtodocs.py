import os
import shutil

# 定义源目录和目标目录
source_dir = os.path.join(os.getcwd(), 'dist', 'build', 'h5')
dest_dir = os.path.join(os.getcwd(), 'docs')

# 确保目标目录存在，如果不存在则创建
os.makedirs(dest_dir, exist_ok=True)

# 复制目录内容
try:
    # 使用 shutil.copytree 复制目录内容
    if os.path.exists(dest_dir):
        shutil.rmtree(dest_dir)  # 删除目标目录中的现有内容
    shutil.copytree(source_dir, dest_dir)
    print('文件已成功复制到 ./docs 目录')
except Exception as e:
    print(f'复制文件时出错: {e}')