# mod dev

## fabric
Fabric 是一款适用于 Minecraft Java 版的轻量级模组工具链，设计简洁易用。它允许开发者对原版游戏进行修改（“模组”），添加新功能或更改现有机制。

本文档将引导您使用 Fabric 进行模组制作，从[创建您的第一个模组]()和[设置您的环境]()，到[渲染]()、[网络()]()、[数据生成]()等高级主题等等
### creating a project
Fabric 提供了一种使用 Fabric 模板 Mod 生成器创建新 mod 项目的简便方法 - 如果您愿意，也可以使用示例 mod 存储库手动创建一个新项目，请参阅“手动项目创建”部分。
#### generating a project
您可以使用 [Fabric 模板模组生成器](https://fabricmc.net/develop/template/) 为您的模组生成一个新项目 - 您应该填写必填字段，例如模组名称、包名称以及您要开发的 Minecraft 版本。

包名应全部小写，用点号分隔，且必须唯一，以避免与其他程序员的包冲突。其格式通常为反向的互联网域名, eg: `com.example.example-mod`

### project structure
https://docs.fabricmc.net/develop/getting-started/project-structure

#### `fabric.mod.json`
#### `entrypoints`
#### `src/main/resources`
用于存储您的模组使用的资源，例如纹理、模型和声音

资源存储在与资源包结构类似的结构中——例如，方块的纹理将存储在 `assets/example-mod/textures/block/block.png`
#### `src/client/resources`
用于存储客户端特定的资源，例如仅在客户端使用的纹理、模型和声音。


#### `src/main/java`
文件夹用于存储您的模组的 Java 源代码 - 它同时存在于客户端和服务器环境中。
#### `src/client/java`
文件夹用于存储客户端特定的 Java 源代码，例如渲染代码或客户端逻辑（例如块颜色提供程序）。