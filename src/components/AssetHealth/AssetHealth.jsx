import { useState, useEffect } from "react";
import './AssetHealth.css'

export default function AssetHealth() {

    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [open, setOpen] = useState(null);

    useEffect(() => {
        fetch('/data/assetHealth.json')
            .then(response => response.json())
            .then(json => {
                console.log('Asset health data:', json);
                setAssets(json);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error loading asset health data:', err);
                setError('Failed to load asset health data');
                setLoading(false);
            })
    },[])

    function toggleDetails(index) {
        setOpen(open === index ? null : index);
    }

    if (loading) {
        return <p>Loading asset health data...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="widget">
            <h2>Asset Health Summary</h2>
            <div className="accordion">
                {assets.map((asset, index) => (
                    <div key={asset.building} className="accordion-item">
                        <button className="accordion-header" onClick={() => toggleDetails(index)}>
                            <span>{asset.building}</span>
                            <span>{open === index ? '▲' : '▼'}</span>
                        </button>

                        {open === index && (
                            <div className="accordion-content">
                                {asset.floors.map(floor => (
                                    <div className="floor-row" key={floor.name}>
                                        <span className="floor-name">{floor.name}</span>
                                        <div className="asset-values">
                                            <span className="value healthy">{floor.assets.healthy} healthy</span>
                                            <span className="value warning">{floor.assets.warning} warning</span>
                                            <span className="value critical">{floor.assets.critical} critical</span>
                                        </div>
                                        <span className="energy">{floor.energy.consumption} {floor.energy.unit}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>
                ))}
            </div>
        </div>
            
    )
}