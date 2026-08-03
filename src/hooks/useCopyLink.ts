import { useCallback, useState } from 'react'

export function useCopyLink(url?: string) {
  const [message, setMessage] = useState<string | null>(null)

  const copyLink = useCallback(async () => {
    const target = url ?? window.location.origin
    setMessage(null)

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(target)
        setMessage('Link copied')
        return true
      }

      const textarea = document.createElement('textarea')
      textarea.value = target
      textarea.setAttribute('readonly', 'true')
      textarea.style.position = 'absolute'
      textarea.style.left = '-9999px'
      document.body.appendChild(textarea)
      textarea.select()
      const copied = document.execCommand('copy')
      document.body.removeChild(textarea)

      if (copied) {
        setMessage('Link copied')
        return true
      }

      setMessage('Could not copy the link on this device.')
      return false
    } catch {
      setMessage('Could not copy the link on this device.')
      return false
    }
  }, [url])

  return { copyLink, message, clearMessage: () => setMessage(null) }
}
