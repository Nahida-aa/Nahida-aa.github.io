# [?/Microsoft VS Code](Microsoft-VS-Code/README.md)

Visual Studio Code 的安装目录，具体取决于你的操作系统和安装方式。在 Windows 上，它通常位于 C:\Program Files\Microsoft VS Code

## ?/Microsoft VS Code/bin

```md
bin is binary file
```

### ?/Microsoft VS Code/bin/code

### ?/Microsoft VS Code/bin/code.cmd

可以使用 code 命令行工具在命令行中启动 VS Code，或者打开特定的文件和目录。

### ?/Microsoft VS Code/bin/code-tunnel.exe

## ?/Microsoft VS Code/locales

是 Visual Studio Code 的本地化文件目录。在这个目录下，VS Code 存储了各种语言的本地化文件，这些文件用于将 VS Code 的界面翻译成不同的语言

## ?/Microsoft VS Code/policies

用于在 Windows 环境中配置 VS Code 的策略设置。这些设置可以被 IT 管理员用来控制企业环境中的 VS Code 行为

## ?/Microsoft VS Code/resources

资源文件目录。在这个目录下，VS Code 存储了一些用于构建用户界面的资源文件，如图像、图标、样式表等

例如，VS Code 的应用图标就存储在这个目录下的 app 子目录中。此外，VS Code 的主题和语法高亮规则也存储在这个目录下的 app/extensions 子目录中

### ?/Microsoft VS Code/resources/app

#### ?/Microsoft VS Code/resources/app/extensions

内置扩展目录

#### ?/Microsoft VS Code/resources/app/licenses

#### ?/Microsoft VS Code/resources/app/node_modules.asar.unpacked

存储那些不能被打包到 .asar 文件中的 Node.js 模块

#### ?/Microsoft VS Code/resources/app/out

大部分是 JavaScript 文件，这些文件是 VS Code 的源代码经过编译（转换）后的结果。这些 JavaScript 文件在 VS Code 运行时被加载和执行，以提供 VS Code 的各种功能

#### ?/Microsoft VS Code/resources/app/resources/win32

#### ?/Microsoft VS Code/resources/app/package.json

#### ?/Microsoft VS Code/resources/app/product.json

包含 Visual Studio Code 产品信息的 JSON 文件。这个文件包含了一些关于 VS Code 的元数据，如版本号、产品名称、发布日期等

## ?/Microsoft VS Code/tools

存储了一些用于构建 VS Code 的工具。这些工具可以帮助开发人员构建、调试和测试 VS Code

```md
inno_updater.exe
vcruntime140.dll
```

## ?/Microsoft VS Code/Code.exe

## ?/Microsoft VS Code/unins000.exe

## ?/Microsoft VS Code/ffmpeg.dll

是一个动态链接库（DLL）文件，用于在 Visual Studio Code 中处理音频和视频

是 FFmpeg 项目的一部分，FFmpeg 是一个用于处理音频和视频的开源库。VS Code 使用 ffmpeg.dll 来播放音频和视频，例如在 Markdown 预览中播放嵌入的音频和视频

## ?/Microsoft VS Code/Code.VisualElementsManifest.xml

定义 Visual Studio Code 在 Windows 10 的开始菜单中的磁贴的视觉元素
