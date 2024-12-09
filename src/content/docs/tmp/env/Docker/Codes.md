# codes

```Dockerfile
FROM [base_image]
# 指定基础镜像，必须为 Dockerfile 文件的第一条指令
# Specifies the base image, must be the first instruction in the Dockerfile

ADD [source] [destination]
# 将 source 添加到 container 的 destination
# Add source to the destination in the container
# # source: URL, tar 文件, 目录

COPY [--chown=<user>:<group>] [source] [destination]
# 将 source 复制到 container 的 destination
# Copy source to the destination in the container
# # source: local 文件

VOLUME [path]
# or
VOLUME ["path1", "path2", ...]
# 创建一个挂载点，用于存储持久化数据
# Create a mount point for storing persistent data

WORKDIR [path]
# 设置 container 的工作目录
# Set the working directory for the container
# # 可以使用多个 WORKDIR 指令，如果使用相对路径，会基于上一个 WORKDIR 指令的路径
# # == cd [path] ? ^-^ -- Nahida-aa

ENV [key] [value]
# or
ENV [key1]=[value1] [key2]=[value2]
# 设置环境变量
# Set environment variables

CMD [command] [args]
# or
CMD ["executable", "param1", "param2", ...]
# 设置容器启动时执行的命令
# Set the command to be executed when the container starts
# # 只能有一个 CMD 指令，如果有多个，只有最后一个生效
```
