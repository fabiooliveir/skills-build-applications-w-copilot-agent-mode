import { useEffect, useState } from 'react'
const apiEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

export default function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetch(apiEndpoint).then((response) => response.json()).then((payload) => setEntries(Array.isArray(payload) ? payload : payload.results || payload.data || [])).catch((reason) => setError(reason.message)) }, [])
  if (error) return <div className="alert alert-warning">{error}</div>
  return <section className="resource-panel"><div className="section-heading"><h2>Leaderboard</h2><span>Top performers</span></div>{entries.length ? <div className="resource-list">{entries.map((entry) => <div className="resource-row" key={entry._id || entry.id}><strong>#{entry.rank} {entry.userId?.name || entry.user?.name || 'Athlete'}</strong><span>{entry.score} points</span></div>)}</div> : <p className="empty-state">No scores yet.</p>}</section>
}
