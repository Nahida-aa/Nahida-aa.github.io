@echo off

REM 设置 Java 安装目录
set JAVA_DIR=D:\Program\Java

REM 列出可用的 Java 版本
if "%1"=="list" goto :list_versions
if "%1"=="ls" goto :list_versions
if "%1"=="-l" goto :list_versions
REM 显示当前的 Java 版本
if "%1"=="info" goto :show_info
REM 切换到指定的 Java 版本
if "%1"=="use" goto :use_version
REM 显示帮助信息
goto :show_help

:list_versions
echo Available Java versions:
for /d %%d in ("%JAVA_DIR%\*") do (
    echo %%~nxd
)
goto :eof

:show_info
java -version
goto :eof

:use_version
if "%2"=="" (
    echo Usage: jenv.bat use [version]
    goto :eof
)
set JAVA_HOME=%JAVA_DIR%\%2
if not exist "%JAVA_HOME%" (
    echo Error: Java version %2 not found in %JAVA_DIR%
    goto :eof
)
set PATH=%JAVA_HOME%\bin;%PATH%
echo Switched to Java version %2
java -version
goto :eof

REM 显示帮助信息
:show_help
echo Usage: jenv.bat [command] [version]
echo Commands:
echo list, ls, -l  : List available Java versions
echo use [version] : Switch to specified Java version
echo info          : Show current Java version

java -version
:eof
