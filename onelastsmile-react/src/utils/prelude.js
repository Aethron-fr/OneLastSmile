const SESSION_KEY = 'ols_prelude_seen'

export function shouldShowPrelude() {
  const forceShow = new URLSearchParams(window.location.search).get('prelude') === '1'
  if (forceShow) return true
  return sessionStorage.getItem(SESSION_KEY) !== 'true'
}

export function markPrologueSeen() {
  try {
    sessionStorage.setItem(SESSION_KEY, 'true')
  } catch {
    // ignore
  }
}
