# vscode-learn

## ?/Microsoft VS Code

Visual Studio Code 的安装目录，具体取决于你的操作系统和安装方式。在 Windows 上，它通常位于 C:\Program Files\Microsoft VS Code

### ?/Microsoft VS Code/bin

```md
bin is binary file
```

#### ?/Microsoft VS Code/bin/code

#### ?/Microsoft VS Code/bin/code.cmd

可以使用 code 命令行工具在命令行中启动 VS Code，或者打开特定的文件和目录。

#### ?/Microsoft VS Code/bin/code-tunnel.exe

### ?/Microsoft VS Code/locales

是 Visual Studio Code 的本地化文件目录。在这个目录下，VS Code 存储了各种语言的本地化文件，这些文件用于将 VS Code 的界面翻译成不同的语言

### ?/Microsoft VS Code/policies

用于在 Windows 环境中配置 VS Code 的策略设置。这些设置可以被 IT 管理员用来控制企业环境中的 VS Code 行为

### ?/Microsoft VS Code/resources

资源文件目录。在这个目录下，VS Code 存储了一些用于构建用户界面的资源文件，如图像、图标、样式表等

例如，VS Code 的应用图标就存储在这个目录下的 app 子目录中。此外，VS Code 的主题和语法高亮规则也存储在这个目录下的 app/extensions 子目录中

#### ?/Microsoft VS Code/resources/app

```md
----                 -------------         ------ ----
d----            2024/5/3     2:22                bin
d----            2024/5/3     2:22                locales
d----            2024/5/3     2:22                policies
d----            2024/5/3     2:22                resources
da---            2024/5/3     2:22                tools
-a---            2024/5/1     2:09         167733 chrome_100_percent.pak
-a---            2024/5/1     2:10         227823 chrome_200_percent.pak
-a---            2024/5/1     2:45      167826976 Code.exe
-a---            2024/5/1     2:09            367 Code.VisualElementsManifest.xml
-a---            2024/5/1     2:45        4927032 d3dcompiler_47.dll
-a---            2024/5/1     2:45        2556008 ffmpeg.dll
-a---            2024/5/1     2:09       10717392 icudtl.dat
-a---            2024/5/1     2:45         498792 libEGL.dll
-a---            2024/5/1     2:45        7829096 libGLESv2.dll
-a---            2024/5/1     2:10        9004261 LICENSES.chromium.html
-a---            2024/5/1     2:09        5152645 resources.pak
-a---            2024/5/1     2:10         276794 snapshot_blob.bin
-a---            2024/5/3     2:35        9353833 unins000.dat
-a---            2024/5/3     2:21        2629040 unins000.exe
-a---            2024/5/3     2:22           8775 unins000.msg
-a---            2024/5/1     2:09         642581 v8_context_snapshot.bin
-a---            2024/5/1     2:10            106 vk_swiftshader_icd.json
-a---            2024/5/1     2:45        5259368 vk_swiftshader.dll
-a---            2024/5/1     2:45         967784 vulkan-1.dll
```

## username/.vscode

用户级别的 VS Code 配置目录，存储了用户的设置、键盘快捷方式、代码片段和扩展。在 Windows 上，它通常位于 C:\Users\{username}\.vscod

## username/AppData/Roaming/Code

VS Code 的用户数据目录，存储了 VS Code 的状态、工作区设置等。在 Windows 上，它通常位于 C:\Users\{username}\AppData\Roaming\Code
