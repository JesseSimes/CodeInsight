import { useRouter } from '../lib/router'

// An anchor that navigates client-side but keeps real hrefs, so
// middle-click, "open in new tab" and screen readers behave normally.
export default function Link({ to, replace = false, onClick, children, ...rest }) {
  const { navigate } = useRouter()

  const handleClick = (event) => {
    onClick?.(event)
    if (event.defaultPrevented) return
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    if (rest.target && rest.target !== '_self') return
    event.preventDefault()
    navigate(to, { replace })
  }

  return <a href={to} onClick={handleClick} {...rest}>{children}</a>
}
