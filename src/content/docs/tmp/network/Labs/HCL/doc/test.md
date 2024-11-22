## 测试
### 1.测试IRF堆叠
S_核心1
```sh
display irf
```
### 2.测试链路聚合
S_核心1
```sh
display link-aggregation summary
display interface brief
display link-aggregation verbose
display current-configuration | include link-aggregation mode
display current-configuration interface Bridge-Aggregation 1
display lacp system-id
```

### 测试步骤

#### 1. 测试设备连通性

1. **测试核心交换机 IRF 堆叠**：
   - 在核心交换机上执行 `display irf` 命令，检查 IRF 堆叠状态。
   - 确认 IRF 成员状态正常，所有成员都已加入 IRF 堆叠。

2. **测试链路聚合**：
   - 在核心交换机和接入交换机上执行 `display link-aggregation summary` 命令，检查链路聚合状态。
   - 确认链路聚合组中的所有接口状态正常。

3. **测试防火墙与核心交换机的链路聚合**：
   - 在防火墙上执行 `display interface brief` 命令，检查 Route-Aggregation 接口状态。
   - 确认 Route-Aggregation 接口状态正常。

#### 2. 测试 DHCP 配置

1. **测试研发部有线网络的 DHCP**：
   - 将一台 PC 连接到 S_接入1 的 VLAN 2 接口。
   - 确认 PC 能够从 DHCP 服务器获取 IP 地址，并且网关为 172.17.2.1。

2. **测试研发部无线网络的 DHCP**：
   - 将一台无线设备连接到 SSID 为 "研发部" 的无线网络。
   - 确认无线设备能够从 DHCP 服务器获取 IP 地址，并且网关为 172.17.3.1。

3. **测试生产部有线网络的 DHCP**：
   - 将一台 PC 连接到 S_接入2 的 VLAN 4 接口。
   - 确认 PC 能够从 DHCP 服务器获取 IP 地址，并且网关为 172.17.4.1。

4. **测试生产部无线网络的 DHCP**：
   - 将一台无线设备连接到 SSID 为 "生产部" 的无线网络。
   - 确认无线设备能够从 DHCP 服务器获取 IP 地址，并且网关为 172.17.5.1。

5. **测试 AP 管理地址池的 DHCP**：
   - 确认 AP 能够从 DHCP 服务器获取 IP 地址，并且网关为 172.17.6.1。

#### 3. 测试防火墙安全策略

1. **测试研发部上外网**：
   - 在研发部的 PC 上执行 `ping 8.8.8.8` 命令，确认能够访问外网。
   - 在研发部的 PC 上执行 `tracert 8.8.8.8` 命令，确认数据包能够通过防火墙。

2. **测试生产部不允许上外网**：
   - 在生产部的 PC 上执行 `ping 8.8.8.8` 命令，确认无法访问外网。
   - 在生产部的 PC 上执行 `tracert 8.8.8.8` 命令，确认数据包被防火墙阻止。

#### 4. 测试 SSH 远程加密传输协议

1. **测试 SSH 连接**：
   - 使用 SSH 客户端连接到核心交换机、防火墙和其他设备。
   - 确认能够成功登录，并且使用配置的用户名和密码。

### 测试示例命令

#### 核心交换机 IRF 堆叠状态

```sh
display irf
```

#### 链路聚合状态

```sh
display link-aggregation summary
```

#### 防火墙 Route-Aggregation 接口状态

```sh
display interface brief
```

#### 测试 DHCP 配置

1. **PC 获取 IP 地址**：
   ```sh
   ipconfig /all
   ```

2. **无线设备获取 IP 地址**：
   ```sh
   ifconfig
   ```

#### 测试防火墙安全策略

1. **研发部上外网**：
   ```sh
   ping 8.8.8.8
   tracert 8.8.8.8
   ```

2. **生产部不允许上外网**：
   ```sh
   ping 8.8.8.8
   tracert 8.8.8.8
   ```

#### 测试 SSH 连接

```sh
ssh admin@<设备IP地址>
```