import { useEffect, useState } from 'react'
import { fetchResource } from '../api'

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchResource('teams').then(setTeams).catch((reason) => setError(reason.message)) }, [])
  if (error) return <div className="alert alert-warning">{error}</div>
  return <section className="resource-panel"><div className="section-heading"><h2>Teams</h2><span>{teams.length} active</span></div>{teams.length ? <div className="resource-list">{teams.map((team) => <div className="resource-row" key={team._id || team.id}><strong>{team.name}</strong><span>{team.goal} · {team.members?.length || 0} members</span></div>)}</div> : <p className="empty-state">No teams yet.</p>}</section>
}
