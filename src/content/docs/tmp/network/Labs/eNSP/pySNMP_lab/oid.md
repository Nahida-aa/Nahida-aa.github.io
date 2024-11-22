### 步骤 (2)：通过 MIB 管理工具获取 OID

要通过 MIB 管理工具获取 OID，你可以使用 iReasoning MIB Browser 或类似的工具。以下是详细步骤：

#### 1. 下载并安装 iReasoning MIB Browser

你可以从 iReasoning 的官方网站下载 MIB Browser 工具，并按照安装说明进行安装。

#### 2. 配置 SNMPv3 用户

在 MIB Browser 中配置 SNMPv3 用户，以便能够连接到 [`SZ1`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FD%3A%2Fgithub%2Fnetwork%2FLabs%2FeNSP%2FpySNMP_lab%2Frun.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A27%2C%22character%22%3A4%7D%7D%5D%2C%22aec3d817-4755-403d-b7fd-8b56ca982d4f%22%5D "Go to definition") 和 [`SZ2`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FD%3A%2Fgithub%2Fnetwork%2FLabs%2FeNSP%2FpySNMP_lab%2Frun.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A15%2C%22character%22%3A2%7D%7D%5D%2C%22aec3d817-4755-403d-b7fd-8b56ca982d4f%22%5D "Go to definition") 路由器。

1. 打开 iReasoning MIB Browser。
2. 选择 `File` -> `Settings`。
3. 在 `Settings` 窗口中，选择 `SNMPv3` 选项卡。
4. 点击 `Add` 按钮，添加一个新的 SNMPv3 用户。
5. 填写以下信息：
   - `User Name`: [`user01`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FD%3A%2Fgithub%2Fnetwork%2FLabs%2FeNSP%2FpySNMP_lab%2Frun.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A339%2C%22character%22%3A23%7D%7D%5D%2C%22aec3d817-4755-403d-b7fd-8b56ca982d4f%22%5D "Go to definition")
   - `Auth Protocol`: `SHA`
   - `Auth Password`: `Huawei@123`
   - `Priv Protocol`: `AES128`
   - `Priv Password`: `Huawei@123`
6. 点击 `OK` 保存配置。

#### 3. 连接到路由器

1. 在 iReasoning MIB Browser 主界面中，输入路由器的 IP 地址（例如 `10.2.12.2`）和端口号（默认是 `161`）。
2. 选择 `SNMPv3` 作为协议。
3. 选择刚刚配置的 SNMPv3 用户 [`user01`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FD%3A%2Fgithub%2Fnetwork%2FLabs%2FeNSP%2FpySNMP_lab%2Frun.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A339%2C%22character%22%3A23%7D%7D%5D%2C%22aec3d817-4755-403d-b7fd-8b56ca982d4f%22%5D "Go to definition")。
4. 点击 `Advanced` 按钮，确保 `Context Name` 和 `Context Engine ID` 留空。
5. 点击 `OK` 连接到路由器。

#### 4. 获取 OID 信息

1. 在左侧的 MIB 树中，展开 [`iso`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FD%3A%2Fgithub%2Fnetwork%2FLabs%2FeNSP%2FpySNMP_lab%2Frun.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A335%2C%22character%22%3A31%7D%7D%5D%2C%22aec3d817-4755-403d-b7fd-8b56ca982d4f%22%5D "Go to definition") -> `org` -> `dod` -> `internet` -> `mgmt` -> `mib-2`。
2. 你可以在 `mib-2` 下找到各种子节点，例如 [`system`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FD%3A%2Fgithub%2Fnetwork%2FLabs%2FeNSP%2FpySNMP_lab%2Frun.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A19%2C%22character%22%3A4%7D%7D%5D%2C%22aec3d817-4755-403d-b7fd-8b56ca982d4f%22%5D "Go to definition")、`interfaces`、[`ip`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FD%3A%2Fgithub%2Fnetwork%2FLabs%2FeNSP%2FpySNMP_lab%2Frun.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A22%2C%22character%22%3A4%7D%7D%5D%2C%22aec3d817-4755-403d-b7fd-8b56ca982d4f%22%5D "Go to definition")、`icmp`、`tcp`、`udp`、[`snmp`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FD%3A%2Fgithub%2Fnetwork%2FLabs%2FeNSP%2FpySNMP_lab%2Frun.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A333%2C%22character%22%3A0%7D%7D%5D%2C%22aec3d817-4755-403d-b7fd-8b56ca982d4f%22%5D "Go to definition") 等。
3. 选择你感兴趣的节点，右键点击并选择 `Get` 或 `Get Next` 以获取 OID 信息。

#### 5. 保存 OID 信息

1. 将获取的 OID 信息保存到 `oid_string.csv` 或 `cfg.txt` 文件中。
2. 你可以手动复制 OID 信息并粘贴到文件中，或者使用 MIB Browser 的导出功能（如果有）。

### 示例 OID 信息

以下是一些常用的 OID 信息：

- `sysName`: `1.3.6.1.2.1.1.5.0`
- `ifNumber`: `1.3.6.1.2.1.2.1.0`
- `ifType`: `1.3.6.1.2.1.2.2.1.3`
- `ifDescr`: `1.3.6.1.2.1.2.2.1.2`
- `ipAdEntAddr`: `1.3.6.1.2.1.4.20.1.1`
- `ipAdEntNetMask`: `1.3.6.1.2.1.4.20.1.3`
- `ipRouteDest`: `1.3.6.1.2.1.4.21.1.1`
- `ipRouteNextHop`: `1.3.6.1.2.1.4.21.1.7`

### 示例 `oid_string.csv` 文件内容

```csv
sysName,1.3.6.1.2.1.1.5.0
ifNumber,1.3.6.1.2.1.2.1.0
ifType,1.3.6.1.2.1.2.2.1.3
ifDescr,1.3.6.1.2.1.2.2.1.2
ipAdEntAddr,1.3.6.1.2.1.4.20.1.1
ipAdEntNetMask,1.3.6.1.2.1.4.20.1.3
ipRouteDest,1.3.6.1.2.1.4.21.1.1
ipRouteNextHop,1.3.6.1.2.1.4.21.1.7
```

### 示例 `cfg.txt` 文件内容

```plaintext
sysName: 1.3.6.1.2.1.1.5.0
ifNumber: 1.3.6.1.2.1.2.1.0
ifType: 1.3.6.1.2.1.2.2.1.3
ifDescr: 1.3.6.1.2.1.2.2.1.2
ipAdEntAddr: 1.3.6.1.2.1.4.20.1.1
ipAdEntNetMask: 1.3.6.1.2.1.4.20.1.3
ipRouteDest: 1.3.6.1.2.1.4.21.1.1
ipRouteNextHop: 1.3.6.1.2.1.4.21.1.7
```

通过这些步骤，你应该能够成功获取并保存所需的 OID 信息。接下来，你可以继续编写 Python 脚本来获取路由器 [`SZ1`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FD%3A%2Fgithub%2Fnetwork%2FLabs%2FeNSP%2FpySNMP_lab%2Frun.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A27%2C%22character%22%3A4%7D%7D%5D%2C%22aec3d817-4755-403d-b7fd-8b56ca982d4f%22%5D "Go to definition") 和 [`SZ2`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FD%3A%2Fgithub%2Fnetwork%2FLabs%2FeNSP%2FpySNMP_lab%2Frun.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A15%2C%22character%22%3A2%7D%7D%5D%2C%22aec3d817-4755-403d-b7fd-8b56ca982d4f%22%5D "Go to definition") 的数据。