import { FileClock, FileUserIcon, House, LinkIcon, TagsIcon } from "lucide-react";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "aa'blog",
  description: "Make beautiful websites regardless of your design experience.",
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/Nahida/Nahida-aa.github.io ",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
export const headNavItems = [
  { href: '/blog', label: 'Blog' },
  { href: '/tags', label: 'Tags' },
  { href: '/friend', label: 'Friend' },
  { href: '/about', label: 'About' },
]
export const navItems = [
  {label: "Home",href: "/", icon: House},
  { href: '/blog', label: 'Blog', icon: FileClock },
  { href: '/tags', label: 'Tags', icon: TagsIcon },
  { href: '/friend', label: 'Friend', icon: LinkIcon },
  { href: '/about', label: 'About', icon: FileUserIcon },
  // {
  //   label: "Docs",
  //   href: "/docs",
  // },
  // {
  //   label: "Pricing",
  //   href: "/pricing",
  // },
]

export const siteMetadata = {
  name: "Nahida-aaの次元",
  short_name: "aaの次元", // 通常限制在 12 个字符以内（具体长度限制可能因平台而异）, 通常建议避免使用空格，以确保在所有设备和平台上显示一致, 应该能够清晰地传达应用的核心功能或品牌名称, 确保名称在目标用户的设备上是唯一的，避免与其他应用混淆, 某些平台可能对字符类型有限制，建议仅使用字母、数字和少量符号（如 - 或 _）
  description: '探索数学、 生物、 算法、统计、机器学习、AI 和 Web 开发的精彩世界。',
  start_url: '/',
  title: "Nahida-aaの次元",
  author: 'Nahida-aa',
  headerTitle: 'Nahida-aa',
  theme: 'system', // system, dark or light
  siteUrl: 'https://nahida-aa.org.edu.kg',
  siteRepo: 'https://github.com/Nahida-aa/Nahida-aa.github.io',
  siteLogo: `${process.env.BASE_PATH || ''}/favicon.ico`,
  // socialBanner: `${process.env.BASE_PATH || ''}/static/images/twitter-card.png`,
  mastodon: 'https://mastodon.social/@mastodonuser',// 去中心化的社交媒体平台，类似于 Twitter，但它的架构和运行方式与传统的社交媒体平台（如 Twitter 或 Facebook）有很大的不同, Mastodon 是开源的，任何人都可以搭建自己的 Mastodon 实例， 注册 fosstodon.org（专注于开源和技术）
  email: '1276552337@qq.com',
  github: 'https://github.com/Nahida-aa',
  discord: 'https://discord.gg/HteSse7r',
  qq: 'https://qm.qq.com/q/LxsjVU2C8G',
  x: 'https://x.com/aaNahida190631', // 马斯克长期以来的愿景，他希望将 Twitter 转变为一个多功能的超级应用（类似于中国的微信）
  // twitter: 'https://twitter.com/aaNahida190631',
  // facebook: 'https://facebook.com',
  bilibili: 'https://space.bilibili.com/2140306819',
  youtube: 'https://youtube.com',
  linkedin: 'https://www.linkedin.com',
  instagram: 'https://www.instagram.com', // 用户的 Instagram 关注列表可以直接同步到 Threads
  threads: 'https://www.threads.net', // Threads 是由 Meta（Facebook 的母公司） 开发的一款社交媒体应用，主要用于文本内容的分享和互动。它被视为 Twitter（现称 X） 的竞争对手，旨在提供一个以文字为主的社交平台
  language: 'en',
  locale: 'en-US',
  // set to true if you want a navbar fixed to the top
  stickyNav: true,
  analytics: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // supports Plausible, Simple Analytics, Umami, Posthog or Google Analytics.
    umamiAnalytics: {
      // We use an env variable for this site to avoid other users cloning our analytics ID
      umamiWebsiteId: process.env.NEXT_UMAMI_ID, // e.g. 123e4567-e89b-12d3-a456-426614174000
      // You may also need to overwrite the script if you're storing data in the US - ex:
      // src: 'https://us.umami.is/script.js'
      // Remember to add 'us.umami.is' in `next.config.js` as a permitted domain for the CSP
    },
    // plausibleAnalytics: {
    //   plausibleDataDomain: '', // e.g. tailwind-nextjs-starter-blog.vercel.app
    // If you are hosting your own Plausible.
    //   src: '', // e.g. https://plausible.my-domain.com/js/script.js
    // },
    // simpleAnalytics: {},
    // posthogAnalytics: {
    //   posthogProjectApiKey: '', // e.g. 123e4567-e89b-12d3-a456-426614174000
    // },
    // googleAnalytics: {
    //   googleAnalyticsId: '', // e.g. G-XXXXXXX
    // },
  },
  newsletter: {
    // supports mailchimp, buttondown, convertkit, klaviyo, revue, emailoctopus, beehive
    // Please add your .env file and modify it according to your selection
    provider: 'buttondown',
  },
  comments: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // Select a provider and use the environment variables associated to it
    // https://vercel.com/docs/environment-variables
    provider: 'giscus', // supported providers: giscus, utterances, disqus
    giscusConfig: {
      // Visit the link below, and follow the steps in the 'configuration' section
      // https://giscus.app/
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname', // supported options: pathname, url, title
      reactions: '1', // Emoji reactions: 1 = enable / 0 = disable
      // Send discussion metadata periodically to the parent window: 1 = enable / 0 = disable
      metadata: '0',
      // theme example: light, dark, dark_dimmed, dark_high_contrast
      // transparent_dark, preferred_color_scheme, custom
      theme: 'light',
      // theme when dark mode
      darkTheme: 'transparent_dark',
      // If the theme option above is set to 'custom`
      // please provide a link below to your custom theme css file.
      // example: https://giscus.app/themes/custom_example.css
      themeURL: '',
      // This corresponds to the `data-lang="en"` in giscus's configurations
      lang: 'en',
    },
  },
  search: {
    provider: 'kbar', // kbar or algolia
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/data/index.json`, // path to load documents to search
    },
    // provider: 'algolia',
    // algoliaConfig: {
    //   // The application ID provided by Algolia
    //   appId: 'R2IYF7ETH7',
    //   // Public API key: it is safe to commit it
    //   apiKey: '599cec31baffa4868cae4e79f180729b',
    //   indexName: 'docsearch',
    // },
  },
}