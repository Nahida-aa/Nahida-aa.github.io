'use client'
import { JSX, useLayoutEffect, useState } from 'react'
import { highlight } from './shared'

export function CodeBlock({ initial }: { initial?: JSX.Element }) {
  const [nodes, setNodes] = useState(initial)

  useLayoutEffect(() => {
    void highlight('console.log("Rendered on client")', 'ts').then(setNodes)
  }, [])

  return nodes ?? <p>Loading...</p>
}