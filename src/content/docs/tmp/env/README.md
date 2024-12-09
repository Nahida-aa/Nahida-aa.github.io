# env

### 创建个人环境配置仓库

1. **软件安装脚本**：
   - 使用脚本（如 Bash、PowerShell 等）自动安装常用的软件。例如，可以创建一个 `install.sh` 脚本来安装你需要的软件。

2. **配置文件**：
   - 将常用软件的配置文件（如编辑器配置、终端配置等）存储在仓库中。例如，VS Code 的 `settings.json`、`.bashrc`、`.zshrc` 等。

3. **个性化设置**：
   - 存储个性化的设置和主题，例如终端主题、编辑器主题等。

4. **文档和说明**：
   - 创建 README 文件，记录如何使用这些脚本和配置文件，以及如何恢复你的工作环境。

### 示例目录结构

```
my-environment/
├── install.sh
├── config/
│   ├── vscode/
│   │   └── settings.json
│   ├── bash/
│   │   └── .bashrc
│   ├── zsh/
│   │   └── .zshrc
│   └── git/
│       └── .gitconfig
├── themes/
│   ├── terminal-theme
│   └── editor-theme
└── README.md
```

### 示例 `install.sh` 脚本

```sh
#!/bin/bash

# 更新包列表并安装常用软件
sudo apt update
sudo apt install -y git curl wget zsh

# 安装 VS Code
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
sudo install -o root -g root -m 644 packages.microsoft.gpg /usr/share/keyrings/
sudo sh -c 'echo "deb [arch=amd64 signed-by=/usr/share/keyrings/packages.microsoft.gpg] https://packages.microsoft.com/repos/vscode stable main" > /etc/apt/sources.list.d/vscode.list'
sudo apt update
sudo apt install -y code

# 安装 Oh My Zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# 复制配置文件
cp config/vscode/settings.json ~/.config/Code/User/settings.json
cp config/bash/.bashrc ~/
cp config/zsh/.zshrc ~/
cp config/git/.gitconfig ~/

echo "环境配置完成！"
```

### 示例 

README.md



```markdown
# My Environment

这是我的个人环境配置仓库，包含了常用软件的安装脚本和配置文件，帮助我在更换电脑或设备时快速恢复工作环境。

## 使用方法

1. 克隆仓库到本地：
   ```sh
   git clone https://github.com/yourusername/my-environment.git
   cd my-environment
   ```

2. 运行安装脚本：
   ```sh
   ./install.sh
   ```

3. 复制配置文件：
   ```sh
   cp config/vscode/settings.json ~/.config/Code/User/settings.json
   cp config/bash/.bashrc ~/
   cp config/zsh/.zshrc ~/
   cp config/git/.gitconfig ~/
   ```

## 包含内容

- `install.sh`：自动安装常用软件的脚本。
- `config/`：常用软件的配置文件。
- `themes/`：个性化的主题和设置。
```

### 关于 Minecraft Mod 开发

1. **是否需要 Java**：
   - Minecraft Mod 开发通常使用 Java，因为 Minecraft 本身是用 Java 编写的。虽然有一些工具和框架可以使用其他语言（如 Kotlin、Scala 等）进行开发，但 Java 仍然是最常用和支持最广泛的语言。

2. **2024 年 Minecraft 是否流行**：
   - Minecraft 自发布以来一直非常流行，并且有一个庞大的社区和持续的更新。预计在 2024 年，Minecraft 仍然会保持其流行度，特别是在 Mod 开发和社区创作方面。

请按照上述建议创建和管理你的个人环境配置仓库，并告诉我是否有任何进展或遇到新的问题。
