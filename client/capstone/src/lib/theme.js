/*
 * Theme store shared by every toggle on the page.
 * The initial theme is applied by the inline boot script in index.html
 * (before first paint). This module keeps React in sync with it.
 */
import { useSyncExternalStore } from 'react'

export const THEME_STORAGE_KEY = 'ci-theme'
const listeners = new Set()
const systemQuery = typeof window !== 'undefined' && window.matchMedia
  ? window.matchMedia('(prefers-color-scheme: light)')
  : null

function readStored() {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

function systemTheme() {
  return systemQuery?.matches ? 'light' : 'dark'
}

export function getTheme() {
  const attr = document.documentElement.dataset.theme
  return attr === 'light' || attr === 'dark' ? attr : readStored() || systemTheme()
}

function syncThemeColorMeta() {
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', getComputedStyle(document.documentElement).getPropertyValue('--bg').trim())
}

function apply(theme, { animate }) {
  const root = document.documentElement
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (animate && !reduce) {
    root.classList.add('theme-switching')
    window.clearTimeout(apply.timer)
    apply.timer = window.setTimeout(() => root.classList.remove('theme-switching'), 340)
  }
  root.dataset.theme = theme
  syncThemeColorMeta()
  listeners.forEach((listener) => listener())
}

export function setTheme(theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    /* Private mode or blocked storage: the theme still applies for this page. */
  }
  apply(theme, { animate: true })
}

export function toggleTheme() {
  setTheme(getTheme() === 'dark' ? 'light' : 'dark')
}

// Follow OS changes only until the visitor makes an explicit choice.
systemQuery?.addEventListener?.('change', () => {
  if (!readStored()) apply(systemTheme(), { animate: true })
})

function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useTheme() {
  return useSyncExternalStore(subscribe, getTheme, () => 'dark')
}
