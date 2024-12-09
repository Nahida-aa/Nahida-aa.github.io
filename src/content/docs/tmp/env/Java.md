# Java-sdkman-MSYS2

```sh
# 安装必要的依赖： 确保你已经安装了 curl 和 zip，可以使用以下命令安装
pacman -S curl zip unzip
# 安装 SDKMAN
curl -s "https://get.sdkman.io" | bash
# 加载 SDKMAN
source "$HOME/.sdkman/bin/sdkman-init.sh"
# 验证安装
sdk version
# output
SDKMAN 5.11.4+362
# else: 强制更新 SDKMAN
sdk selfupdate force

# use sdk
# 列出可用的 SDK
sdk list
# 安装 SDK： 例如，安装特定版本的 Java
sdk install java 8.0.292-open
# 切换 SDK 版本
sdk use java 8.0.292-open
java -version
# 设置默认 SDK 版本
sdk default java 11.0.11.hs-adpt

sdk install maven
sdk use maven 3.8.1
mvn -version
```

## 另外一种方案

```bat
```

## Redis

```sh
# 安装 Redis
pacman -S mingw-w64-x86_64-redis
# if not found, try
pacman -S msys2-devel

# 下载 Redis 源代码
mkdir -p ~/src
cd ~/src
curl -O http://download.redis.io/releases/redis-6.2.6.tar.gz
tar xzf redis-6.2.6.tar.gz
cd redis-6.2.6
# 编译 Redis
make
make test
# 安装 Redis 到 /usr/local/bin
make install
ls /usr/local/bin -alh
ln -s /usr/local/bin/redis-server /usr/bin/redis-server.exe
ln -s /usr/local/bin/redis-cli /usr/bin/redis-cli.exe
```
