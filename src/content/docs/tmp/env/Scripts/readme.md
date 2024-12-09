# env_var

Windows(nt) : Process_env = user_env + system_env

```sh
# view current Process_env
printenv
# or 
env
# if Windows
set
# if python
import os
os.environ

# view current User_env
# if cmd
reg query HKEY_CURRENT_USER\Environment

# view current System_env
# if cmd
reg query HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Environment
```

```sh
# 查看指定环境变量
echo $JAVA_HOME
# if Windows
echo %JAVA_HOME%
# if python
import os
os.environ["JAVA_HOME"]
```

eg.
```sh
C:\Users\aa>set
# Custom
aa_scripts=D:\github\env\env-os\Scripts
# all_users_profile 
ALLUSERSPROFILE=C:\ProgramData
# Custom
Android=D:\github\Android\platform-tools-latest-windows\platform-tools
APPDATA=C:\Users\aa\AppData\Roaming
# chocolatey 包管理器 安装目录
ChocolateyInstall=C:\ProgramData\chocolatey
ChocolateyLastPathUpdate=133637841162784463
CLINK_DIR=D:\Program Files (x86)\clink
clink_dummy_capture_env=
CommonProgramFiles=C:\Program Files\Common Files
CommonProgramFiles(x86)=C:\Program Files (x86)\Common Files
CommonProgramW6432=C:\Program Files\Common Files
COMPUTERNAME=NAHIDA
ComSpec=C:\Windows\system32\cmd.exe
conda=D:\anaconda3;D:\anaconda3\Scripts;D:\anaconda3\Library\bin;D:\anaconda3\Library\mingw-w64\bin;
CONDA_BAT=D:\anaconda3\condabin\conda.bat
CONDA_EXE=D:\anaconda3\Scripts\conda.exe
CONDA_SHLVL=0
DriverData=C:\Windows\System32\Drivers\DriverData
GRADLE_HOME=D:\Program\Java\gradle-8.4
HOMEDRIVE=C:
HOMEPATH=\Users\aa
IntelliJ IDEA=D:\Program\JetBrains\IntelliJ IDEA 2024.2\bin;
JAVA_HOME=D:\Program\Java\jdk-17.0.12
LOCALAPPDATA=C:\Users\aa\AppData\Local
LOGONSERVER=\\NAHIDA
MAVEN_HOME=D:\Program\apache-maven-3.9.9
NUMBER_OF_PROCESSORS=16
OneDrive=D:\OneDrive
OS=Windows_NT
Path=D:\anaconda3\condabin;D:\msys64\usr\bin\;C:\Windows\system32;C:\Windows;C:\Windows\System32\Wbem;C:\Windows\System32\WindowsPowerShell\v1.0\;C:\Windows\System32\OpenSSH\;D:\Git\cmd;C:\Program Files\Docker\Docker\resources\bin;C:\ProgramData\chocolatey\bin;D:\nodejs\;D:\Program\Neovide\;D:\Program\Tencent\微信web开发者工具\dll;D:\Program\Java\jdk-17.0.12\bin;D:\Program\apache-maven-3.9.9\bin;C:\Program Files\MySQL\MySQL Server 8.0\bin;D:\Program\Java\gradle-8.4\bin;$aa_scripts$;D:\msys64\usr\bin\;D:\msys64\ucrt64\bin;D:\anaconda3\condabin;C:\Windows\system32;C:\Windows;C:\Windows\System32\Wbem;C:\Windows\System32\WindowsPowerShell\v1.0\;C:\Windows\System32\OpenSSH\;D:\Git\cmd;C:\Program Files\Docker\Docker\resources\bin;C:\ProgramData\chocolatey\bin;D:\nodejs\;D:\Program\Neovide\;D:\Program\Tencent\微信web开发者工具\dll;D:\Program\apache-maven-3.9.9\bin;C:\Program Files\MySQL\MySQL Server 8.0\bin;C:\Program Files\MySQL\MySQL Shell 8.0\bin\;C:\Users\aa\AppData\Local\pnpm;D:\aa\AppData\Local\Programs\Microsoft VS Code\bin;D:\Program\fastfetch;D:\Program\pandoc-3.2-windows-x86_64\pandoc-3.2;D:\anaconda3;D:\anaconda3\Scripts;D:\anaconda3\Library\bin;D:\anaconda3\Library\mingw-w64\bin;;
PATHEXT=.COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JS;.JSE;.WSF;.WSH;.MSC
PNPM_HOME=C:\Users\aa\AppData\Local\pnpm
PROCESSOR_ARCHITECTURE=AMD64
PROCESSOR_IDENTIFIER=AMD64 Family 25 Model 80 Stepping 0, AuthenticAMD
PROCESSOR_LEVEL=25
PROCESSOR_REVISION=5000
ProgramData=C:\ProgramData
ProgramFiles=C:\Program Files
ProgramFiles(x86)=C:\Program Files (x86)
ProgramW6432=C:\Program Files
PROMPT=$P$G
PSModulePath=C:\Program Files\WindowsPowerShell\Modules;C:\Windows\system32\WindowsPowerShell\v1.0\Modules
PT8HOME=D:\Program\Cisco Packet Tracer 8.2.2
PUBLIC=C:\Users\Public
SESSIONNAME=Console
SystemDrive=C:
SystemRoot=C:\Windows
TEMP=C:\Users\aa\AppData\Local\Temp
terminal_ext=D:\Program\fastfetch
TMP=C:\Users\aa\AppData\Local\Temp
USERDOMAIN=NAHIDA
USERDOMAIN_ROAMINGPROFILE=NAHIDA
USERNAME=aa
USERPROFILE=C:\Users\aa
windir=C:\Windows
WSLENV=WT_SESSION:WT_PROFILE_ID:
WT_PROFILE_ID={0caa0dad-35be-5f56-a8ff-afceeeaa6101}
WT_SESSION=d74c7c99-bd1d-4fd7-9854-385f813a9f39
```

