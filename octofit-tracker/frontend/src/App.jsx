import { NavLink, Route, Routes } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import { apiBaseUrl } from './api'
import './App.css'

const links = [
  ['/', 'Overview'], ['/users', 'Members'], ['/teams', 'Teams'],
  ['/activities', 'Activity'], ['/leaderboard', 'Leaderboard'], ['/workouts', 'Workouts'],
]

function Overview() {
  return <div className="overview-grid"><Activities /><Leaderboard /></div>
}

function App() {
  return <div className="app-shell">
    <header className="app-header">
      <NavLink to="/" className="brand"><img src={logo} alt="OctoFit" /><span>OctoFit <small>TRACKER</small></span></NavLink>
      <nav className="app-nav" aria-label="Main navigation">{links.map(([path, label]) => <NavLink key={path} to={path} className={({ isActive }) => isActive ? 'active' : ''}>{label}</NavLink>)}</nav>
    </header>
    <main className="app-main">
      <div className="eyebrow">Performance workspace</div>
      <h1>Train with intention.</h1>
      <p className="intro">Your daily signal for movement, momentum, and the next good session.</p>
      <Routes>
        <Route path="/" element={<Overview />} /><Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} /><Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} /><Route path="/workouts" element={<Workouts />} />
      </Routes>
    </main>
    <footer>API: {apiBaseUrl}</footer>
  </div>
}

export default App
