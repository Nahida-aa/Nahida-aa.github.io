---
title: 3d建模
description: "blender 是一个开源的 3D 建模软件，提供了建模、渲染、动画等功能。"
created_at: 2025-07-30T20:36:19Z
updated_at: 2025-07-30T20:36:19Z
tags: [3d]
---

## Overview

### mesh

- 指的是3D模型的表面结构，由顶点、边和面组成。
- 决定了模型的外形、细节和可见部分。
- 例如：人物、动物、物体的“皮肤”或“外壳”。

### material

### texture

- 贴图（Texture）是指覆盖在3D模型表面上的二维图像。
- 用于为模型添加颜色、细节、图案等视觉效果。
- 常见类型有颜色贴图、法线贴图、高光贴图等。
- 贴图与材质配合使用，使模型看起来更加真实和丰富。

#### substance painter

### Skeleton/Armature

- 是一组用于驱动网格变形的“骨头”或“关节”结构。
- 主要用于动画，通过移动骨骼带动网格产生动作（如走路、挥手）。
- 骨骼本身通常不可见，只是控制结构。

#### mesh and skeleton
- 骨骼和网格通过“蒙皮（Skinning）”或“绑定（Rigging）”技术关联。
- 动画时，骨骼运动会带动网格变形，实现自然的动作效果。

### shader

### workflow
以制作 melusine 角色 3D 模型为例，常见流程如下：

1. 设计角色草图（可选）：先画出 melusine 的外观设定图。
2. 建模（Blender/Maya 等）：
   - 用建模软件创建角色的 mesh（网格），包括身体、服饰、配件等。
3. UV 展开：
   - 对模型进行 UV 展开，为贴图做准备。
4. 贴图绘制（Substance Painter/PS 等）：
   - 绘制颜色贴图、法线贴图等，提升细节和质感。
5. 绑定骨骼（Rigging）：
   - 给模型加上骨骼（Armature），设置权重（Skinning）。
6. 动画（可选）：
   - 制作走路、表情等动画。
7. 导出模型：
   - 导出为 FBX、glTF、VRM 等格式，按需求选择。
8. 在目标平台（如 Unity）中导入并调试。

#### 用 bpy 脚本自动化建模流程示例

1. 使用 Python（bpy）脚本在 Blender 中自动创建 mesh，例如：
   ```python
   import bpy
   bpy.ops.mesh.primitive_cube_add(size=2)
   obj = bpy.context.active_object
   obj.name = "MelusineBody"
   ```
2. 通过 bpy 操作 UV 展开、材质、贴图分配：
   - 自动生成 UV，分配材质和贴图。
3. 用 bpy 添加骨骼（Armature）并自动绑定：
   - 创建骨骼对象，设置父子关系，自动权重绑定。
4. 可用 bpy 导出模型为 glTF/FBX 等格式：
   ```python
   bpy.ops.export_scene.gltf(filepath="/path/to/melusine.glb")
   ```
5. 注意事项：
   - 脚本需在 Blender 内运行，注意 API 版本兼容。
   - 复杂角色建模建议手工+脚本结合，自动化适合批量或规则化模型。

## humanoid

## Blender

Blender 是一款功能强大的开源 3D 软件，主要用于：

- 3D建模：创建各种三维模型（人物、场景、物体等）
- 渲染：生成高质量的静态图片或动画视频
- 动画：制作角色动画、物体运动、特效等
- 材质与贴图：为模型添加颜色、纹理和材质效果
- 物理模拟：如布料、流体、刚体、烟雾等
- 视频剪辑与后期：内置视频编辑器可进行简单后期处理
- 脚本与扩展：支持 Python 脚本进行自动化和功能扩展

## melusine

## format

### VRM

一种专为虚拟形象（Vtuber、虚拟主播等）设计的 3D 模型标准，基于 glTF，支持标准骨骼、表情、物理、元数据等