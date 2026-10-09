import { useEffect } from 'react'
import { useRouter } from '../lib/router'

export default function Redirect({ to, state = null }) {
  const { navigate } = useRouter()
  useEffect(() => {
    navigate(to, { replace: true, state })
  }, [navigate, to, state])
  return null
}
