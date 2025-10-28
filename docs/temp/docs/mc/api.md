## 1. **官方 Minecraft API**
- **Mojang/Microsoft 官方 API**: `https://launchermeta.mojang.com/mc/game/version_manifest.json`
- 这是最权威的数据源，包含所有官方版本信息
- 提供版本号、发布时间、类型（release/snapshot/beta/alpha）等

## 2. **第三方 Minecraft API 服务**
- **PistonMeta**: `https://piston-meta.mojang.com/` - Mojang 官方元数据服务
- **Minecraft Wiki API**: 从 Minecraft Wiki 爬取数据
- **MCVersions.net**: 提供版本历史数据
- **MinecraftVersions API**: 专门的版本追踪服务

## 3. **数据爬取和聚合**
```javascript
// 示例：从官方 API 获取版本数据
async function fetchMinecraftVersions() {
  const response = await fetch('https://launchermeta.mojang.com/mc/game/version_manifest.json');
  const data = await response.json();
  
  return data.versions.map(version => ({
    version: version.id,
    versionType: version.type,
    date: version.releaseTime,
    major: version.type === 'release' // 简化的判断
  }));
}
```

## 4. **社区维护的数据集**
- **GitHub 仓库**: 如 `PrismarineJS/minecraft-data`
- **NPM 包**: `minecraft-versions`, `minecraft-data` 等
- **开源项目**: 启动器、模组管理器等项目维护的版本数据

## 5. **数据特点分析**
从你提供的数据来看：
- **时间跨度**: 从 2009年5月 到 2025年6月（包含未来版本）
- **版本类型**: release, snapshot, beta, alpha
- **命名规则**: 
  - 现代版本: `1.21.7`, `25w21a`（年份+周数+字母）
  - 历史版本: `b1.8.1`, `a1.2.6`, `rd-161348`

## 6. **在你的项目中使用**
如果你需要这样的数据，建议使用纯函数方案：

```typescript
// 定义类型
interface MinecraftVersion {
  version: string;
  versionType: 'release' | 'snapshot' | 'beta' | 'alpha';
  date: string;
  major: boolean;
}

// 核心数据获取函数
const fetchMinecraftVersionsFromMojang = async (): Promise<MinecraftVersion[]> => {
  const response = await fetch('https://launchermeta.mojang.com/mc/game/version_manifest.json');
  if (!response.ok) {
    throw new Error(`Failed to fetch versions: ${response.statusText}`);
  }
  
  const data = await response.json();
  return data.versions.map(transformVersion);
};

// 数据转换函数
const transformVersion = (version: any): MinecraftVersion => ({
  version: version.id,
  versionType: version.type,
  date: version.releaseTime,
  major: version.type === 'release'
});

// 缓存函数
const getCachedVersions = async (cacheKey: string): Promise<MinecraftVersion[] | null> => {
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      const isExpired = Date.now() - timestamp > 24 * 60 * 60 * 1000; // 24小时
      return isExpired ? null : data;
    }
  } catch {
    return null;
  }
  return null;
};

// 设置缓存函数
const setCachedVersions = (cacheKey: string, data: MinecraftVersion[]): void => {
  try {
    localStorage.setItem(cacheKey, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
  } catch {
    // 忽略缓存错误
  }
};

// 带缓存的获取函数
const getMinecraftVersions = async (useCache = true): Promise<MinecraftVersion[]> => {
  const cacheKey = 'minecraft-versions';
  
  if (useCache) {
    const cached = await getCachedVersions(cacheKey);
    if (cached) return cached;
  }
  
  const versions = await fetchMinecraftVersionsFromMojang();
  setCachedVersions(cacheKey, versions);
  return versions;
};

// 版本过滤函数
const filterVersionsByType = (versions: MinecraftVersion[], type: string) =>
  versions.filter(v => v.versionType === type);

const filterReleaseVersions = (versions: MinecraftVersion[]) =>
  filterVersionsByType(versions, 'release');

const filterSnapshotVersions = (versions: MinecraftVersion[]) =>
  filterVersionsByType(versions, 'snapshot');

// 版本查找函数
const findVersionByName = (versions: MinecraftVersion[], name: string) =>
  versions.find(v => v.version === name);

// 获取最新版本
const getLatestVersion = (versions: MinecraftVersion[], type?: string) => {
  const filtered = type ? filterVersionsByType(versions, type) : versions;
  return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
};
```

## 7. **函数式使用示例**

```typescript
// 组合函数使用示例
const useMinecraftVersions = async () => {
  // 获取所有版本
  const allVersions = await getMinecraftVersions();
  
  // 链式操作，函数式编程风格
  const latestRelease = getLatestVersion(filterReleaseVersions(allVersions));
  const recentSnapshots = filterSnapshotVersions(allVersions).slice(0, 5);
  
  return {
    total: allVersions.length,
    latestRelease,
    recentSnapshots,
    releaseCount: filterReleaseVersions(allVersions).length,
    snapshotCount: filterSnapshotVersions(allVersions).length
  };
};

// 错误处理函数
const withErrorHandling = <T>(fn: () => Promise<T>) => async (): Promise<T | null> => {
  try {
    return await fn();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

// 安全的版本获取
const safeGetVersions = withErrorHandling(getMinecraftVersions);

// 使用示例
const example = async () => {
  const versions = await safeGetVersions();
  if (!versions) {
    console.log('Failed to load versions');
    return;
  }
  
  const versionInfo = await useMinecraftVersions();
  console.log(`找到 ${versionInfo.total} 个版本`);
  console.log(`最新正式版: ${versionInfo.latestRelease?.version}`);
};
```

## 8. **数据更新策略**
- **定期同步**: 每天/每周从官方 API 同步最新数据
- **增量更新**: 只更新新增的版本
- **缓存机制**: 本地缓存减少 API 调用

这种数据在 Minecraft 相关的项目中非常有用，比如：
- 启动器应用
- 服务器管理工具  
- 模组兼容性检查
- 版本历史展示
