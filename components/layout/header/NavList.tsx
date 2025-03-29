"use client"

import Link from "@/components/Link"
import { headNavItems, navItems } from "@/app/settings/site"
import { useParams, usePathname } from 'next/navigation'


export const NavList = () => {
  const pathname = usePathname()
  return <>
    {headNavItems.map((item) => (
      <Link
        key={item.label}
        href={item.href}
        className={`block font-medium text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400 ${pathname === item.href ? 'gradient' : ''}`}
      >
        {item.label}
      </Link>))}
  </>
}