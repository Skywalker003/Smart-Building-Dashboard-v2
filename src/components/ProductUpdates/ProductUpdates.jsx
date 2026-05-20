import { useState , useEffect } from 'react'
import './ProductUpdates.css'

export default function ProductUpdates() {

    const [updates, setUpdates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/data/updates.json')
            .then(response => response.json())
            .then(json => {
                console.log('Product updates data:', json);
                setUpdates(json);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error loading product updates data:', err);
                setError('Failed to load product updates data');
                setLoading(false);
            })
    }, [])

    if (loading) {
        return <p>Loading product updates...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="widget">
            <h2>Product Updates</h2>
            <ul className="updates-container">
                {updates.map((update) => {
                    const date = new Date(update.releaseDate).toLocaleDateString()

                    return (
                        <li key={update.id} className="update-item">
                            <span className='version-badge'>v{update.version}</span>
                            <div className="update-info">
                                <p className="update-title">{update.title}</p>
                                <p className="update-date">{date}</p>
                            </div>
                        </li>
                    )
                })}

            </ul>
        </div>
    )
}