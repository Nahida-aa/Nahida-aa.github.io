import os
import sys

JAVA_DIR = r"D:\Program\Java"  # 修改为你的Java安装目录

def list_java_versions():
    try:
        versions = os.listdir(JAVA_DIR)
        print("Available Java versions:")
        for version in versions:
            print(version)
    except FileNotFoundError:
        print(f"Error: Directory {JAVA_DIR} not found.")

def use_java_version(version):
    java_home = os.path.join(JAVA_DIR, version)
    if not os.path.exists(java_home):
        print(f"Error: Java version {version} not found in {JAVA_DIR}")
        return

    # 设置环境变量(仅适用于当前python进程)(Windows:set, Linux:export)
    # os.environ["JAVA_HOME"] = java_home
    # os.environ["PATH"] = f"{java_home}/bin;" + os.environ["PATH"]

    # 生成设置环境变量的 shell 命令
    if os.name == 'nt':
        print(f'set JAVA_HOME={java_home}')
        print(f'set PATH={java_home}\\bin;%PATH%')
    else:
        print(f'export JAVA_HOME={java_home}')
        print(f'export PATH={java_home}/bin:$PATH')
    # 更新系统环境变量(永久)（仅适用于Windows）
    # if os.name == 'nt':
    #     os.system(f'setx JAVA_HOME "{java_home}" /M')
        # ERROR: Access to the registry path is denied.
        # os.system(f'setx PATH "{java_home}/bin;%PATH%"')

    # # 验证Java版本
    # os.system("java -version")
    # print(f"Java version switched to {version}")

def main():
    if len(sys.argv) < 2:
        print("Usage: jenv.py [command] [version]")
        print("Commands:")
        print("list, ls, -l  : List available Java versions")
        print("use [version] : Switch to specified Java version")
        sys.exit(1)

    command = sys.argv[1]

    if command in ["list", "ls", "-l"]:
        list_java_versions()
    elif command == "use":
        if len(sys.argv) < 3:
            print("Usage: manage_java.py use [version]")
            sys.exit(1)
        version = sys.argv[2]
        use_java_version(version)
    else:
        print(f"Unknown command: {command}")
        print("Usage: manage_java.py [command] [version]")
        print("Commands:")
        print("list, ls, -l  : List available Java versions")
        print("use [version] : Switch to specified Java version")
        sys.exit(1)

if __name__ == "__main__":
    main()