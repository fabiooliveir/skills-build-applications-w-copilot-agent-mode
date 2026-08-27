import { useEffect, useState } from 'react'
import { fetchResource } from '../api'

export default function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchResource('leaderboard').then(setEntries).catch((reason) => setError(reason.message)) }, [])
  if (error) return <div className="alert alert-warning">{error}</div>
  return <section className="resource-panel"><div className="section-heading"><h2>Leaderboard</h2><span>Top performers</span></div>{entries.length ? <div className="resource-list">{entries.map((entry) => <div className="resource-row" key={entry._id || entry.id}><strong>#{entry.rank} {entry.userId?.name || entry.user?.name || 'Athlete'}</strong><span>{entry.score} points</span></div>)}</div> : <p className="empty-state">No scores yet.</p>}</section>
}