## update env_var

```sh
# refresh 刷新 (in cmd)
# #refreshenv 是由 Chocolatey 包管理器提供的一个命令
# #将新的系统变量和用户变量合并到当前进程的环境变量中，但不会删除在进程中临时设置的变量
refreshenv
```

```sh
# 
set JAVA_HOME=D:\Program\Java\jdk-17.0.12
set JAVA_HOME=D:\Program\Java\openjdk-22.0.2
set PATH=%JAVA_HOME%\bin;%PATH%

# 导出到子进程中（==set
export JAVA_HOME=D:\Program\Java\jdk-17.0.12
```

在 Windows 系统中，环境变量的优先级如下：

1. **进程环境变量**：在当前命令提示符会话或脚本中使用 `set` 命令设置的环境变量。
2. **用户环境变量**：为当前用户设置的持久化环境变量。
3. **系统环境变量**：为所有用户设置的持久化环境变量。

当同一个环境变量在多个级别上都被设置时，优先级较高的级别会覆盖优先级较低的级别。例如，如果 [`JAVA_HOME`] 同时在用户环境变量和系统环境变量中被设置，那么用户环境变量的值会优先于系统环境变量的值。

```python
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

    # 设置环境变量(仅适用于当前进程)
    os.environ["JAVA_HOME"] = java_home
    os.environ["PATH"] = f"{java_home}/bin;" + os.environ["PATH"]

    # 更新系统环境变量(永久)（仅适用于Windows）
    # if os.name == 'nt':
    #     os.system(f'setx JAVA_HOME "{java_home}" /M')
        # ERROR: Access to the registry path is denied.
        # os.system(f'setx PATH "{java_home}/bin;%PATH%"')

    # 验证Java版本
    os.system("java -version")
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
    elif command == "use" and len(sys.argv) == 3:
        version = sys.argv[2]
        use_java_version(version)
    else:
        print("Invalid command or missing version.")
        sys.exit(1)

if __name__ == "__main__":
    main()
```