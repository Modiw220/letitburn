import { useMemo } from 'react'

const RTL_FIRST_CHAR =
  /[\u0590-\u05FF\u0600-\u06FF\u0700-\u074F\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/

function firstMeaningfulChar(text: string): string | undefined {
  for (const char of text) {
    if (!/\s/.test(char)) return char
  }
  return undefined
}

export function useTextDirection(text: string): 'ltr' | 'rtl' {
  return useMemo(() => {
    const first = firstMeaningfulChar(text)
    if (first && RTL_FIRST_CHAR.test(first)) return 'rtl'
    return 'ltr'
  }, [text])
}
