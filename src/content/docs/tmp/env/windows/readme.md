# windows

Windows系统的文件结构是基于驱动器的层次结构。每个驱动器（如C:、D:等）都包含文件和文件夹。以下是Windows系统文件结构的基本概述：

1. **根目录**：每个驱动器都有一个根目录。例如，C:驱动器的根目录是C:\。

2. **系统文件夹**：
   - Windows：存放Windows操作系统的核心文件。
   - `C:\Program Files`：默认安装程序的目录。
   - `C:\Program Files (x86)`：32位程序的默认安装目录（在64位系统上）。
   - Users：存放用户个人文件和设置的目录。

3. **用户文件夹**：
   - `C:\Users\<用户名>`：每个用户都有一个独立的文件夹，包含桌面、文档、下载、图片等子文件夹。

4. **临时文件夹**：
   - Temp：存放系统临时文件。
   - `C:\Users\<用户名>\AppData\Local\Temp`：存放用户临时文件。

5. **隐藏文件夹**：
   - ProgramData：存放应用程序的公共数据。
   - `C:\Users\<用户名>\AppData`：存放用户应用程序数据，分为Local、LocalLow和Roaming三个子文件夹。

这些文件夹和目录构成了Windows系统的基本文件结构。用户可以通过文件资源管理器（File Explorer）浏览和管理这些文件和文件夹。

## file structure

- $SysReset/
- $WINDOWS.~BT/
- $Windows.~WS/
- $WinREAgent/
- Microsoft/
- MTSN/
- Program Files/ 默认安装程序的目录
- Program Files (x86)/ 32位程序的默认安装目录（在64位系统上）
- ProgramData/ 存放应用程序的公共数据
- Windows/ 存放Windows操作系统的核心文件
  - Temp/ 存放系统临时文件
- Users/username/
  - Videos/
  - Pictures/
    - Camera Roll/
    - Screenshots/
  - Documents/
  - Downloads/
  - Music/
  - Desktop/
  - AppData/ 存放用户应用程序数据
    - Local/
      - Temp/ 存放用户临时文件
    - LocalLow/
    - Roaming/
