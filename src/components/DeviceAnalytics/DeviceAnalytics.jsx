import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import './DeviceAnalytics.css'

export default function DeviceAnalytics() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [retry, setRetry] = useState(0)

    const legendItems = [
        { color: '#22c55e', label: 'Healthy' },
        { color: '#f59e0b', label: 'Warning' },
        { color: '#ef4444', label: 'Critical' },
    ]


    useEffect(() => {

        if (retry ===0){
            setTimeout(() => {
                setError('Failed to load device analytics data')
                setLoading(false)
            }, 1000)
            return
        }

        fetch('/data/deviceHealth.json')
            .then(response => response.json())
            .then(json => {
                console.log('device health data:', json)
                setData(json)
                setLoading(false)
            })
            .catch(err => {
                console.error('Error loading device health analytics data:', err)
                setError('Failed to load device health analytics data')
                setLoading(false)
            })

    }, [retry])

    function handleRetry() {
        setLoading(true)
        setError(null)
        setRetry(prev => prev + 1)
    }

    if (loading) {
        return <p>Loading device analytics data...</p>
    }

    if (error) {
        return (
            <div className="widget">
                <h2>Device Health Analytics</h2>
                <div className="error-card">
                <p>{error}</p>
                <button onClick={handleRetry}>Retry</button>
            </div>
            </div>
        )
    }

    return (
        <div className="widget">
            <h2>Device Health Analytics</h2>
            {/* I also referred google and claude for this recharts implementation as iam not familiar with it */}
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <XAxis dataKey="month" />
                    <YAxis label={{ value: 'Devices', angle: -90, position: 'insideLeft', offset: 10 }} />
                    <Tooltip />
                    <Bar dataKey="healthy" fill="#4caf50" />
                    <Bar dataKey="warning" fill="#ff9800" />
                    <Bar dataKey="critical" fill="#f44336" />
                </BarChart>
            </ResponsiveContainer>
            <div className="chart-legend">
                {legendItems.map(item => (
                <div className="legend-item" key={item.label}>
                    <span className="legend-dot" style={{ backgroundColor: item.color }}></span>
                    <span className="legend-label">{item.label}</span>
                </div>
                ))}
            </div>

        </div>
    )

}