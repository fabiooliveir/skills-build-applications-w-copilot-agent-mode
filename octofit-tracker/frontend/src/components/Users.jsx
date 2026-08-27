import { useEffect, useState } from 'react'
const apiEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

export default function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(apiEndpoint).then((response) => response.json()).then((payload) => setUsers(Array.isArray(payload) ? payload : payload.results || payload.data || [])).catch((reason) => setError(reason.message))
  }, [])

  if (error) return <div className="alert alert-warning">{error}</div>
  return <ResourceList title="Members" items={users} empty="No members yet." renderItem={(user) => <><strong>{user.name}</strong><span>{user.email} · {user.fitnessLevel}</span></>} />
}

function ResourceList({ title, items, empty, renderItem }) {
  return <section className="resource-panel"><div className="section-heading"><h2>{title}</h2><span>{items.length} total</span></div>{items.length ? <div className="resource-list">{items.map((item) => <div className="resource-row" key={item._id || item.id}>{renderItem(item)}</div>)}</div> : <p className="empty-state">{empty}</p>}</section>
}
