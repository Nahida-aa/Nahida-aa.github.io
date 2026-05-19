// @ts-check
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import tailwindcss from '@tailwindcss/vite'
import starlightCatppuccin from '@catppuccin/starlight'
import starlightUiTweaks from 'starlight-ui-tweaks'
import starlightSidebarTopics from 'starlight-sidebar-topics'
import starlightGitHubAlerts from 'starlight-github-alerts'
import solidJs from '@astrojs/solid-js';
import remarkMath from 'remark-math'
import rehypeMathjax from 'rehype-mathjax'

export default defineConfig({
  site: 'https://Nahida-aa.github.io',
  integrations: [
    solidJs({ devtools: true }),
    starlight({
      defaultLocale: 'root',
      locales: {
        'zh-cn': {
          label: '简体中文',
          lang: 'zh-CN',
        },
        root: {
          label: 'English',
          lang: 'en',
        },
      },
      components: {
        // Override the default `SocialIcons` component.
        PageFrame: './src/components/overrides/PageFrame.astro',
      },
      plugins: [
        starlightGitHubAlerts(),
        starlightSidebarTopics([
          {
            label: 'Math',
            link: '/math',
            items: [
              { label: 'calculus', link: 'math/calculus/' },
              { label: 'trigonometry', link: 'math/trigonometry/' },
              { label: 'number-theory', link: 'math/number-theory/' },
            ],
          },
          {
            label: 'Computer Science',
            link: '/cs',
            items: [
              {
                label: 'programming',
                items: [
                  { label: 'TypeScript', link: 'cs/programming/typescript' },
                  { label: 'Python', link: 'cs/programming/python' },
                ],
              },
              {
                label: 'Web',
                items: [
                  {
                    label: 'Framework', items: [
                      'cs/web/framework/nextjs',
                      "cs/web/framework/ui-framework-migration",
                    ]
                  },
                  { label: 'Deploy', items: ['cs/web/deploy/pm2'] },
                  { label: 'HTML/CSS', items: ['cs/web/html/css'] },
                ],
              },
              {
                label: 'Operating System',
                items: [
                  { label: 'Linux', link: 'cs/os/linux/' },
                  { label: 'Windows', link: 'cs/os/windows/' },
                ],
              },

              {
                label: 'Database',
                items: [
                  { label: 'SQL', link: 'cs/db/sql/' },
                ],
              },
            ]
          },
          {
            label: "Biology",
            link: '/biology',
          },
          {
            label: 'Docs',
            link: '/docs/',
            items: [
              {
                label: 'TanStack Start',
                items: [{
                  label: 'React',
                  items: [
                    {
                      label: 'Guide',
                      items: [
                        'docs/tanstack-start/react/guide/server-functions',
                        'docs/tanstack-start/react/guide/middleware',
                        'docs/tanstack-start/react/guide/streaming-data-from-server-functions',
                        'docs/tanstack-start/react/guide/server-routes',
                      ]
                    }
                  ]
                }]
              },
              {
                label: 'TanStack DB',

                items: [
                  {
                    label: 'guides',
                    items: [
                      'docs/tanstack-db/guides/live-queries',
                      'docs/tanstack-db/guides/mutations',
                      'docs/tanstack-db/guides/schemas',
                      'docs/tanstack-db/guides/error-handling',
                      'docs/tanstack-db/guides/collection-options-creator'
                    ]
                  },
                  {
                    label: 'collection',
                    items: [
                      'docs/tanstack-db/collections/query-collection',
                      'docs/tanstack-db/collections/electric-collection',
                      'docs/tanstack-db/collections/local-storage-collection',
                      "docs/tanstack-db/collections/local-only-collection",
                    ]
                  },
                  {
                    label: 'community',
                    items: [
                      "docs/tanstack-db/community/resources",
                    ]
                  }
                ],
              },

              {
                label: 'Paraglide Js',
                items: [
                  'docs/paraglide_js',
                  'docs/paraglide_js/tanstack-start',
                ]
              },
              {
                label: 'Electric Sync',
                items: [
                  'docs/electric-sync/api/clients/typescript'
                ]
              },
              'docs/copyright'
            ]
          },
          {
            label: 'me',
            link: '/me/',
            items: [
              { label: 'info', link: 'me/info' },
            ],
          }

          // { label: 'Git', link: '/git/', id: 'git', items: [{ label: 'Git', link: '/git/' }] },
          // { label: 'AI', link: '/ai/', id: 'ai', items: [{ label: 'AI', link: '/ai/' }] },
          // { label: '环境配置', link: '/env/', id: 'env', items: [{ label: '环境配置', link: '/env/' }] },
          // { label: '硬件', link: '/hardware/', id: 'hardware', items: [{ label: '硬件', link: '/hardware/' }] },
          // { label: '游戏', link: '/game/', id: 'game', items: [{ label: '游戏', link: '/game/' }] },
          // { label: '论文', link: '/paper/', id: 'paper', items: [{ label: '论文', link: '/paper/' }] },
          // { label: '网络', link: '/network/', id: 'network', items: [{ label: '网络', link: '/network/' }] },
          // { label: '关于', link: '/about/' },
        ], {
          // topics: {
          //   programming: ['/programming/**'],
          //   web: ['/web/**'],
          //   math: ['/math/**'],
          //   os: ['/os/**'],
          //   db: ['/db/**'],
          //   ai: ['/ai/**'],
          //   git: ['/git/**'],
          //   env: ['/env/**'],
          //   hardware: ['/hardware/**'],
          //   game: ['/game/**'],
          //   paper: ['/paper/**'],
          //   network: ['/network/**'],
          // },
          exclude: [
            '/', '/work/**', '/biology/**',
            '/cs/**', '/docs/**', '/me/**', '/skills/**', '/tmp/**',
            '/math/**', '/about/**', '/tags/**',
            '/zh-cn/work/**', '/zh-cn/biology/**',
            '/zh-cn/cs/**', '/zh-cn/docs/**', '/zh-cn/me/**', '/zh-cn/skills/**', '/zh-cn/tmp/**',
            '/zh-cn/math/**', '/zh-cn/about/**', '/zh-cn/tags/**',
          ],
        }),
        starlightUiTweaks(),
        starlightCatppuccin({
          dark: { flavor: 'macchiato', accent: 'lavender' },
          light: { flavor: 'latte', accent: 'lavender' },
        }),
      ],

      title: 'Nahida-aa',
      description: 'Nahida-aa 的 Docs',
      favicon: '/favicon.ico',
      customCss: [
        './src/styles/global.css',
      ],
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/Nahida-aa' },
      ],
      editLink: {
        baseUrl: 'https://github.com/Nahida-aa/Nahida-aa.github.io/edit/main/',
      },
      lastUpdated: true,
    }),
  ],

  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeMathjax],
  },

  vite: {
    plugins: [tailwindcss()],
  },
})
