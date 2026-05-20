import { useState, useEffect } from "react";
import './Overview.css';

export default function Overview() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    const statCards = [
    { key: 'campuses',        label: 'Campuses',          icon: '🌍' },
    { key: 'buildings',       label: 'Buildings',         icon: '🏢' },
    { key: 'floors',          label: 'Floors',            icon: '🏗️' },
    { key: 'rooms',           label: 'Rooms',             icon: '🚪' },
    { key: 'users',           label: 'Users',             icon: '👤' },
    { key: 'assets',          label: 'Assets',            icon: '📦' },
    { key: 'workOrders',      label: 'Work Orders',       icon: '📋' },
    { key: 'workRequests',    label: 'Work Requests',     icon: '🔧' },
    { key: 'alarms',          label: 'Alarms',            icon: '🔔' },
    { key: 'gateways',        label: 'Gateways',          icon: '📡' },
    { key: 'wiredDevices',    label: 'Wired Devices',     icon: '🔌' },
    { key: 'wirelessDevices', label: 'Wireless Devices',  icon: '📶' },
    { key: 'healthScore',     label: 'Health Score',      icon: '❤️' },
    { key: 'areaSqFt',        label: 'Area (sq ft)',      icon: '📐' },
  ]


  useEffect(() => {

    fetch('/data/overview.json')
        .then(response => response.json())
        .then(json => {
            console.log('Overview data:', json);
            setData(json)
            setLoading(false)
        })
        .catch(err => {
            console.error('Error loading overview data:', err);
            setError('Failed to load overview data');
            setLoading(false);
        })

    },[])

    if (loading) {
        return <p>Loading overview data...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

  return (
    <div className="widget">
        <h2>Organization Overview</h2>
        <div className="overview-container">
            {statCards.map(({ key, label, icon }) => (
                <div key={key} className="stat-card">
                    <span className="stat-icon" >{icon}</span>
                    <div>
                        <div className="stat-value">{data[key]}</div>
                        <div className="stat-label">{label}</div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}