import { useEffect, useState } from 'react'
import { fetchResource } from '../api'

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchResource('activities').then(setActivities).catch((reason) => setError(reason.message)) }, [])
  if (error) return <div className="alert alert-warning">{error}</div>
  return <section className="resource-panel"><div className="section-heading"><h2>Recent activity</h2><span>{activities.length} logged</span></div>{activities.length ? <div className="resource-list">{activities.map((activity) => <div className="resource-row" key={activity._id || activity.id}><strong>{activity.type}</strong><span>{activity.duration} min · {activity.calories} kcal</span></div>)}</div> : <p className="empty-state">No activities yet.</p>}</section>
}
