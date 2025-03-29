"use client"

import { useEffect, useRef } from "react"
import mermaid from "mermaid"

interface MermaidProps {
  code: string
  className?: string
}

export default function MermaidRenderer({ code, className = "" }: MermaidProps) {
  const mermaidRef = useRef<HTMLPreElement>(null)

  useEffect(() => {
    // 配置 mermaid
    mermaid.initialize({
      startOnLoad: false,
      theme: "default",
      securityLevel: "loose",
    })

    const renderMermaid = async () => {
      if (mermaidRef.current) {
        mermaidRef.current.innerHTML = ""
        const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`

        try {
          const result = await mermaid.render(id, code)
          if (mermaidRef.current) {
            mermaidRef.current.innerHTML = result.svg
          }
        } catch (error) {
          console.warn("Mermaid 渲染错误:", error)
          mermaidRef.current.innerHTML = `<code class="p-4 bg-background text-red-500 border border-red-300 rounded">${error instanceof Error ? error.message : String(error)}
          </code>`
        }
      }
    }

    renderMermaid()
  }, [code])

  return <pre className={`mermaid-wrapper bg-[#f0eeee72] my-6 ${className}`} ref={mermaidRef} />
}

