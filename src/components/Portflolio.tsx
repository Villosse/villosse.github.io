import React from 'react';
import { config } from '../config';

export const Portfolio: React.FC = () => {
    return (
        <div className="portfolio-container">
            <div className="profile-section">
                <img
                    src={config.image}
                    alt={`${config.name} - Profile`}
                    className="profile-image"
                />
                <h1 className="profile-name">{config.name}</h1>
            </div>
        </div>
    );
};