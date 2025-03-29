import type { MetadataRoute } from 'next'
import { siteMetadata } from './config/site'

export const dynamic = "force-static"
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteMetadata.name,
    short_name: siteMetadata.short_name,
    description: siteMetadata.description,
    start_url: siteMetadata.start_url,
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        "src": "/favicons/Nahida-48-r.webp",
        "sizes": "48x48", // 浏览器或操作系统的较小图标
        "type": "image/webp"
      },{
        "src": "/favicons/Nahida-72-r.webp",
        "sizes": "72x72", // Android 低分辨率设备的图标
        "type": "image/webp"
      },{
        "src": "/favicons/Nahida-96-r.webp",
        "sizes": "96x96", // Android 中等分辨率设备的图标
        "type": "image/webp"
      },{
        "src": "/favicons/Nahida-128-r.webp",
        "sizes": "128x128", // 桌面应用程序的图标
        "type": "image/webp"
      },{
        "src": "/favicons/Nahida-144-r.webp",
        "sizes": "144x144", // Windows 平台的 Pinned Tiles 图标
        "type": "image/webp"
      },{
        src: '/favicons/Nahida-192-r.webp',
        sizes: '192x192', // PWA 的主屏幕图标（必须提供）
        type: 'image/webp',
      },{
        "src": "/favicons/Nahida-256-r.webp",
        "sizes": "256x256", // 高分辨率桌面图标
        "type": "image/webp"
      },{
        src: '/favicons/Nahida-512-r.webp',
        sizes: '512x512', // PWA 的高分辨率图标（必须提供）
        type: 'image/webp',
      },
    ],
  }
}