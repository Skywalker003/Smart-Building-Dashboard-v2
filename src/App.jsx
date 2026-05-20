import './App.css'
import Overview from './components/Overview/Overview'

function App() {
  return (
    <>
      <div className="dashboard">

        <header className="header">
          <h1>Smart Building Dashboard</h1>
          <p>Admin Panel</p>
        </header>

        <main className="dashboard-container">
          <div className="row">
            <Overview />
          </div>

          <div className="row row-split">
            <div className="col-wide">
              
            </div>
            <div className="col-narrow">
              
            </div>
          </div>

          <div className="row row-split">
            <div className="col-half">
              
            </div>
            <div className="col-half">
              
            </div>
          </div>
        </main>

      </div>
    </>
  )
}

export default App
