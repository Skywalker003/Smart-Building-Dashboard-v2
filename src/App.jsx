import './App.css'
import Overview from './components/Overview/Overview'
import ProductUpdates from './components/ProductUpdates/ProductUpdates'
import AssetHealth from './components/AssetHealth/AssetHealth'
import BuildingMap from './components/BuildingMap/BuildingMap'
import DeviceAnalytics from './components/DeviceAnalytics/DeviceAnalytics'

function App() {
  return (
    <>
      <div className="dashboard">

        <header className="header">
          <div className="header-left">
            <h1>Smart Building Dashboard</h1>
            <p>Admin Panel</p>
          </div>
        </header>

        <main className="dashboard-container">
          <div className="row">
            <Overview />
          </div>

          <div className="row row-split">
            <div className="col-wide">
              <BuildingMap />
            </div>
            <div className="col-narrow">
              <ProductUpdates />
            </div>
          </div>

          <div className="row row-split">
            <div className="col-half">
              <AssetHealth />
            </div>
            <div className="col-half">
              <DeviceAnalytics />
            </div>
          </div>
        </main>

      </div>
    </>
  )
}

export default App
