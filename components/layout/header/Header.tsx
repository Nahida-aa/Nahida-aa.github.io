"use client";
import { NavList } from './NavList'
import { motion } from 'framer-motion'
import { ModeToggleGradientIcon } from '@/components/common/ModeToggle';
import { useEffect, useState } from 'react';
import LanguageChanger from '@/app/i18n/LanguageChanger';
// import { ModeToggleGradientIconV0 } from '@/components/common/mode-toggle';
// import { SearchModalButton } from '@/components/common/search';
import { SearchButton } from '@/app/[locale]/search/search-button';
import { siteMetadata } from '@/config/site';
import Link from '@/components/Link';

export const Header = ({
  className=''
}:{
  className?: string
}) => {
  const [lastScrollTop, setLastScrollTop] = useState(0)
  const [headerVisible, setHeaderVisible] = useState(true)
  const [isScrolled, setScrolled] = useState(false)
  const triggerHeight = 100
  // mount initial scroll position
  useEffect(() => {
    const initialScrollTop = window.scrollY || document.documentElement.scrollTop
    setScrolled(initialScrollTop > triggerHeight)
  }, [])
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      if (scrollTop > lastScrollTop) {
        setHeaderVisible(false)
      } else {
        setHeaderVisible(true)
      }
      setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop)
      setScrolled(scrollTop > triggerHeight)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollTop])
  const isVisble = ()=> headerVisible || !isScrolled

  return <>
  <motion.header className={`px-4  rounded-md mx-auto bg-background/0 backdrop-blur supports-[backdrop-filter]:bg-background/10 ${isScrolled ? 'shadow-md' : ''} dark:shadow-gray-800 ${siteMetadata.stickyNav? 'sticky  top-0 z-50' : ''} 
  ${className}`} 
  // ${siteMetadata.stickyNav? 'sticky  top-0 z-50' : ''}
  initial={{ width: '100%' }} animate={{
          width: isScrolled ? '90%' : '100%',
          top: isVisble() ? '' : '-60px',
        }}
        transition={{ duration: 0.5 }}
  >
    <div className='flex items-center justify-between h-12'>
    <section >
      <div></div>
      <section className='mr-4 hidden md:flex'>
        
      <Link href="/" aria-label={siteMetadata.headerTitle} className='mr-4 flex items-center gap-2 lg:mr-6'>
        <div className="flex items-center justify-between">
          {/* <div className="mr-3">
            <Logo />
          </div> */}
          {typeof siteMetadata.headerTitle === 'string' ? (
            <div className="hidden h-6 text-2xl leading-6 font-semibold sm:block">
              {siteMetadata.headerTitle}
            </div>
          ) : (
            siteMetadata.headerTitle
          )}
        </div>
      </Link>
      </section>
    </section>
    <section className='flex gap-3 items-center'>
    {/* <div className="no-scrollbar hidden max-w-40 items-center space-x-4 overflow-x-auto sm:flex sm:space-x-6 md:max-w-72 lg:max-w-96">
        </div>
        <MobileNav /> */}
        {/* <SearchModalButton className='max-w-10 gap-0 p-0 h-8 border-0 flex' text="" /> */}
        <SearchButton className='max-w-10 gap-0 p-0 h-8 border-0 flex' text="" />
      <nav className='flex text-center items-center gap-4 text-sm xl:gap-6'>
        <NavList />
      </nav>

      <ModeToggleGradientIcon />
      {/* <ModeToggleGradientIconV0 /> */}
      {/* <ThemeSwitch /> */}
      <LanguageChanger />
    </section>
    {/* <div className="flex items-center space-x-4 leading-5 sm:space-x-6">

    </div> */}
    </div>
  </motion.header>
  </>
}

