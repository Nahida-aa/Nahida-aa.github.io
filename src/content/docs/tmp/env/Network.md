# Network

## ssh

## VPN

使用 VPN 或代理可以绕过网络限制，访问速度较快的国外服务器

### VPN（虚拟专用网络）

#### 工作原理

1. **加密**：
   - VPN 会加密你设备与 VPN 服务器之间的所有网络流量。

2. **隧道**：
   - VPN 创建了一条加密的“隧道”，通过这条隧道传输所有数据。

3. **IP 地址替换**：
   - 连接到 VPN 服务器后，你的真实 IP 地址会被替换为 VPN 服务器的 IP 地址。

#### 优点

- **安全性高**：由于所有流量都经过加密，VPN 提供了更高的安全性。
- **全局保护**：VPN 会加密所有应用程序的流量，而不仅仅是浏览器流量。
- **绕过地理限制**：VPN 可以让你访问被地理限制的网站和服务。

#### 缺点

- **速度可能较慢**：由于加密和解密过程，VPN 可能会导致网络速度变慢。
- **需要安装客户端**：使用 VPN 通常需要安装专门的客户端软件。

## proxy

### 代理服务器

#### 工作原理

1. **中介**：
   - 代理服务器充当你设备与目标服务器之间的中介。

2. **缓存**：
   - 代理服务器可以缓存常用的网页和资源，从而提高访问速度。

3. **IP 地址替换**：
   - 通过代理服务器访问网站时，你的真实 IP 地址会被替换为代理服务器的 IP 地址。

#### 优点

- **速度较快**：代理服务器可以缓存内容，提高访问速度。
- **无需安装客户端**：大多数代理服务器可以通过浏览器设置直接使用。

#### 缺点

- **安全性较低**：代理服务器通常不加密流量，因此安全性较低。
- **仅限特定应用**：代理服务器通常只影响特定的应用程序（如浏览器），而不是全局流量。

### Clash

Clash 是一个跨平台的代理客户端，支持多种代理协议（如 Shadowsocks、V2Ray、Trojan 等），并且可以通过配置文件进行灵活的规则设置。它通常用于科学上网，帮助用户绕过网络限制，访问被屏蔽的网站和服务。

### Clash 的主要功能

1. **多协议支持**：
   - Clash 支持多种代理协议，包括 Shadowsocks、V2Ray、Trojan 等，用户可以根据需要选择合适的协议。

2. **规则配置**：
   - Clash 允许用户通过配置文件设置灵活的规则，以便根据不同的域名或 IP 地址选择不同的代理服务器。

3. **跨平台**：
   - Clash 支持多种操作系统，包括 Windows、macOS、Linux 和 Android，用户可以在不同平台上使用相同的配置文件。

4. **高性能**：
   - Clash 采用高效的网络处理机制，能够提供较高的代理速度和稳定性。

### 示例配置文件

以下是一个简单的 Clash 配置文件示例：

```yaml
port: 7890
socks-port: 7891
allow-lan: false
mode: Rule
log-level: info
external-controller: 127.0.0.1:9090

proxies:
  - name: "Proxy1"
    type: ss
    server: server_address
    port: 8388
    cipher: aes-256-gcm
    password: your_password

proxy-groups:
  - name: "Proxy"
    type: select
    proxies:
      - "Proxy1"

rules:
  - DOMAIN-SUFFIX,google.com,Proxy
  - DOMAIN-SUFFIX,facebook.com,Proxy
  - GEOIP,CN,DIRECT
  - MATCH,Proxy
```

### Clash

Clash 是一个跨平台的代理客户端，支持多种代理协议（如 Shadowsocks、V2Ray、Trojan 等），并且可以通过配置文件进行灵活的规则设置。

#### Clash 的主要功能

1. **多协议支持**：
   - Clash 支持多种代理协议，包括 Shadowsocks、V2Ray、Trojan 等，用户可以根据需要选择合适的协议。

2. **规则配置**：
   - Clash 允许用户通过配置文件设置灵活的规则，以便根据不同的域名或 IP 地址选择不同的代理服务器。

3. **跨平台**：
   - Clash 支持多种操作系统，包括 Windows、macOS、Linux 和 Android，用户可以在不同平台上使用相同的配置文件。

4. **高性能**：
   - Clash 采用高效的网络处理机制，能够提供较高的代理速度和稳定性。

#### 示例配置文件

以下是一个简单的 Clash 配置文件示例：

```yaml
port: 7890
socks-port: 7891
allow-lan: false
mode: Rule
log-level: info
external-controller: 127.0.0.1:9090

proxies:
  - name: "Proxy1"
    type: ss
    server: server_address
    port: 8388
    cipher: aes-256-gcm
    password: your_password

proxy-groups:
  - name: "Proxy"
    type: select
    proxies:
      - "Proxy1"

rules:
  - DOMAIN-SUFFIX,google.com,Proxy
  - DOMAIN-SUFFIX,facebook.com,Proxy
  - GEOIP,CN,DIRECT
  - MATCH,Proxy
```

#### FlClash

- `Clash`

  - **开发语言**：Go
  - **功能**：支持多种代理协议（如 Shadowsocks、V2Ray、Trojan 等），提供丰富的功能和灵活的配置选项。
  - **用途**：适合需要复杂代理规则和多协议支持的用户。

- `FlClash`

  - **开发语言**：Go（基于 Clash 内核）
  - **功能**：提供基本的代理功能，资源占用较低，适合在资源受限的设备上使用。
  - **用途**：适合在低性能设备或需要节省资源的场景中使用。

## CDN

一些服务提供了 CDN 加速，可以显著提高访问速度
