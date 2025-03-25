import type { MDXComponents } from 'mdx/types'
import { MdxComponents } from './app/md/mdxComponents'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...MdxComponents,
    ...components,
  }
}