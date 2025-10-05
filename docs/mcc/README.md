# 全局模态框系统

一个基于 React Context 的全局模态框管理系统，支持多种类型的模态框，包括确认对话框、警告提示、输入框、加载框和自定义模态框。

## 功能特性

- 🎯 **统一管理**: 所有模态框通过一个 Context 统一管理
- 🚀 **多种类型**: 支持警告、确认、输入、加载、退出登录等多种模态框
- 💫 **便捷使用**: 提供多个便捷的 Hook，一行代码调用
- 🎨 **自定义**: 支持完全自定义的模态框内容
- ⚡ **异步支持**: 内置异步操作和错误处理
- 📱 **响应式**: 自适应移动端和桌面端

## 快速开始

### 1. 设置 Provider

在您的根布局中添加 `ModalProvider`：

```tsx
// app/layout.tsx
import { ModalProvider } from '@/components/providers/modal-provider'
import { GlobalModalRenderer } from '@/components/modals/GlobalModalRenderer'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <ModalProvider>
          {children}
          <GlobalModalRenderer />
        </ModalProvider>
      </body>
    </html>
  )
}
```

### 2. 基本使用

```tsx
import { useAlert, useConfirm, usePrompt, useSignOut } from '@/components/providers/modal-provider'

function MyComponent() {
  const showAlert = useAlert()
  const showConfirm = useConfirm()
  const showPrompt = usePrompt()
  const showSignOut = useSignOut()

  return (
    <div>
      {/* 显示警告 */}
      <Button onClick={() => showAlert('成功', '操作已完成！')}>
        显示提示
      </Button>

      {/* 确认对话框 */}
      <Button onClick={() => showConfirm(
        '确认删除',
        '此操作不可撤销，您确定吗？',
        () => console.log('已确认删除'),
        'destructive'
      )}>
        删除项目
      </Button>

      {/* 输入对话框 */}
      <Button onClick={() => showPrompt(
        '输入名称',
        '请输入新名称',
        (value) => console.log('输入的值:', value)
      )}>
        编辑名称
      </Button>

      {/* 退出登录 */}
      <Button onClick={() => showSignOut('当前用户')}>
        退出登录
      </Button>
    </div>
  )
}
```

## 详细用法

### 警告提示框

```tsx
const showAlert = useAlert()

// 基本用法
showAlert('标题', '描述信息')

// 不同类型
showAlert('成功', '操作完成', 'success')
showAlert('警告', '请注意', 'warning')
showAlert('信息', '提示信息', 'info')
```

### 确认对话框

```tsx
const showConfirm = useConfirm()

// 基本确认
showConfirm('确认操作', '您确定要执行此操作吗？', () => {
  console.log('用户确认了')
})

// 危险操作
showConfirm(
  '删除确认',
  '此操作将永久删除数据',
  async () => {
    await deleteData()
    showAlert('删除成功')
  },
  'destructive'
)

// 警告操作
showConfirm(
  '重置设置',
  '这将重置所有设置',
  () => resetSettings(),
  'warning'
)
```

### 输入对话框

```tsx
const showPrompt = usePrompt()

// 基本输入
showPrompt('输入名称', '请输入项目名称', (value) => {
  console.log('用户输入:', value)
})

// 带默认值
showPrompt(
  '编辑描述',
  '请输入新描述',
  async (value) => {
    await updateDescription(value)
    showAlert('更新成功')
  },
  '默认描述'
)
```

### 加载模态框

```tsx
const { showLoading, hideLoading, updateProgress } = useLoading()

// 简单加载
showLoading('正在处理...')
setTimeout(hideLoading, 2000)

// 带进度的加载
const simulateProgress = async () => {
  showLoading('正在上传...', 0)
  
  for (let i = 0; i <= 100; i += 10) {
    await new Promise(resolve => setTimeout(resolve, 200))
    updateProgress(i)
  }
  
  hideLoading()
  showAlert('上传完成')
}
```

### 自定义模态框

```tsx
const modal = useModal()

// 自定义内容
modal.openModal('custom', {
  component: (
    <div className="p-6">
      <h2>自定义内容</h2>
      <p>这里可以放任何 React 组件</p>
      <Button onClick={modal.closeModal}>关闭</Button>
    </div>
  )
})
```

## API 参考

### Hooks

| Hook | 描述 | 返回值 |
|------|------|--------|
| `useModal()` | 完整的模态框控制 | `{ isOpen, type, data, openModal, closeModal, updateModal }` |
| `useAlert()` | 警告提示框 | `(title, description?, variant?) => void` |
| `useConfirm()` | 确认对话框 | `(title, description?, onConfirm?, variant?) => void` |
| `usePrompt()` | 输入对话框 | `(title, placeholder?, onSubmit?, defaultValue?) => void` |
| `useLoading()` | 加载模态框 | `{ showLoading, hideLoading, updateProgress }` |
| `useSignOut()` | 退出登录 | `(userName?) => void` |

### 模态框类型

- `alert` - 警告提示框
- `confirm` - 确认对话框  
- `prompt` - 输入对话框
- `loading` - 加载框
- `signOut` - 退出登录框
- `custom` - 自定义模态框

### 变体类型

- `default` - 默认样式
- `destructive` - 危险操作（红色）
- `warning` - 警告操作（橙色）
- `info` - 信息提示（蓝色）
- `success` - 成功提示（绿色）

## 组件文件结构

```
src/components/
├── providers/
│   └── modal-provider.tsx          # Context 提供者
├── modals/
│   ├── GlobalModalRenderer.tsx     # 全局模态框渲染器
│   ├── SignOutModal.tsx           # 退出登录模态框
│   ├── ConfirmModal.tsx           # 确认对话框
│   ├── AlertModal.tsx             # 警告提示框
│   ├── PromptModal.tsx            # 输入对话框
│   └── LoadingModal.tsx           # 加载模态框
├── layout/
│   └── AppLayout.tsx              # 应用布局示例
└── examples/
    └── ModalExamples.tsx          # 使用示例
```

## 注意事项

1. **Provider 位置**: 确保 `ModalProvider` 包裹整个应用
2. **渲染器位置**: `GlobalModalRenderer` 应该放在应用的最外层
3. **异步操作**: 确认和输入框支持异步操作，会自动处理加载状态
4. **错误处理**: 异步操作失败时会显示错误信息
5. **键盘支持**: 支持 ESC 关闭、Enter 确认等快捷键

## 扩展自定义

您可以轻松添加新的模态框类型：

1. 在 `ModalType` 中添加新类型
2. 在 `ModalData` 中添加对应的属性
3. 创建新的模态框组件
4. 在 `GlobalModalRenderer` 中添加渲染逻辑
5. 在 Provider 中添加便捷方法（可选）

这个系统设计灵活，可以根据项目需求进行定制和扩展。
