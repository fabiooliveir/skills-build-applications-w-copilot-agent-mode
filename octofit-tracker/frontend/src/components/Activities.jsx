import { useEffect, useState } from 'react'
const apiEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetch(apiEndpoint).then((response) => response.json()).then((payload) => setActivities(Array.isArray(payload) ? payload : payload.results || payload.data || [])).catch((reason) => setError(reason.message)) }, [])
  if (error) return <div className="alert alert-warning">{error}</div>
  return <section className="resource-panel"><div className="section-heading"><h2>Recent activity</h2><span>{activities.length} logged</span></div>{activities.length ? <div className="resource-list">{activities.map((activity) => <div className="resource-row" key={activity._id || activity.id}><strong>{activity.type}</strong><span>{activity.duration} min · {activity.calories} kcal</span></div>)}</div> : <p className="empty-state">No activities yet.</p>}</section>
}
