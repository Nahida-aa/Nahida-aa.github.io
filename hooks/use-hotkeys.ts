"use client"

import { useEffect } from "react"

type KeyHandler = (e: KeyboardEvent) => void

/**
 * 解析快捷键字符串
 * 例如: "mod+k" => { ctrl: true, key: "k" } 在 Windows/Linux
 * 或 { meta: true, key: "k" } 在 macOS
 */
function parseKey(key: string) {
  const parts = key.toLowerCase().split("+")
  const result: Record<string, boolean> = {
    ctrl: false,
    alt: false,
    shift: false,
    meta: false,
  }

  let mainKey = ""

  for (const part of parts) {
    if (part === "ctrl") result.ctrl = true
    else if (part === "alt") result.alt = true
    else if (part === "shift") result.shift = true
    else if (part === "meta" || part === "cmd" || part === "⌘") result.meta = true
    else if (part === "mod") {
      // mod 在 macOS 上是 meta (⌘), 在其他平台上是 ctrl
      if (typeof navigator !== "undefined" && /Mac|iPod|iPhone|iPad/.test(navigator.platform)) {
        result.meta = true
      } else {
        result.ctrl = true
      }
    } else {
      mainKey = part
    }
  }

  return { ...result, key: mainKey } as { ctrl: boolean; alt: boolean; shift: boolean; meta: boolean; key: string }
}

/**
 * 检查事件是否匹配快捷键
 */
function matchesKey(e: KeyboardEvent, keyDef: ReturnType<typeof parseKey>) {
  return (
    e.ctrlKey === keyDef.ctrl &&
    e.altKey === keyDef.alt &&
    e.shiftKey === keyDef.shift &&
    e.metaKey === keyDef.meta &&
    e.key.toLowerCase() === keyDef.key
  )
}

/**
 * 使用键盘快捷键的 Hook
 */
export function useHotkeys(key: string, callback: KeyHandler) {
  useEffect(() => {
    const keyDef = parseKey(key)

    const handler = (e: KeyboardEvent) => {
      if (matchesKey(e, keyDef)) {
        e.preventDefault()
        callback(e)
      }
    }

    window.addEventListener("keydown", handler)
    return () => {
      window.removeEventListener("keydown", handler)
    }
  }, [key, callback])
}

