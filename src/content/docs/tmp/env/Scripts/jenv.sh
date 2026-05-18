#!/bin/bash

# 设置 Java 安装目录
JAVA_DIR="/d/Program/Java"  # 修改为你的Java安装目录

# 列出可用的 Java 版本
if [[ "$1" == "list" || "$1" == "ls" || "$1" == "-l" ]]; then
    echo "Available Java versions:"
    for dir in "$JAVA_DIR"/*; do
        if [ -d "$dir" ]; then
            echo "$(basename "$dir")"
        fi
    done
    exit 0
fi

# 切换到指定的 Java 版本
if [[ "$1" == "use" ]]; then
    if [ -z "$2" ]; then
        echo "Usage: set_java.sh use [version]"
        exit 1
    fi
    JAVA_HOME="$JAVA_DIR/$2"
    if [ ! -d "$JAVA_HOME" ]; then
        echo "Error: Java version $2 not found in $JAVA_DIR"
        exit 1
    fi
    export JAVA_HOME
    export PATH="$JAVA_HOME/bin:$PATH"
    echo "Switched to Java version $2"
    java -version
    exit 0
fi

# 显示帮助信息
echo "Usage: set_java.sh [command] [version]"
echo "Commands:"
echo "list, ls, -l  : List available Java versions"
echo "use [version] : Switch to specified Java version"