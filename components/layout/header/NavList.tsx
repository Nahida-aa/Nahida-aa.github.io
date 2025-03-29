"use client"

import Link from "@/components/Link"
import { navItems } from "@/app/settings/site"
import { useParams, usePathname } from 'next/navigation'


export const NavList = () => {
  const pathname = usePathname()
  return <>
    {navItems.map((link) => (
      <Link
        key={link.label}
        href={link.href}
        className={`block font-medium text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400 ${pathname === link.href ? 'gradient' : ''}`}
      >
        {link.label}
      </Link>))}
  </>
}