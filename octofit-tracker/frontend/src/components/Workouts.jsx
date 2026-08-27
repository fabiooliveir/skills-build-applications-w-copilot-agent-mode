import { useEffect, useState } from 'react'
import { fetchResource } from '../api'

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchResource('workouts').then(setWorkouts).catch((reason) => setError(reason.message)) }, [])
  if (error) return <div className="alert alert-warning">{error}</div>
  return <section className="resource-panel"><div className="section-heading"><h2>Workout library</h2><span>{workouts.length} plans</span></div>{workouts.length ? <div className="resource-list">{workouts.map((workout) => <div className="resource-row" key={workout._id || workout.id}><strong>{workout.name}</strong><span>{workout.focus} · {workout.durationMinutes} min · {workout.difficulty}</span></div>)}</div> : <p className="empty-state">No workouts yet.</p>}</section>
}
