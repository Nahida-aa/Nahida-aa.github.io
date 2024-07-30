import os
import shutil

# 定义源目录和目标目录
source_dir = os.path.join(os.getcwd(), 'dist', 'build', 'h5')
dest_dir = os.path.join(os.getcwd(), 'docs')

# 确保目标目录存在，如果不存在则创建
os.makedirs(dest_dir, exist_ok=True)

# 复制目录内容
try:
    for root, dirs, files in os.walk(source_dir):
        # 计算相对路径
        relative_path = os.path.relpath(root, source_dir)
        # 计算目标路径
        dest_path = os.path.join(dest_dir, relative_path)
        # 确保目标路径存在
        os.makedirs(dest_path, exist_ok=True)
        for file in files:
            # 复制文件到目标路径
            shutil.copy2(os.path.join(root, file), os.path.join(dest_path, file))
    print('文件已成功复制到 ./docs 目录')
except Exception as e:
    print(f'复制文件时出错: {e}')