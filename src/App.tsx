import './App.css'

function App() {
  return (
    <div className="glass-panel" style={{
      padding: '3rem',
      textAlign: 'center',
      minWidth: '300px'
    }}>
      <h1 style={{
        fontSize: '3rem',
        margin: '0 0 1rem 0',
        background: 'var(--accent-gradient)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 700
      }}>
        AI Calculator
      </h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
        Futuristic Math Solving
      </p>
    </div>
  )
}

export default App
