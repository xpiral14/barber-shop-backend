import { useEffect, useState } from 'react'

export default function useAsync(asyncFunction: any, deps: any[]) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  useEffect(() => {
    (async () => {
      setLoading(true)
      setTimeout(async () => {
        try {
          await asyncFunction()
        } catch (err) {
          setError(err)
        } finally {
          setLoading(false)
        }
      }, 500)
    })()
  }, deps)

  return [loading, error]
}
